import BottomBanner from "@/components/BottomBanner";
import Mobilebar from "@/components/Mobilebar";
import Postfeed from "@/components/Postfeed";
import Searchfeed from "@/components/Searchfeed";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import TweetInput from "@/components/TweetInput";
import CommentModal from "@/components/modals/CommentModal";
import { hideBanner, showBanner } from "@/redux/modalSlice";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { search } = router.query;
  const [queryState, setqueryState] = useState(true);
  const bannerState = useSelector((state) => state.modals.bannerState);
  const user = useSelector((state) => state.user);
  const selected = "font-bold before:inline text-white";
  const unselected = "before:hidden font-semibold text-neutral-500";
  const [styling, setstyling] = useState({
    button1: selected,
    button2: unselected,
  });

  if (search && queryState) {
    setqueryState(false);
  }

  useEffect(() => {
    user.email !== null ? dispatch(hideBanner()) : dispatch(showBanner());
  }, [user]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-full items-start justify-center bg-black text-[#e7e9e8] xl:max-w-[1400px]">
      <div className="sticky top-0 flex items-start justify-end xl:w-full xl:max-w-[350px]">
        <Sidebar />
      </div>

      <div className="flex min-h-screen w-full flex-col items-center justify-start border-gray-400 border-opacity-25 sm:max-w-[600px] sm:border-x">
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
              className={`${styling.button2} relative w-1/2 p-3 transition-all duration-200 before:absolute before:bottom-0 before:h-1 before:w-[4.5rem] before:rounded-full before:bg-blue-400 hover:bg-white hover:bg-opacity-10`}
            >
              Following
            </button>
          </div>
          <div className="border-y border-gray-400 border-opacity-25">
            <TweetInput />
          </div>
        </div>

        {search ? <Searchfeed searchQuery={search} /> : <Postfeed />}
      </div>
      <div className="sticky top-0">
        <Trending />
      </div>
      <CommentModal />
      {bannerState && <BottomBanner />}
      <Mobilebar />
    </main>
  );
}
