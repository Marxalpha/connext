"use client";
import React from "react";
import { useState, useEffect } from "react";
import { storage } from "../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";

const Card = ({
  username,
  image,
  postContent,
  avatar,
  date,
  tags,
  Loading,
}) => {
  const [loading, setLoading] = useState(true);
  const [imgUrls, setImgUrls] = useState([]);

  useEffect(() => {
    async function fetchUrls() {
      const urls = await getImgUrls(image);
      setImgUrls(urls);
      setLoading(false);
    }

    fetchUrls();
  }, []);

  const handleTagClick = (tag) => {
    window.location.href = `http://localhost:3000//${tag}`;
  };

  async function getImgUrls(img) {
    try {
      const urls = await Promise.all(
        img.map(async (imageName) => {
          const storageRef = ref(storage, imageName);
          const url = await getDownloadURL(storageRef);
          return url;
        })
      );
      return urls;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  console.log("image urls: ", imgUrls);
  return (
    <div>
      {loading || Loading ? (
        <div className="skeleton-loading shadow-2xl rounded-md">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-username"></div>
          <div className="skeleton-post"></div>
        </div>
      ) : (
        <div className="flex-col center mb-10 shadow-2xl p-3 rounded-md">
          <>
            <div className="flex flex-row justify-start w-full h-12 mb-2">
              <img
                src={`data:image/jpeg;base64,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`}
                alt="avatar"
                className="rounded-full w-12 mr-5 shadow-2xl"
              />
              <div>
                <h2>{username}</h2>
                <h3>{date}</h3>
              </div>
            </div>

            {/* <hr style={{ width: "100%" }} /> */}

            <div>
              <Carousel>
                <CarouselContent>
                  {imgUrls.map((imageUrl) => (
                    <CarouselItem>
                      <div>
                        <img src={imageUrl} alt="img1" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {image ? <hr style={{ width: "100%" }} /> : <br></br>}
              <p>{postContent}</p>
              <br />
              <p>
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="tag"
                    onClick={() => handleTagClick(tag)}
                  >
                    #{tag}{" "}
                  </span>
                ))}
              </p>
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default Card;
