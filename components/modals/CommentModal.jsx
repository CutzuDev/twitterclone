import { closeCommentModal } from "@/redux/modalSlice";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Modal } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

function CommentModal() {
  const user = useSelector((state) => state.user);
  const isOpen = useSelector((state) => state.modals.commentModalOpen);
  const dispatch = useDispatch();

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
    <>
      <Modal
        className="flex items-center justify-center"
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div className="flex w-4/5 flex-col items-center justify-center rounded-lg border border-gray-400 border-opacity-25 bg-black p-4 text-white outline-none md:w-[575px]">
          <div className="flex w-full items-center justify-start">
            <XMarkIcon className="h-5 " />
          </div>
          <div className="mt-4 flex w-full">
            <div className="flex flex-col items-center justify-start">
              <Image
                src={"/assets/cutzu.gif"}
                draggable="false"
                width={46}
                height={46}
                className="select-none rounded-full"
                alt=""
              />
              <div className="my-1 flex w-[2px] flex-1 flex-col bg-gray-400 bg-opacity-25"></div>
            </div>
            <div className="flex flex-1 flex-col px-3">
              <div className="flex items-center justify-start gap-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="font-bold">Name</span>
                  <span className=" text-gray-400 text-opacity-50 ">
                    @username
                  </span>
                </div>
                <div className="h-[3px] w-[3px] rounded-full bg-neutral-500"></div>
                2 hours ago
                {/* <Moment fromNow className="text-neutral-500">
                  timestamp
                </Moment> */}
                {/*  */}
              </div>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
                possimus suscipit rem culpa impedit fugit id deserunt in
                voluptates.
              </span>
              <div className="my-3 text-gray-400 text-opacity-50">
                Replying to <span className="text-blue-400">@username</span>
              </div>
            </div>
          </div>

          {/* TEST */}

          <div className="flex w-full ">
            <div className={"flex flex-col items-center justify-start p-0 "}>
              <Image
                src={user.photoUrl || "/assets/cutzu.gif"}
                draggable="false"
                width={46}
                height={46}
                className="select-none rounded-full"
                alt=""
              />
            </div>
            <div className={"flex flex-1 flex-col p-3 pt-0 "}>
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
          {/* TEST */}
        </div>
      </Modal>
    </>
  );
}

export default CommentModal;
