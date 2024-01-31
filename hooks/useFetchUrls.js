import { useState, useEffect } from "react";
import { storage } from "../firebase-config";
import { ref, getDownloadURL } from "firebase/storage";

export const useFetchUrls = (images, fold_id) => {
  const [loading, setLoading] = useState(true);
  const [imgUrls, setImgUrls] = useState([]);

  useEffect(() => {
    async function fetchUrls() {
      const urls = [];
      for (const img of images) {
        const imageRef = ref(storage, `posts/${fold_id}/${img}`);
        const url = await getDownloadURL(imageRef);
        urls.push(url);
      }
      setImgUrls(urls);
      setLoading(false);
    }

    fetchUrls();
  }, [images, fold_id]);

  return { loading, imgUrls };
};
