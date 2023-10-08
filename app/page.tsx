import Image from "next/image";
import Link from "next/link";
import Header from "./components/header";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Home() {
  // const { data: session } = useSession();

  return (
    <div>
      {session?.user ? (
        <div>
          <p>Signed in as {session.user.email}</p>
          <button onClick={signOut}>sign Out</button>
        </div>
      ) : (
        <Link href="/api/auth/signin">sign in</Link>
      )}
    </div>
  );
}
