"use client";
// import { data } from "autoprefixer";
// import Nav from "../../components/Nav"
// import { SessionProvider } from "next-auth/react"
import { useSession } from "next-auth/react";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase-config";
import Card from "@/components/Card";
import Add from "@/components/AddBtn";
import Form from "@/components/Form";

async function getData() {
  try {
    let dataArr = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      let d = doc.data();
      d.id = doc.id;
      const timestamp = d.date_time.toDate();
      const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      d.date_time = timestamp
        .toLocaleString(undefined, options)
        .replace(/,/g, " ");
      dataArr.push(d);
    });
    // console.log(dataArr,"Data Array")
    return dataArr;
  } catch (e) {
    console.log(e);
    console.log("inside catch");
    return false;
  }
}

export default function Home() {
  const { data: session, status } = useSession();
  // console.log(session, status)
  // const fs = firebase.firestore();
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
  // return (
  //   <div className="flex flex-row items-center justify-center">
  //     <div className="w-2/6 flex flex-col items-center justify-center">
  //       {/* {accountName && <p>Account Name: {accountName}</p>}
  //     {profilePic && <img src={profilePic} alt="Profile Picture" />}
  //     {loginMode && <p>Login Mode: {loginMode}</p>} */}
  //       {posts.map((post, index) => (
  //         <Card
  //           key={index}
  //           username={post.username}
  //           postContent={post.post_content}
  //           image={post.img_path}
  //           tags={post.tags}
  //           avatar={post.avatar}
  //           loading={loading}
  //           date={post.date_time}
  //         ></Card>
  //       ))}
  //     </div>
  //     <div className="flex flex-col items-end">
  //       <Add></Add>
  //     </div>
  //   </div>
  // );
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
          ></Card>
        ))}
      </div>
    </div>
  );
}
