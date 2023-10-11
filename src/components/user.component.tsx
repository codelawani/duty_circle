"use client"
import { useSession } from "next-auth/react";

export const User = () => {
  const { data: session } = useSession()
  return <div>
    Client Session<br />
    Hi client {session?.user?.name}
  </div>
}
