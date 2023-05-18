import { auth } from "@/firebase";
import {
  closeLoginModal,
  hideBanner,
  openLoginModal,
} from "@/redux/modalSlice";
import { Modal } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HandleGuest } from "./HandleGuest";

function LoginModal() {
  const isOpen = useSelector((state) => state.modals.loginModalOpen);
  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errorCode, seterrorCode] = useState("");
  const [errorText, seterrorText] = useState("");

  useEffect(() => {
    if (errorCode === "auth/user-not-found") {
      seterrorText("User not found.");
    }
    if (errorCode === "auth/wrong-password") {
      seterrorText("Wrong password.");
    }
    if (errorCode === "auth/too-many-requests") {
      seterrorText("Too many requests");
    }
  }, [errorCode]);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(closeLoginModal());
      dispatch(hideBanner());
    } catch (error) {
      seterrorCode(error.code);

      setTimeout(() => {
        seterrorCode("");
        seterrorText("");
      }, 5000);
    }
  }
  return (
    <>
      <button
        className="rounded-full border px-10 py-2 sm:px-14"
        onClick={() => dispatch(openLoginModal())}
      >
        Log In
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeLoginModal())}
        className="flex items-center justify-center"
      >
        <div className="relative flex w-4/5 flex-col items-center justify-center gap-4 rounded-lg border border-gray-400 border-opacity-25 bg-black p-7 text-white md:w-[575px]">
          <span className="mb-2 w-full text-left text-2xl font-bold sm:text-4xl">
            Sign in to your account
          </span>
          <form className=" flex w-full flex-col gap-7" onSubmit={handleLogin}>
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
            />
            <button
              className="mt-8 w-full rounded-md bg-white py-2 text-lg font-bold text-black"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <span className="font-bold">or</span>
          <button
            className="w-full rounded-md bg-white py-2 text-lg font-bold text-black"
            onClick={() => {
              HandleGuest();
            }}
          >
            {errorCode !== "" && (
              <div className="absolute right-1/2 top-1/2 flex w-full translate-x-1/2 translate-y-1/2 items-center justify-center gap-2 text-sm font-semibold text-white">
                <span className="text-red-600">error:</span>
                <span className="">{errorText}</span>
              </div>
            )}
            Sign In as a Guest
          </button>
        </div>
      </Modal>
    </>
  );
}

export default LoginModal;
