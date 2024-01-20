import React, { useState } from "react";

const AddPostCard = () => {
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = () => {
    // Here you would typically make a call to your API to create the post
    console.log(`Submitting new post: ${image}, ${content}, ${tags}`);
    setImage(null);
    setContent("");
    setTags("");
  };

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="card">
      <h2>Add Post</h2>
      <input type="file" onChange={handleImageUpload} className="input" />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="input"
      />
      <input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma separated)"
        className="input"
      />
      <button onClick={handleSubmit} className="button">
        Submit
      </button>
    </div>
  );
};

export default AddPostCard;
