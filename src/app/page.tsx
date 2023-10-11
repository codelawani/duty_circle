import { getServerSession } from "next-auth";
import authOptions from "../lib/auth";
import { User } from "../components/user.component";
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      Hello {session ? session?.user?.name : "Anon"}
      <User />
    </div>
  );
}
