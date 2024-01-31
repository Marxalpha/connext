"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import Form from "@/components/Form";
import { getData } from "@/app/api/post/route";

export default function Home() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchdata() {
      setLoading(true);
      const data = await getData();
      setPosts(data);
      setLoading(false);
    }
    fetchdata();
  }, []);
  console.log("Posts: ", posts);
  // const [posts,postsLoading,postsError] = useCollection(
  //   fs.collection('posts'),
  //   {}
  // );

  // if(!postsLoading && posts)
  // {
  //   posts.docs.map((doc) => console.log(doc.data()));
  // }

  // if (status === "loading" || window.navigator.onLine === false) {
  //   return <div>Loading...</div>;
  // }

  // const accountName = session?.user?.name;
  // const profilePic = session?.user?.image;
  // const loginMode = session?.provider;
  // console.log(posts[0]?.img_path);

  return (
    <div className="relative w-full flex flex-row items-center justify-center">
      <div className="absolute top-0 right-0 m-4">
        <Form></Form>
      </div>
      <div className="w-2/6 flex flex-col items-center justify-cente">
        {posts.map((post, index) => (
          <Card
            key={index}
            username={post.username}
            postContent={post.post_content}
            image={post.img_path}
            tags={post.tags}
            avatar={post.avatar}
            loading={loading}
            date={post.date_time}
            fold_id={post.doc_id}
          ></Card>
        ))}
      </div>
    </div>
  );
}
