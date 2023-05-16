import { useState } from "react";
import Tweet from "./Tweet";


function Searchfeed() {
  const [tweets, settweets] = useState([]);

  return (
    <div className="flex w-full flex-col">
      {tweets.map((tweet, index) => (
        <Tweet key={index} id={tweet.id} data={tweet.data()} />
      ))}
    </div>
  );
}

export default Searchfeed;
