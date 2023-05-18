import BottomBanner from "@/components/BottomBanner";
import Mobilebar from "@/components/Mobilebar";
import Sidebar from "@/components/Sidebar";
import { auth } from "@/firebase";
import { hideBanner, showBanner } from "@/redux/modalSlice";
import { updateProfile } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AccountPage() {
  const dispatch = useDispatch();
  const bannerState = useSelector((state) => state.modals.bannerState);
  const user = useSelector((state) => state.user);
  const [localUsername, setlocalUsername] = useState("Name");
  const [counter, setCounter] = useState(0);
  const router = useRouter();

  useEffect(() => {
    user.email !== null ? dispatch(hideBanner()) : dispatch(showBanner());
    user.email !== null ? setlocalUsername(user.username) : null;
  }, [user]);


  function handleChange(event) {
    setlocalUsername(event.target.value);
    setCounter(event.target.value.length);
  }

  async function handleButtonClick(event) {
    setCounter(0);
    setlocalUsername("");
    const parsedUsername = localUsername.split(" ").join("");
    const usernameCheck = parsedUsername.toLocaleLowerCase();
    if (
      usernameCheck === "cutzusd" ||
      usernameCheck === "admin" ||
      usernameCheck === "guestuser" ||
      user?.username.toLocaleLowerCase() === "guestuser"
    ) {
      alert("Action not allowed");
      setTimeout(() => {
        router.push("/");
      }, 250);
      return;
    }

    const updateUser = await updateProfile(auth.currentUser, {
      displayName: parsedUsername,
    });

    router.reload();
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-full items-start justify-center bg-black text-[#e7e9e8] xl:max-w-[1400px]">
      <Sidebar />
      <div className="flex min-h-screen w-full flex-col items-center justify-start border-gray-400 border-opacity-25 sm:max-w-[600px] sm:border-x">
        <div className="flex w-full items-center justify-between p-4">
          <span className="text-lg font-bold">Edit Profile</span>
          <button
            disabled={counter === 0}
            className={`rounded-full bg-white px-4 py-1 text-black ${
              counter === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleButtonClick}
          >
            Save
          </button>
        </div>
        <div className="flex w-full flex-col">
          <div className={`h-[170px] w-full bg-gray-400`}></div>
          <div className="relative h-[100px] w-full bg-black">
            <div className="absolute -top-10 left-4 rounded-full bg-black p-1">
              <Image
                src={user.photoUrl || "/assets/cutzu.gif"}
                width={115}
                height={115}
                className="rounded-full"
              />
            </div>
          </div>
        </div>
        <div className="relative flex w-full items-center justify-center p-4">
          <span className=" absolute left-[25px] top-6 text-xs text-gray-400 text-opacity-50">
            Name
          </span>
          <input
            type="text"
            className="w-full rounded-[4px] border border-gray-400 border-opacity-25 bg-transparent p-2 pt-6 outline-none"
            value={localUsername}
            onChange={handleChange}
            maxLength={10}
          />
        </div>
      </div>
      {bannerState && <BottomBanner />}
      <Mobilebar />
    </div>
  );
}

export default AccountPage;
