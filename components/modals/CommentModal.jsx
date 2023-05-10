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
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import Moment from "react-moment";
import { useRouter } from "next/router";

function CommentModal() {
  const router = useRouter();
  const tweetDetails = useSelector((state) => state.modals.commentTweetDetails);

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

  async function sendComment() {
    if (user.email !== null && text.length !== 0) {
      const docRef = doc(db, "posts", tweetDetails.id);
      const commentDetails = {
        username: user.username,
        name: user.name,
        photoUrl: user.photoUrl,
        comment: text,
      };
      await updateDoc(docRef, {
        comments: arrayUnion(commentDetails),
      });
    }
    setText("");
    dispatch(closeCommentModal());
    if (!tweetDetails.main) [router.reload()];
  }

  return (
    <>
      <Modal
        className="flex items-center justify-center"
        open={isOpen}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div className="flex w-[90%] flex-col items-center justify-center rounded-lg border border-gray-400 border-opacity-25 bg-black p-3 text-white outline-none sm:p-4 md:w-[575px]">
          <div className="flex w-full items-center justify-start">
            <XMarkIcon
              className="h-5 hover:cursor-pointer"
              onClick={() => dispatch(closeCommentModal())}
            />
          </div>
          <div className="mt-4 flex w-full">
            <div className="flex flex-col items-center justify-start">
              <Image
                src={tweetDetails.photoUrl || "/assets/cutzu.gif"}
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
                <div className="flex items-center justify-center gap-2 hover:cursor-pointer">
                  <span className="font-bold">{tweetDetails.username}</span>
                  <span className=" text-gray-400 text-opacity-50 hover:cursor-pointer">
                    @{tweetDetails.name}
                  </span>
                </div>
                <div className="hidden h-[3px] w-[3px] rounded-full bg-neutral-500 sm:inline"></div>
                <Moment fromNow className="hidden text-neutral-500 sm:inline">
                  {tweetDetails.timestamp}
                </Moment>
              </div>
              <div className="flex w-full flex-col">
                <span>{tweetDetails.content}</span>
                {tweetDetails.image && (
                  <img
                    src={tweetDetails.image}
                    className="mt-4 max-w-[75%] select-none rounded-2xl"
                  />
                )}
              </div>
              <div className="my-3 text-gray-400 text-opacity-50">
                Replying to{" "}
                <span className="text-blue-400 hover:cursor-pointer">
                  @{tweetDetails.name}
                </span>
              </div>
            </div>
          </div>


          <div className="flex w-full flex-col items-start sm:flex-row sm:items-start">
            <div
              className={
                "mb-4 flex min-w-fit flex-col items-center justify-start p-0"
              }
            >
              <Image
                src={user.photoUrl || "/assets/cutzu.gif"}
                draggable="false"
                width={46}
                height={46}
                className="select-none rounded-full"
                alt=""
              />
            </div>
            <div className="flex w-full flex-1 flex-col pt-0 sm:p-3">
              <div className="relative mb-2 w-full">
                <textarea
                  className=" w-full resize-none border-b border-b-gray-400 border-opacity-25 bg-transparent pb-8  font-medium placeholder-gray-400 focus:outline-none sm:text-lg"
                  placeholder="What's happening?"
                  maxLength={100}
                  value={text}
                  onChange={handleChange}
                ></textarea>
                <div className="absolute bottom-2 right-0 w-fit select-none text-neutral-500 text-opacity-75">
                  {counter}/100
                </div>
              </div>
              <div className="flex w-full items-center justify-between px-1">
                <ul className="flex items-center justify-center gap-1 bg-opacity-0">
                  <li
                    className={`flex items-center justify-center rounded-full ${styleIcons}`}
                  >
                    <PhotoIcon className=" h-4 w-4  text-blue-400 sm:h-5 sm:w-5" />
                  </li>
                  <li
                    className={`flex items-center justify-center rounded-full ${styleIcons}`}
                  >
                    <ChartBarIcon className=" h-4 w-4  text-blue-400 sm:h-5 sm:w-5" />
                  </li>
                  <li
                    className={`flex items-center justify-center rounded-full ${styleIcons}`}
                  >
                    <FaceSmileIcon className=" h-4 w-4  text-blue-400 sm:h-5 sm:w-5" />
                  </li>
                  <li
                    className={`flex items-center justify-center rounded-full ${styleIcons}`}
                  >
                    <CalendarIcon className=" h-4 w-4  text-blue-400 sm:h-5 sm:w-5" />
                  </li>
                  <li
                    className={`flex items-center justify-center rounded-full ${styleIcons}`}
                  >
                    <MapPinIcon className=" h-4 w-4  text-blue-400 sm:h-5 sm:w-5" />
                  </li>
                </ul>
                <button
                  className={`w-fit rounded-full bg-[#1d9bf0] px-3 py-1 font-bold sm:px-5 sm:py-2 ${tweetButton}`}
                  onClick={() => {
                    sendComment();
                  }}
                >
                  Tweet
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CommentModal;
