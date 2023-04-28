import { openCommentModal } from "@/redux/modalSlice";
import {
  ArrowPathRoundedSquareIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Moment from "react-moment";
import { useDispatch } from "react-redux";

export default function Tweet({ data }) {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col border-b border-gray-400 border-opacity-25 transition-all duration-100 hover:bg-gray-400 hover:bg-opacity-5">
      <TweetHeader
        username={data?.username}
        name={data?.name}
        timestamp={data?.timestamp?.toDate()}
        text={data?.content}
        photo={data?.photoUrl}
      />
      <div className="flex gap-5 p-3 pl-[74px] text-neutral-500 sm:gap-6 md:gap-8 xl:gap-10">
        <div className="flex items-center justify-center gap-1">
          <div
            onClick={() => dispatch(openCommentModal())}
            className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500"
          >
            <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
          </div>
          <span className="hover:cursor-default">0</span>
        </div>
        <div className="flex items-center justify-center gap-1">
          <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-green-400 hover:bg-opacity-10 hover:text-green-400">
            <ArrowPathRoundedSquareIcon className="h-5 w-5" />
          </div>
          <span className="hover:cursor-default">0</span>
        </div>

        <div className="flex items-center justify-center gap-1">
          <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-pink-600 hover:bg-opacity-10 hover:text-pink-600">
            <HeartIcon className="h-5 w-5" />
          </div>
          <span className="hover:cursor-default">0</span>
        </div>

        <div className="flex items-center justify-center gap-1">
          <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500">
            <ChartBarIcon className="h-5 w-5" />
          </div>
          <span className="hover:cursor-default">0</span>
        </div>

        <div className="flex items-center justify-center gap-1">
          <div className="flex items-center justify-center rounded-full p-2 transition-all duration-200 hover:cursor-pointer hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500">
            <ArrowUpTrayIcon className="h-5 w-5" />
          </div>
          <span className="hover:cursor-default">0</span>
        </div>
      </div>
    </div>
  );
}

export function TweetHeader({ username, name, timestamp, text, photo }) {
  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center justify-start p-3">
        <Image
          src={photo || "/assets/cutzu.gif"}
          draggable="false"
          width={46}
          height={46}
          className="select-none rounded-full"
          alt=""
        />
      </div>
      <div className="flex flex-1 flex-col p-2 pr-4">
        <div className="flex items-center justify-start gap-1">
          <div className="flex items-center justify-center gap-2">
            <span className="font-semibold hover:cursor-default">
              {username}
            </span>
            <span className=" text-gray-400 text-opacity-50 hover:cursor-default">
              @{name}
            </span>
          </div>
          <div className="h-[3px] w-[3px] rounded-full bg-neutral-500"></div>

          <Moment fromNow className="text-neutral-500 hover:cursor-default">
            {timestamp}
          </Moment>
        </div>
        <span className="break-all hover:cursor-default">{text}</span>
      </div>
    </div>
  );
}
