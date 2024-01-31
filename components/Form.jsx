import Link from "next/link";
import { POST } from "@/app/api/post/route";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const Form = () => {
  const { data: session, status } = useSession();

  const [post, setPost] = useState({
    img_path: [],
    post_content: "",
    tags: [],
    images: [],
  });
  const [imgName, setImageName] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accountName = session?.user?.name;
    const profilePic = session?.user?.image;
    post.avatar = profilePic;
    post.username = accountName;
    post.img_path = post.images.map((image) => image.name);
    const response = await POST(post);
    if (response) {
      console.log("Data uploaded");
    } else {
      console.log("data upload fail");
    }
    handleClose();
  };

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setPost({
      post_content: "",
      tag: "",
      img_path: "",
      images: [],
    });
    console.log("called");
    setImageName([]);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose]);

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="shadow-2xl px-10 py-3 rounded-md bg-slate-200 text-left">
          New Post
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">Add New Post</AlertDialogTitle>
          <AlertDialogDescription>
            <section className="w-full max-w-full flex-start flex-col">
              <form
                onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
              >
                <label className="text-base text-gray-700">
                  <span>Write Your Post</span>
                  <textarea
                    value={post.post_content}
                    onChange={(e) =>
                      setPost({ ...post, post_content: e.target.value })
                    }
                    placeholder="Write your post here"
                    required
                    className="w-full p-2 mt-2 border 1px rounded-lg resize-none"
                  />
                </label>
                <label className="text-base text-gray-700">
                  <span>Add Tags </span>
                  <input
                    onChange={(e) => {
                      setPost({
                        ...post,
                        tags: e.target.value.split(/[\s#]+/).filter(Boolean),
                      });
                      console.log(post.tags);
                    }}
                    type="text"
                    placeholder="#trending"
                    className="w-full mt-2 p-2 border 1px rounded-lg"
                  />
                </label>
                <label className="mt-2 p-2 border-2 border-gray-400 rounded-lg bg-blue-600 cursor-pointer text-white hover:bg-white hover:text-gray-500 w-1/4">
                  Add Images
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files);
                      const newFileNames = newFiles.map((file) => file.name);
                      setPost((prevPost) => ({
                        ...prevPost,
                        images: [...(prevPost.images || []), ...newFiles],
                      }));
                      setImageName((prevNames) => [
                        ...prevNames,
                        ...newFileNames,
                      ]);
                    }}
                    className="hidden"
                  />
                </label>
                {imgName.map((name, index) => (
                  <h3 key={index}>{name}</h3>
                ))}
              </form>
            </section>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Discard</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Upload</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Form;
