import { getServerSession } from "next-auth";
import Image from "next/image";
import authOptions from "../lib/auth";
export default async function Dev() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.name;
  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-4xl mt-10 font-bold text-center">
        This project is under development
      </h1>
      <p className="mb-6 mt-10">
        You&apos;re welcome, {user ? user : "Captain"}
      </p>
      <p>Once upon a time... </p>
      <Image
        src="https://media.tenor.com/O_JAIoDznkoAAAAM/developer-recruiters.gif"
        alt="Dev Gif"
        width={400}
        height={400}
        className="mt-4"
      ></Image>
      <div className="mt-20">
        <a
          className="text-blue-700 hover:underline"
          href="https://twitter.com/codelawani"
        >
          Twitter
        </a>{" "}
        <br />
        <a
          className="text-blue-700 hover:underline"
          href="https://github.com/codelawani"
        >
          GitHub
        </a>
      </div>
    </main>
  );
}
