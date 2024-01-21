import Link from "next/link";
import { useState } from "react";
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
  const [post, setPost] = useState({
    img_path: [],
    post_content: "",
    tags: [],
  });
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
                // onSubmit={handleSubmit}
                className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
              >
                <label className="font-satoshi font-semibold text-base text-gray-700 flex items-center">
                  <span>Write Post</span>
                  <textarea
                    value={post.post_content}
                    onChange={(e) =>
                      setPost({ ...post, post_content: e.target.value })
                    }
                    placeholder="Write your post here"
                    required
                    className="form_textarea w-full mt-2 p-2 ml-4"
                  />
                </label>

                <label className="font-satoshi font-semibold text-base text-gray-700">
                  <span>Add Tags </span>
                  <input
                    value={""}
                    onChange={(e) => setPost({ ...post, tag: e.target.value })}
                    type="text"
                    placeholder="#trending"
                    required
                    className="form_input mt-2 p-2"
                  />
                </label>

                <label className="font-satoshi font-semibold text-base text-gray-700">
                  <span>Add Images </span>
                  <input
                    type="file"
                    multiple
                    onChange={(e) =>
                      setPost({ ...post, images: e.target.files })
                    }
                    className="form_input mt-2 p-2"
                  />
                </label>
              </form>
            </section>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Discard</AlertDialogCancel>
          <AlertDialogAction>Upload</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Form;
