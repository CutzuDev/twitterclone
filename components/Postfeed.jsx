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

  function handleSignOut() {
    signOut(auth);
    unsubscribe();
    dispatch(hideBanner());
  }

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      settweets(snapshot.docs);
    });
    return unsubscribe;
  }, []);

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) return;
    dispatch(
      setUser({
        username: null,
        name: null,
        email: null,
        uid: null,
        photoUrl: null,
      })
    );
    return unsubscribe;
  });

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start sm:border-x border-gray-400 border-opacity-25 sm:max-w-[600px]">
      <div className="flex w-full flex-col">
        <div className="flex items-center justify-between p-3">
          <span className="select-none text-xl font-bold">Home</span>
          {!bannerState && (
            <div
              onClick={() => {
                handleSignOut();
              }}
              className="rounded-full border border-neutral-500 border-opacity-0 p-[6px] text-neutral-200 transition-all duration-300 hover:border-red-500 hover:border-opacity-100 hover:text-red-500 sm:hidden"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            </div>
          )}
        </div>
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
            className={`${styling.button2} relative w-1/2 p-3 transition-all duration-200 before:absolute before:bottom-0 before:h-1 before:w-[4.5rem] before:rounded-full before:bg-blue-400 hover:bg-white hover:bg-opacity-10`}
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
