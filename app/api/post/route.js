import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";

async function addData(data) {
  try {
    const docRef = await addDoc(collection(db, "posts"), {
      ...data,
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function POST(req) {
  const { username, post_id, img_path, post_content, date_time } = req.json();
  let data = {
    username,
    post_id,
    img_path,
    post_content,
    date_time,
  };

  const result = await addData(data);
  return {
    status: 200,
    body: {
      result,
    },
  };
}
