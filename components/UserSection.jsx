import { auth } from "@/firebase";
import { hideBanner } from "@/redux/modalSlice";
import { setUser } from "@/redux/userSlice";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

function UserSection() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
  return (
    <div
      onClick={() => {
        handleSignOut();
      }}
      className="mb-4 flex w-full items-center justify-start rounded-full p-3 transition-all duration-200 hover:cursor-pointer hover:bg-white hover:bg-opacity-10"
    >
      <Image
        src={user.photoUrl || "/assets/cutzu.gif"}
        draggable="false"
        width={42}
        height={42}
        className="select-none rounded-full"
        alt=""
      />
      <div className=" hidden flex-1 flex-col px-3 xl:flex">
        <span className="ml-[2px] max-w-[100px] truncate font-semibold">
          {user?.username ? user.username : "username"}
        </span>
        <span className="max-w-[100px] truncate text-gray-400 text-opacity-50">
          {user?.name ? `@${user.name}` : "@username"}
        </span>
      </div>
      <EllipsisHorizontalIcon className="mr-1 hidden h-6 text-white xl:inline" />
    </div>
  );
}

export default UserSection;
