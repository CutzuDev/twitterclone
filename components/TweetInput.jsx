import { db } from "@/firebase";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function TweetInput() {
  const user = useSelector((state) => state.user);

  const [text, setText] = useState("");

  const [counter, setCounter] = useState(0);

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
    if (counter !== 0) {
      settweetButton("");
    } else {
      settweetButton("opacity-50 hover:cursor-default");
    }
  }, [counter]);

  async function sendTweet() {
    if (user.email !== null && text.length !== 0) {
      const docRef = await addDoc(collection(db, "posts"), {
        username: user.username,
        name: user.name,
        photoUrl: user.photoUrl,
        uid: user.uid,
        timestamp: serverTimestamp(),
        likes: [],
        content: text,
      });
    }
    setText("");
  }

  return (
    <div className="flex w-full border-y border-gray-400 border-opacity-25">
      <div className="flex flex-col items-center justify-start p-3">
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
        <div className="relative mb-2 w-full">
          <textarea
            className="w-full resize-none border-b border-b-gray-400 border-opacity-25 bg-transparent pb-8 text-lg font-medium placeholder-gray-400 focus:outline-none"
            placeholder="What's happening?"
            maxLength={300}
            value={text}
            onChange={handleChange}
          ></textarea>
          <div className="absolute bottom-2 right-0 select-none text-neutral-500 text-opacity-75">
            {counter}/300
          </div>
        </div>
        <div className="flex w-full items-center justify-between px-1">
          <ul className="flex items-center justify-center gap-1 bg-opacity-0">
            <li
              className={`flex items-center justify-center rounded-full ${styleIcons}`}
            >
              <PhotoIcon className="h-5 w-5 text-blue-400" />
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
