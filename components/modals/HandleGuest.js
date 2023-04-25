import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function HandleGuest() {
  const email = process.env.NEXT_PUBLIC_GUEST_EMAIL;
  const password = process.env.NEXT_PUBLIC_GUEST_PASSWORD;
  await signInWithEmailAndPassword(auth, email, password);
}
