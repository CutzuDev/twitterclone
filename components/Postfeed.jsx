import { useState, useEffect } from "react";
import Tweet from "./Tweet";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";

function Postfeed() {
  const [tweets, settweets] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      settweets(snapshot.docs);
    });
    return unsubscribe;
  }, []);

  return (
    <div className="flex w-full flex-col">
      {tweets.map((tweet, index) => (
        <Tweet key={index} id={tweet.id} data={tweet.data()} />
      ))}
    </div>
  );
}

export default Postfeed;
