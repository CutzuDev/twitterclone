import { db } from "@/firebase";
import {
  openCommentModal,
  openLoginModal,
  setTweetDetails,
} from "@/redux/modalSlice";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import {
  HeartIcon as FilledHeartIcon,
  BookmarkIcon as FilledBookmarkIcon,
} from "@heroicons/react/24/solid";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";

export default function Tweet({ data, id }) {
  const [copyAnimation, setcopyAnimation] = useState(false);

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const router = useRouter();

  const [pageURL, setpageURL] = useState("");
  useEffect(() => {
    const currentpageURL = window.location.href;
    setpageURL(`${currentpageURL}tweet/${id}`);
  }, []);

  async function likeComment() {
    if (!user.email) {
      dispatch(openLoginModal());
      return;
    }

    if (data.likes.includes(user.uid)) {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        likes: arrayUnion(user.uid),
      });
    }
  }
  async function retweetComment() {
    if (!user.email) {
      dispatch(openLoginModal());
      return;
    }

    if (data.retweets.includes(user.uid)) {
      await updateDoc(doc(db, "posts", id), {
        retweets: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        retweets: arrayUnion(user.uid),
      });
    }
  }
  async function bookmarkComment() {
    if (!user.email) {
      dispatch(openLoginModal());
      return;
    }

    if (data.bookmarks.includes(user.uid)) {
      await updateDoc(doc(db, "posts", id), {
        bookmarks: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(doc(db, "posts", id), {
        bookmarks: arrayUnion(user.uid),
      });
    }
  }
  return (
    <div
      onClick={() => router.push("/tweet/" + id)}
      className="flex flex-col border-b border-gray-400 border-opacity-25 transition-all duration-100 hover:cursor-pointer hover:bg-gray-400 hover:bg-opacity-5"
    >
      <TweetHeader
        username={data?.username}
        name={data?.name}
        timestamp={data?.timestamp?.toDate()}
        text={data?.content}
        photo={data?.photoUrl}
        uid={data?.uid}
        image={data?.image}
        tweetId={id}
      />
      <div className="flex gap-5 p-3 text-neutral-500 sm:gap-6 sm:pl-[74px] md:gap-8 xl:gap-10">
        <div
          onClick={(event) => {
            event.stopPropagation();
            dispatch(
              setTweetDetails({
                id: id,
                content: data?.content,
                photoUrl: data?.photoUrl,
                name: data?.name,
                username: data?.username,
                timestamp: data?.timestamp?.toDate(),
                image: data?.image,
                main: true,
              })
            );
            dispatch(openCommentModal());
          }}
          className="flex items-center justify-center gap-1"
        >
          <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500">
            <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          </div>
          <span className="hover:cursor-pointer select-none ">
            {data.comments?.length ? data.comments?.length : "0"}
          </span>
        </div>
        <div
          onClick={(event) => {
            event.stopPropagation();
            retweetComment();
          }}
          className="flex items-center justify-center gap-1"
        >
          <div
            className={`flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer  ${
              data.retweets.includes(user.uid)
                ? "text-green-400"
                : "text-neutral-500"
            } hover:bg-green-400 hover:bg-opacity-10 hover:text-green-400`}
          >
            <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          </div>
          <span className="hover:cursor-pointer select-none">
            {data.retweets?.length ? data.retweets?.length : "0"}
          </span>
        </div>

        <div
          onClick={(event) => {
            event.stopPropagation();
            likeComment();
          }}
          className="flex items-center justify-center gap-1"
        >
          <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-pink-600 hover:bg-opacity-10 hover:text-pink-600">
            {data.likes.includes(user.uid) ? (
              <FilledHeartIcon className="w-5 text-pink-500" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
          </div>
          <span className="hover:cursor-pointer select-none">
            {data.likes?.length ? data.likes?.length : "0"}
          </span>
        </div>

        <div
          onClick={(event) => {
            event.stopPropagation();
            bookmarkComment();
          }}
          className="flex items-center justify-center gap-1"
        >
          <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500">
            {data.bookmarks.includes(user.uid) ? (
              <FilledBookmarkIcon className="w-5 text-blue-500" />
            ) : (
              <BookmarkIcon className="h-5 w-5" />
            )}
          </div>
          <span className="hover:cursor-pointer select-none">
            {" "}
            {data.bookmarks?.length ? data.bookmarks?.length : "0"}
          </span>
        </div>

        <div className="flex items-center justify-center gap-1">
          <div
            onClick={(event) => {
              event.stopPropagation();
              navigator.clipboard.writeText(pageURL);
              setcopyAnimation(true);
              setTimeout(() => {
                setcopyAnimation(false);
              }, 1000);
            }}
            className={`hover:pointer flex items-center justify-center rounded-full ${
              copyAnimation ? "animate-ping" : ""
            } p-2 transition-all duration-200 hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500`}
          >
            <ArrowUpTrayIcon className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TweetHeader({
  username,
  name,
  timestamp,
  text,
  photo,
  uid,
  tweetId,
  image,
}) {
  const user = useSelector((state) => state.user);

  function handleDelete() {
    deleteDoc(doc(db, "posts", tweetId));
  }

  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center justify-start p-3">
        <Image
          src={photo || "/assets/cutzu.gif"}
          draggable="false"
          width={46}
          height={46}
          className="select-none rounded-full"
          alt=""
        />
      </div>
      <div className="flex flex-1 flex-col p-2 pr-4">
        <div className="flex w-full items-center justify-between ">
          <div className="flex items-center justify-start gap-1">
            <div className="flex items-center justify-center gap-2">
              <span className="font-semibold hover:cursor-default">
                {username}
              </span>
              <span className=" text-gray-400 text-opacity-50 hover:cursor-default">
                @{name}
              </span>
            </div>
            <div className="hidden h-[3px] w-[3px] rounded-full bg-neutral-500 sm:inline"></div>

            <Moment
              fromNow
              className="hidden text-neutral-500 hover:cursor-default sm:inline"
            >
              {timestamp}
            </Moment>
          </div>

          {process.env.NEXT_PUBLIC_ADMIN_UID === user?.uid ||
          user?.uid === uid ? (
            <TrashIcon
              onClick={(event) => {
                event.stopPropagation();
                handleDelete();
              }}
              className="h-7 w-7 rounded-full border border-red-500 border-opacity-0 p-1 text-gray-400 text-opacity-50 transition-all duration-300 hover:border-opacity-100 hover:stroke-2 hover:text-red-500 hover:text-opacity-100"
            />
          ) : null}
        </div>
        <div className="flex w-full flex-col">
          <span className="break-all">{text}</span>
          {image && (
            <div className="mt-4 max-w-[75%]">
              <img
                src={image}
                className="max-h-[400px] select-none rounded-2xl object-cover "
                alt=""
                draggable={false}
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
