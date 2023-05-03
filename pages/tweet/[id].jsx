import BottomBanner from "@/components/BottomBanner";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import CommentModal from "@/components/modals/CommentModal";
import { db } from "@/firebase";
import { hideBanner, showBanner } from "@/redux/modalSlice";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
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


  const router = useRouter()
  const { id } = router.query

  const [tweets, settweets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      settweets(snapshot.docs);
    });
    return unsubscribe;
  }, []);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-full items-start justify-center bg-black text-[#e7e9e8] xl:max-w-[1400px]">
      <div className="sticky top-0 flex items-start justify-end xl:w-full xl:max-w-[350px]">
        <Sidebar />
      </div>
     
     <div className="flex min-h-screen w-full flex-col items-center justify-start border-x border-gray-400 border-opacity-25 sm:max-w-[600px]">
        {id}
     </div>
      <div className="sticky top-0">
        <Trending />
      </div>
      <CommentModal />
      {bannerState && <BottomBanner />}
    </main>
  );
}
