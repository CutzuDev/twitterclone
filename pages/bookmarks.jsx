import BottomBanner from "@/components/BottomBanner";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import Tweet from "@/components/Tweet";
import CommentModal from "@/components/modals/CommentModal";
import { auth, db } from "@/firebase";
import { hideBanner, showBanner } from "@/redux/modalSlice";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function bookmarks() {
  const dispatch = useDispatch();
  const bannerState = useSelector((state) => state.modals.bannerState);
  const user = useSelector((state) => state.user);
  const [bookmarkedTweets, setbookmarkedTweets] = useState([]);
  useEffect(() => {
    user.email !== null ? dispatch(hideBanner()) : dispatch(showBanner());
  }, [user]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setbookmarkedTweets(snapshot.docs);
    });
    return unsubscribe;
  }, []);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-full items-start justify-center bg-black text-[#e7e9e8] xl:max-w-[1400px]">
      <div className="sticky top-0 flex items-start justify-end xl:w-full xl:max-w-[350px]">
        <Sidebar />
      </div>
      <div className="flex min-h-screen w-full flex-col items-center justify-start border-x border-gray-400 border-opacity-25 sm:max-w-[600px]">
        <div className="flex w-full flex-col">
          <div className="relative select-none p-3 text-xl font-bold">Home</div>
          {bookmarkedTweets.map((tweet, index) => {
            if (tweet.data().bookmarks.includes(user.uid)) {
              return <Tweet key={index} id={tweet.id} data={tweet.data()} />;
            } else {
              return null;
            }
          })}
        </div>
      </div>

      <div className="sticky top-0">
        <Trending />
      </div>
      <CommentModal />
      {bannerState && <BottomBanner />}
    </main>
  );
}

export default bookmarks;
