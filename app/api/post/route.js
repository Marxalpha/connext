import { collection, getDocs, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase-config";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";

// async function addData(data, imgs) {
//   try {
//     console.log("data: ", data);
//     data.date_time = serverTimestamp();
//     const docRef = await addDoc(collection(db, "posts"), {
//       ...data,
//     });
//     const storage = getStorage();
//     const promises = imgs.map((image, index) => {
//       const storageRef = ref(storage, `posts/${docRef.id}/${index}`);
//       return uploadBytes(storageRef, image);
//     });

//     await Promise.all(promises);

//     return true;
//   } catch (e) {
//     console.log(e);
//     return false;
//   }
// }

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
    console.log("Hello inside get data function: ", dataArr);
    return dataArr;
  } catch (e) {
    console.log(e);
    console.log("inside catch");
    return false;
  }
}

export async function POST(req) {
  console.log("Req :", req);
  let username = req.username;
  let post_id = 1;
  let img_path = req.img_path;
  let post_content = req.post_content;
  let date_time = req.date_time;
  let avatar = req.avatar;
  let images = req.images;
  let data = {
    username,
    post_id,
    img_path,
    post_content,
    date_time,
    avatar,
  };
  try {
    console.log("data: ", data);
    data.date_time = serverTimestamp();
    const docRef = await addDoc(collection(db, "posts"), {});
    const id = docRef.id;
    const new_data = { ...data, id };
    await setDoc(doc(db, "posts", id), new_data);
    console.log("newdata", new_data);
    const storage = getStorage();
    const promises = images.map((image, index) => {
      const storageRef = ref(storage, `posts/${docRef.id}/${image.name}`);
      return uploadBytes(storageRef, image);
    });

    await Promise.all(promises);

    return {
      status: 200,
      body: {
        result,
      },
    };
  } catch (e) {
    console.log(e);
    return false;
  }
}
