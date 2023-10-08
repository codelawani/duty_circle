import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { LoginButton, LogoutButton } from "./buttons.component";
export default function Header() {
  return (
    <div>
      <LoginButton />
      <LogoutButton />
    </div>
  );
}
