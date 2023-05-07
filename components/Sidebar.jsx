import {
  HomeIcon,
  HashtagIcon,
  InboxIcon,
  BookmarkIcon,
  BellIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import UserSection from "./UserSection";

function Sidebar() {
  return (
    <div className="hidden h-screen w-full max-w-[300px] flex-col items-center justify-between px-2 py-1 sm:flex">
      <div className="flex w-full flex-col items-center justify-center gap-4 p-2 xl:pr-8">
        <Link
          href={"/"}
          className="flex w-fit items-center justify-start p-2 xl:w-full xl:px-4"
          draggable="false"
        >
          <Image
            src={"/assets/twitter-logo.png"}
            draggable="false"
            width={28}
            height={28}
            className="select-none opacity-80"
            alt=""
          />
        </Link>
        <nav className="flex w-full flex-col items-center justify-center gap-3 xl:items-start xl:gap-2">
          <SideBarLink text={"Home"} Icon={HomeIcon} />
          <SideBarLink text={"Explore"} Icon={HashtagIcon} />
          <SideBarLink text={"Notifications"} Icon={BellIcon} />
          <SideBarLink text={"Messages"} Icon={InboxIcon} />
          <SideBarLink text={"Bookmarks"} Icon={BookmarkIcon} />
          <SideBarLink text={"Profile"} Icon={UserIcon} />
          <SideBarLink text={"More"} Icon={EllipsisHorizontalCircleIcon} />
        </nav>
        <button className="w-fit rounded-full bg-[#1d9bf0] p-3 text-lg font-bold xl:w-full">
          <ChatBubbleBottomCenterTextIcon className="h-7 xl:hidden" />
          <span className="hidden xl:inline">Tweet</span>
        </button>
      </div>
      <UserSection />
    </div>
  );
}
function SideBarLink({ text, Icon }) {
  return (
    <li className="flex w-fit select-none items-center justify-start gap-4 rounded-full p-2 text-xl transition-all duration-100 hover:cursor-pointer hover:bg-white hover:bg-opacity-10 xl:px-4 xl:py-[10px] xl:pr-6">
      <Icon className="h-7" />
      <span className="hidden xl:inline">{text}</span>
    </li>
  );
}

export default Sidebar;
