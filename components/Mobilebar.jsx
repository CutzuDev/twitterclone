import { auth } from "@/firebase";
import { hideBanner, openSearchModal } from "@/redux/modalSlice";
import { setUser } from "@/redux/userSlice";
import {
  ArrowLeftOnRectangleIcon,
  BookmarkIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchModal from "./modals/SearchModal";

function Mobilebar() {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isOpen = useSelector((state) => state.modals.searchModalOpen);

  useEffect(() => {
    let prevScrollPosition = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      const scrolledDown = prevScrollPosition < currentScrollPosition;

      if (scrolledDown && currentScrollPosition > 100) {
        setIsScrollingUp(false);
      } else if (!scrolledDown) {
        setTimeout(() => {
          setIsScrollingUp(true);
        }, 200);
      }

      prevScrollPosition = currentScrollPosition;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleSignOut() {
    signOut(auth);
    unsubscribe();
    dispatch(hideBanner());
  }

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

  const bannerState = useSelector((state) => state.modals.bannerState);
  if (!bannerState) {
    return (
      <div
        className={`fixed bottom-0 sm:hidden ${
          isScrollingUp ? "flex" : "hidden"
        } w-full items-center justify-between border-t border-gray-400 border-opacity-25 bg-black px-8 py-2`}
      >
        <Link href={"/"}>
          <MobilebarItem Icon={HomeIcon} enabled={true} />
        </Link>
        <div className="relative">
          <div
            onClick={() => {
              dispatch(openSearchModal());
            }}
          >
            <MobilebarItem Icon={MagnifyingGlassIcon} enabled={true} />
          </div>
          <SearchModal />
        </div>
        <Link href={"/bookmarks"}>
          <MobilebarItem Icon={BookmarkIcon} enabled={true} />
        </Link>
        <div
          onClick={() => {
            handleSignOut();
          }}
        >
          <MobilebarItem Icon={ArrowLeftOnRectangleIcon} enabled={true} />
        </div>
      </div>
    );
  } else {
    return null;
  }
}

function MobilebarItem({ Icon, enabled }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-black p-2  ${
        enabled ? "hover:cursor-pointer" : "hover:cursor-not-allowed"
      }`}
    >
      <Icon className="h-6" />
    </div>
  );
}

export default Mobilebar;
