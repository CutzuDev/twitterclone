import BottomBanner from "@/components/BottomBanner";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import CommentModal from "@/components/modals/CommentModal";
import { db } from "@/firebase";
import { hideBanner, showBanner } from "@/redux/modalSlice";
import {
  ArrowPathRoundedSquareIcon,
  ArrowSmallLeftIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CommentsPage() {
  const dispatch = useDispatch();
  const bannerState = useSelector((state) => state.modals.bannerState);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    user.email !== null ? dispatch(hideBanner()) : dispatch(showBanner());
  }, [user]);

  const router = useRouter();
  const id = router.query.id;

  const [comments, setcomments] = useState([]);
  const [tweetData, settweetData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "posts", id);
      const docFetch = await getDoc(docRef);
      const docData = docFetch.data();
      settweetData(docData);
      setcomments(docData?.comments);
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-full items-start justify-center bg-black text-[#e7e9e8] xl:max-w-[1400px]">
      <div className="sticky top-0 flex items-start justify-end xl:w-full xl:max-w-[350px]">
        <Sidebar />
      </div>

      <div className="flex min-h-screen w-full flex-col items-center justify-start border-x border-gray-400 border-opacity-25 sm:max-w-[600px]">
        <div className="flex w-full items-center justify-start gap-6 p-2 hover:cursor-pointer">
          <Link
            href="/"
            className="flex items-center justify-center rounded-full p-2 transition-all duration-100 hover:cursor-pointer hover:bg-gray-400 hover:bg-opacity-[15%]"
          >
            <ArrowSmallLeftIcon className="h-5 stroke-2" />
          </Link>
          <span className="mb-1 select-none text-xl font-semibold">Tweet</span>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col items-center justify-start p-3">
            <Image
              src={tweetData?.photoUrl || "/assets/cutzu.gif"}
              draggable="false"
              width={46}
              height={46}
              className="select-none rounded-full"
              alt=""
            />
          </div>
          <div className="flex flex-1 flex-col p-2 pl-0">
            <div className="flex items-center justify-between gap-1">
              <div className="flex flex-col items-start justify-center">
                <span className="font-semibold hover:cursor-default">
                  {tweetData?.username ? tweetData.username : "username"}
                </span>
                <span className=" text-gray-400 text-opacity-50 hover:cursor-default">
                  {tweetData?.name ? `@${tweetData.name}` : "@name"}
                </span>
              </div>
              <EllipsisHorizontalIcon className="h-6 text-gray-400 text-opacity-75" />
            </div>
          </div>
        </div>
        <span className="w-full p-4 pt-0 text-lg">{tweetData?.content}</span>
        {/*  */}
        <div className="flex w-full px-4">
          <div className="flex w-full items-center justify-around border-y border-gray-400 border-opacity-25 px-3 py-1 text-neutral-500 ">
            <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500">
              <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 " />
            </div>
            <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-green-400 hover:bg-opacity-10 hover:text-green-400">
              <ArrowPathRoundedSquareIcon className="h-6 w-6 " />
            </div>

            <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-pink-600 hover:bg-opacity-10 hover:text-pink-600">
              <HeartIcon className="h-6 w-6 " />
            </div>

            <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500">
              <ChartBarIcon className="h-6 w-6 " />
            </div>

            <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500">
              <ArrowUpTrayIcon className="h-6 w-6 " />
            </div>
          </div>
        </div>
        {/*  */}

        <div className="flex w-full items-center justify-between border-b border-gray-400 border-opacity-25 p-4">
          <div className="flex h-full flex-col items-center justify-start">
            <Image
              src={"/assets/cutzu.gif"}
              draggable="false"
              width={46}
              height={46}
              className="select-none rounded-full"
              alt=""
            />
          </div>
          <span className="flex-1 select-none px-4 text-xl text-gray-400 text-opacity-50 hover:cursor-default">
            Tweet your reply
          </span>
          <button className="rounded-full bg-blue-400 px-4 py-[6px] font-bold opacity-50">
            Reply
          </button>
        </div>
        {/*  */}

        {comments
          ? comments.map((fetchedCommentData) => (
              <CommentElement
                commentData={fetchedCommentData}
                comments={comments}
                id={id}
              />
            ))
          : null}
        {/*  */}
      </div>

      <div className="sticky top-0">
        <Trending />
      </div>
      <CommentModal />
      {bannerState && <BottomBanner />}
    </main>
  );
}

function CommentElement({ commentData, comments, id }) {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  async function handleCommentDelete(commentDataContent) {
    for (let elem of comments) {
      if (elem.comment === commentDataContent) {
        console.log("found");

        const docRef = doc(db, "posts", id);

        await updateDoc(docRef, {
          comments: arrayRemove(elem),
        });
        router.reload();
      }

      return;
    }
  }

  return (
    <div className="flex w-full border-b border-gray-400 border-opacity-25 transition-all duration-100 hover:bg-gray-400 hover:bg-opacity-5 ">
      <div className="flex flex-col items-center justify-start  p-3">
        <Image
          src={commentData.photoUrl || "/assets/cutzu.gif"}
          draggable="false"
          width={46}
          height={46}
          className="select-none rounded-full"
          alt=""
        />
      </div>
      <div className="flex flex-1 flex-col items-start justify-start p-2 pl-0">
        <div className="relative flex w-full items-center justify-between">
          <div className="flex items-start justify-center gap-2">
            <span className="font-semibold hover:cursor-default">
              {commentData.username}
            </span>
            <span className="text-gray-400 text-opacity-50 hover:cursor-default">
              @{commentData.name}
            </span>
          </div>
          {process.env.NEXT_PUBLIC_ADMIN_UID === user?.uid ? (
            <TrashIcon
              onClick={(event) => {
                event.stopPropagation();
                handleCommentDelete(commentData.comment);
              }}
              className="absolute -bottom-10 right-0 h-7 w-7 rounded-full border border-red-500 border-opacity-0 p-1 text-gray-400 text-opacity-50 transition-all duration-300 hover:border-opacity-100 hover:stroke-2 hover:text-red-500 hover:text-opacity-100"
            />
          ) : null}
          <EllipsisHorizontalIcon className="h-6 text-gray-400 text-opacity-75" />
        </div>
        <div className="flex w-full flex-col gap-2 ">
          <span className="break-all hover:cursor-default">
            {commentData.comment}
          </span>
          <div className="flex w-full max-w-[425px] items-center justify-between py-1 text-neutral-500 ">
            <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500">
              <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 " />
            </div>
            <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-green-400 hover:bg-opacity-10 hover:text-green-400">
              <ArrowPathRoundedSquareIcon className="h-5 w-5 " />
            </div>

            <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-pink-600 hover:bg-opacity-10 hover:text-pink-600">
              <HeartIcon className="h-5 w-5 " />
            </div>

            <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500">
              <ChartBarIcon className="h-5 w-5 " />
            </div>

            <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500">
              <ArrowUpTrayIcon className="h-5 w-5 " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
