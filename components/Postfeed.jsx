import { useState } from "react";
import TweetInput from "./TweetInput";
import Tweet from "./Tweet";

function Postfeed() {
  const selected = "font-bold before:inline text-white";
  const unselected = "before:hidden font-semibold text-neutral-500";

  const [styling, setstyling] = useState({
    button1: selected,
    button2: unselected,
  });

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start border-x border-gray-400 border-opacity-25 sm:max-w-[600px]">
      <div className="flex w-full flex-col">
        <div className="select-none p-3 text-xl font-bold">Home</div>
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
        <TweetInput />
      </div>
      <div className="flex w-full flex-col">
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
      </div>
    </div>
  );
}

export default Postfeed;
