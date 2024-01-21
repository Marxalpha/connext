import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import { db } from "@/firebase-config";

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

export async function getData() {
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
    return dataArr;
  } catch (e) {
    console.log(e);
    console.log("inside catch");
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
