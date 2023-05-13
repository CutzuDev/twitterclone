import { BookmarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Mobilebar() {
  const [isScrollingUp, setIsScrollingUp] = useState(true);

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

  const bannerState = useSelector((state) => state.modals.bannerState);
  if (!bannerState) {
    return (
      <ul
        className={` fixed bottom-0 ${
          isScrollingUp ? "flex" : "hidden"
        } w-full items-center justify-between border-t border-gray-400 border-opacity-25 bg-black px-8 py-2`}
      >
        <MobilebarItem Icon={BookmarkIcon} />
      </ul>
    );
  } else {
    return null;
  }
}

function MobilebarItem({ Icon }) {
  return (
    <li className="flex items-center justify-center rounded-full bg-black p-2">
      <Icon className="h-6" />
    </li>
  );
}

export default Mobilebar;
