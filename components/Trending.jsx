import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

function Trending() {
  const trendingList = [
    {
      title: "Fun",
      topic: "Doge",
      tweets: "69k",
    },
    {
      title: "Fun",
      topic: "Doge",
      tweets: "69k",
    },
    {
      title: "Fun",
      topic: "Doge",
      tweets: "69k",
    },
    {
      title: "Fun",
      topic: "Doge",
      tweets: "69k",
    },
  ];

  const followList = [
    {
      name: "Cutzu WebDev",
      tag: "cutzu",
      picture: "/assets/cutzu.gif",
    },
    {
      name: "Cutzu WebDev",
      tag: "cutzu",
      picture: "/assets/cutzu.gif",
    },
    {
      name: "Cutzu WebDev",
      tag: "cutzu",
      picture: "/assets/cutzu.gif",
    },
  ];

  return (
    <div className=" ml-8 hidden min-h-screen flex-col items-center justify-start gap-3 py-3 lg:flex lg:w-full lg:max-w-[350px]">
      <div className="focus-within: group flex w-full items-center justify-center gap-2 rounded-full border-blue-400 bg-gray-400 bg-opacity-[24%] px-4 py-2 focus-within:border focus-within:bg-transparent ">
        <MagnifyingGlassIcon className="h-6 text-gray-400 text-opacity-50" />
        <input
          onFocus={(event) => {
            let classNameValue =
              event.target.parentNode.children[0].className.baseVal.split(" ");
            for (let elem of classNameValue.keys()) {
              if (classNameValue[elem] === "text-gray-400") {
                classNameValue[elem] = "text-blue-400";
              } else if (classNameValue[elem] === "text-opacity-50") {
                classNameValue[elem] = "text-opacity-100";
              }
            }
            event.target.parentNode.children[0].className.baseVal =
              classNameValue.join(" ");
          }}
          onBlur={(event) => {
            let classNameValue =
              event.target.parentNode.children[0].className.baseVal.split(" ");
            for (let elem of classNameValue.keys()) {
              if (classNameValue[elem] === "text-blue-400") {
                classNameValue[elem] = "text-gray-400";
              } else if (classNameValue[elem] === "text-opacity-100") {
                classNameValue[elem] = "text-opacity-50";
              }
            }
            event.target.parentNode.children[0].className.baseVal =
              classNameValue.join(" ");
          }}
          placeholder="Search Twitter"
          type="text"
          className="mb-[2px] w-full bg-transparent outline-none placeholder:text-gray-400 placeholder:text-opacity-50"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-start rounded-2xl bg-slate-400 bg-opacity-[17%]">
        <span className="mb-1 w-full px-4 py-2 text-left text-xl font-bold">
          Trends for you
        </span>
        <ul className="flex w-full flex-1 flex-col">
          {trendingList.map((item, index) => (
            <TrendingListItem
              title={item.title}
              topic={item.topic}
              tweets={item.tweets}
              key={index}
            />
          ))}
          <span className="mb-2 select-none px-4 py-2 text-blue-400 hover:cursor-pointer">
            Show More
          </span>
        </ul>
      </div>
      <div className="flex w-full flex-col items-center justify-start rounded-2xl bg-slate-400 bg-opacity-[17%]">
        <span className="mb-1 w-full px-4 py-2 text-left text-xl font-bold">
          Who to follow
        </span>
        <ul className="flex w-full flex-1 flex-col">
          {followList.map((item, index) => (
            <FollowListItem
              name={item.name}
              tag={item.tag}
              picture={item.picture}
              key={index}
            />
          ))}
          <span className="mb-2 select-none px-4 py-2 text-blue-400 hover:cursor-pointer ">
            Show More
          </span>
        </ul>
      </div>
      <div className="flex w-full flex-wrap gap-2 px-4 text-gray-400 text-opacity-50">
        <span className="text-sm">Terms of Service</span>
        <span className="text-sm">Privacy Policy</span>
        <span className="text-sm">Cookie Policy</span>
        <span className="text-sm">Accessibility</span>
        <span className="text-sm">Ads Info</span>
        <span className="flex items-center gap-[2px] text-sm">
          More
          <EllipsisHorizontalIcon className="h-5 pt-1 text-gray-400 text-opacity-50" />
        </span>
        <span className="text-sm">© 2023 x Corp.</span>
      </div>
    </div>
  );
}

export default Trending;

function TrendingListItem({ title, tweets, topic }) {
  return (
    <li className="flex w-full items-center justify-between px-4 py-2 transition-all duration-200 hover:cursor-pointer hover:bg-white hover:bg-opacity-10">
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-start gap-1 text-sm font-semibold text-gray-400 text-opacity-50">
          <span>{title}</span>
          <div className="h-[3px] w-[3px] rounded-full bg-slate-400 bg-opacity-50"></div>
          <span>Trending</span>
        </div>
        <span className="font-bold">{topic}</span>
        <span className="mt-1 text-sm font-semibold text-gray-400 text-opacity-50">
          {tweets} Tweets
        </span>
      </div>
      <div className="flex h-full flex-col items-center justify-start">
        <EllipsisHorizontalIcon className="h-6 text-gray-400 text-opacity-50" />
      </div>
    </li>
  );
}

function FollowListItem({ name, tag, picture }) {
  return (
    <li className="flex w-full items-center justify-start px-4 py-2 transition-all duration-200 hover:cursor-pointer hover:bg-white hover:bg-opacity-10">
      <Image
        src={picture}
        draggable="false"
        width={46}
        height={46}
        className="select-none rounded-full"
        alt=""
      />
      <div className="flex flex-1 flex-col px-3">
        <span className="relative w-fit font-bold before:absolute before:bottom-0 before:left-0 before:hidden before:h-[2px] before:w-full before:rounded-full before:bg-white hover:before:inline">
          {name}
        </span>
        <span className="text-gray-400 text-opacity-50">@{tag}</span>
      </div>
      <button className="rounded-full bg-white px-4 py-1 font-semibold text-black transition-all duration-200 hover:bg-slate-200">
        Follow
      </button>
    </li>
  );
}
