import BottomBanner from "@/components/BottomBanner";
import Postfeed from "@/components/Postfeed";
import Sidebar from "@/components/Sidebar";
import Trending from "@/components/Trending";
import { hideBanner, showBanner } from "@/redux/modalSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const bannerState = useSelector((state) => state.modals.bannerState);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    user.email !== null ? dispatch(hideBanner()) : dispatch(showBanner());
  }, [user]);

  console.log(user);
  console.log(bannerState);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-full items-start justify-center bg-black text-[#e7e9e8] xl:max-w-[1400px]">
      <div className="sticky top-0 xl:w-full xl:max-w-[300px]">
        <Sidebar />
      </div>
      <Postfeed />
      <div className="sticky top-0">
        <Trending />
      </div>
      {bannerState && <BottomBanner />}
    </main>
  );
}
