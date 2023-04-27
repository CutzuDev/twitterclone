import {
  closeSignupModal,
  hideBanner,
  openSignupModal,
} from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase";
import { useEffect, useState } from "react";
import { setUser } from "@/redux/userSlice";
import { useRouter } from "next/router";
import { HandleGuest } from "./HandleGuest";

function SignupModal() {
  const isOpen = useSelector((state) => state.modals.signupModalOpen);
  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");

  const router = useRouter();

  async function handleSignUp(event) {
    event.preventDefault();
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const updateUser = await updateProfile(auth.currentUser, {
      displayName: username,
      photoURL: `/assets/profilePictures/pfp${Math.ceil(
        Math.random() * 6
      )}.png`,
    });

    dispatch(closeSignupModal());
    dispatch(hideBanner());
    router.reload();
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      dispatch(
        setUser({
          username: currentUser.displayName,
          name: currentUser.displayName.toLowerCase(),
          email: currentUser.email,
          uid: currentUser.uid,
          photoUrl: currentUser.photoURL,
        })
      );
    });

    return unsubscribe;
  }, []);

  return (
    <>
      <button
        className="rounded-full border bg-white px-14 py-2 text-black"
        onClick={() => dispatch(openSignupModal())}
      >
        Sign Up
      </button>
      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
        className="flex items-center justify-center"
      >
        <div className="flex w-4/5 flex-col items-center justify-center gap-4 rounded-lg border border-gray-400 border-opacity-25 bg-black p-7 text-white md:w-[575px]">
          <button
            className="w-full rounded-md bg-white py-2 text-lg font-bold text-black"
            onClick={() => {
              HandleGuest();
            }}
          >
            Sign In as a Guest
          </button>
          <span className="font-bold">or</span>
          <span className="mb-2 w-full text-left text-4xl font-bold">
            Create your account
          </span>
          <form className="flex w-full flex-col gap-7" onSubmit={handleSignUp}>
            <input
              className="w-full rounded-md border border-gray-400 border-opacity-25 bg-transparent px-6 py-3"
              type="text"
              placeholder="Full Name"
              onChange={(e) => setusername(e.target.value)}
              required={true}
            />
            <input
              type="email"
              className="w-full rounded-md border border-gray-400 border-opacity-25 bg-transparent px-6 py-3"
              placeholder="Email"
              onChange={(e) => setemail(e.target.value)}
              required={true}
            />
            <input
              type="password"
              className="w-full rounded-md border border-gray-400 border-opacity-25 bg-transparent px-6 py-3"
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
              required={true}
              minLength={"6"}
            />
            <button
              type="submit"
              className="mt-8 w-full rounded-md bg-white py-2 text-lg font-bold text-black"
            >
              Create an account
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}

export default SignupModal;
