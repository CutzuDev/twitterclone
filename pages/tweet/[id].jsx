import BottomBanner from "@/components/BottomBanner";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import CommentModal from "@/components/modals/CommentModal";
import { db } from "@/firebase";
import { hideBanner, showBanner } from "@/redux/modalSlice";
import {
  ArrowLeftIcon,
  ArrowPathRoundedSquareIcon,
  ArrowSmallLeftIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Image from "next/image";
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
  const { id } = router.query;

  const [tweets, settweets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      settweets(snapshot.docs);
    });
    return unsubscribe;
  }, []);




  // 

  const tweetDetails = useSelector((state) => state.modals.commentTweetDetails);

  const isOpen = useSelector((state) => state.modals.commentModalOpen);

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
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-full items-start justify-center bg-black text-[#e7e9e8] xl:max-w-[1400px]">
      <div className="sticky top-0 flex items-start justify-end xl:w-full xl:max-w-[350px]">
        <Sidebar />
      </div>

      <div className="flex min-h-screen w-full flex-col items-center justify-start border-x border-gray-400 border-opacity-25 sm:max-w-[600px]">
        <div className="flex w-full items-center justify-start gap-6 p-2 hover:cursor-pointer">
          <div className="flex items-center justify-center rounded-full p-2 transition-all duration-100 hover:cursor-pointer hover:bg-gray-400 hover:bg-opacity-[15%]">
            <ArrowSmallLeftIcon className="h-5 stroke-2" />
          </div>
          <span className="mb-1 select-none text-xl font-semibold">Tweet</span>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col items-center justify-start p-3">
            <Image
              src={"/assets/cutzu.gif"}
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
                  username
                </span>
                <span className=" text-gray-400 text-opacity-50 hover:cursor-default">
                  @name
                </span>
              </div>
              <EllipsisHorizontalIcon className="h-6 text-gray-400 text-opacity-75" />
            </div>
          </div>
        </div>
        <span className="w-full p-4 pt-0 text-lg">test</span>
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
      </div>

      <div className="sticky top-0">
        <Trending />
      </div>
      <CommentModal />
      {bannerState && <BottomBanner />}
    </main>
  );
}
