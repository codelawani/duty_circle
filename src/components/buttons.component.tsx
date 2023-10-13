"use client";
import { signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button className=" text-sky-600" onClick={() => signIn()}>
      Sign In{" "}
    </button>
  );
};
export const LogoutButton = () => {
  return (
    <button className=" text-red-500" onClick={() => signOut()}>
      Sign Out
    </button>
  );
};
