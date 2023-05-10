import { db, storage } from "@/firebase";
import { openLoginModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TweetInput() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [image, setImage] = useState(null);

  const [text, setText] = useState("");

  const [counter, setCounter] = useState(0);

  const filePickerRef = useRef(null);

  const styleIcons =
    "p-2 transition-all duration-200 hover:cursor-pointer hover:bg-blue-400 hover:bg-opacity-10";

  const [tweetButton, settweetButton] = useState(
    "opacity-50 hover:cursor-default"
  );

  function handleChange(event) {
    setText(event.target.value);
    setCounter(event.target.value.length);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + 2 + "px";
  }

  useEffect(() => {
    if (counter !== 0 || image !== null) {
      settweetButton("");
    } else {
      settweetButton("opacity-50 hover:cursor-default");
    }
  }, [counter, image]);

  async function sendTweet() {
    if (
      (user.email !== null && text.length !== 0) ||
      (user.email !== null && image !== null)
    ) {
      const docRef = await addDoc(collection(db, "posts"), {
        username: user.username,
        name: user.name,
        photoUrl: user.photoUrl,
        uid: user.uid,
        timestamp: serverTimestamp(),
        likes: [],
        retweets: [],
        content: text,
      });
      if (image) {
        const imageRef = ref(storage, `tweetImages/${docRef.id}`);
        const uploadImage = await uploadString(imageRef, image, "data_url");
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
      setText("");
      setImage(null);
    }
    dispatch(openLoginModal());
  }

  function addImagetoTweet(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.addEventListener("load", (e) => {
      setImage(e.target.result);
    });
  }

  return (
    <div className="flex w-full ">
      <div className={`hidden flex-col items-center justify-start p-3 sm:flex`}>
        <Image
          src={user.photoUrl || "/assets/cutzu.gif"}
          draggable="false"
          width={46}
          height={46}
          className="select-none rounded-full"
          alt=""
        />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <div className="bg-orange mb-2 flex w-full flex-col">
          <div className="relative w-full">
            <textarea
              className="w-full resize-none  bg-transparent pb-8 text-lg font-medium placeholder-gray-400 focus:outline-none"
              placeholder="What's happening?"
              maxLength={300}
              value={text}
              onChange={handleChange}
            ></textarea>
            <div className="absolute bottom-2 right-0 select-none text-neutral-500 text-opacity-75">
              {counter}/300
            </div>
          </div>
          {image && (
            <div className="relative">
              <img
                src={image}
                draggable="false"
                className="mb-4 max-w-[75%] select-none rounded-2xl"
                alt=""
              />
              <div
                onClick={() => {
                  setImage(null);
                }}
                className="duration-10000 absolute left-2 top-2 rounded-full bg-black bg-opacity-50 p-1 transition-all hover:cursor-pointer hover:bg-opacity-30"
              >
                <XMarkIcon className="h-5 w-5 stroke-2" />
              </div>
            </div>
          )}

          <div className="h-[1px] w-full bg-gray-400 bg-opacity-25"></div>
        </div>
        <div className="flex w-full items-center justify-between px-1">
          <ul className="flex items-center justify-center gap-1 bg-opacity-0">
            <li
              onClick={() => filePickerRef.current.click()}
              className={`flex items-center justify-center rounded-full ${styleIcons}`}
            >
              <PhotoIcon className="h-5 w-5 text-blue-400" />
              <input
                type="file"
                className="hidden"
                ref={filePickerRef}
                accept="image/png, image/gif, image/jpeg"
                onChange={addImagetoTweet}
              />
            </li>
            <li
              className={`flex items-center justify-center rounded-full ${styleIcons}`}
            >
              <ChartBarIcon className="h-5 w-5 text-blue-400" />
            </li>
            <li
              className={`flex items-center justify-center rounded-full ${styleIcons}`}
            >
              <FaceSmileIcon className="h-5 w-5 text-blue-400" />
            </li>
            <li
              className={`flex items-center justify-center rounded-full ${styleIcons}`}
            >
              <CalendarIcon className="h-5 w-5 text-blue-400" />
            </li>
            <li
              className={`flex items-center justify-center rounded-full ${styleIcons}`}
            >
              <MapPinIcon className="h-5 w-5 text-blue-400" />
            </li>
          </ul>
          <button
            className={`w-fit rounded-full bg-[#1d9bf0] px-5 py-2 font-bold ${tweetButton}`}
            onClick={() => {
              sendTweet();
            }}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}

export default TweetInput;
