import { useState, useEffect } from "react";
import TweetInput from "./TweetInput";
import Tweet from "./Tweet";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { hideBanner, showBanner } from "@/redux/modalSlice";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { setUser } from "@/redux/userSlice";

function Postfeed() {
  const selected = "font-bold before:inline text-white";
  const unselected = "before:hidden font-semibold text-neutral-500";
  const bannerState = useSelector((state) => state.modals.bannerState);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [tweets, settweets] = useState([]);

  const [styling, setstyling] = useState({
    button1: selected,
    button2: unselected,
  });

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      settweets(snapshot.docs);
    });
    return unsubscribe;
  }, []);


  return (
    <div className="sm:max-w-[600px] flex min-h-screen w-full flex-col items-center justify-start border-gray-400 border-opacity-25 sm:border-x">
      <div className="flex w-full flex-col">
        <span className="select-none p-3 text-xl font-bold">Home</span>
        <div className="flex justify-between">
          <button
            onClick={() => {
              setstyling({
                button1: selected,
                button2: unselected,
              });
            }}
            className={`${styling.button1} relative w-1/2 p-3 transition-all duration-200 before:absolute before:bottom-0 before:h-1 before:w-14 before:rounded-full before:bg-blue-400 hover:bg-white hover:bg-opacity-10`}
          >
            For You
          </button>
          <button
            onClick={() => {
              setstyling({
                button1: unselected,
                button2: selected,
              });
            }}
            className={`${styling.button2} before:w-[4.5rem] relative w-1/2 p-3 transition-all duration-200 before:absolute before:bottom-0 before:h-1 before:rounded-full before:bg-blue-400 hover:bg-white hover:bg-opacity-10`}
          >
            Following
          </button>
        </div>
        <div className="border-y border-gray-400 border-opacity-25">
          <TweetInput />
        </div>
      </div>
      <div className="flex w-full flex-col">
        {tweets.map((tweet, index) => (
          <Tweet key={index} id={tweet.id} data={tweet.data()} />
        ))}
      </div>
    </div>
  );
}

export default Postfeed;
