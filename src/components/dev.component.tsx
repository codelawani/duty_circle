import { getServerSession } from "next-auth";
import Image from "next/image";
import authOptions from "../lib/auth";
import Header from "./header.component";
export default async function Dev() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.name;
  return (
    <main className="flex flex-col items-center justify-center">
      <Header />
      <h1 className="text-4xl mt-10 font-bold text-center">
        This project is under development
      </h1>
      <Image
        src="https://media.tenor.com/XasjKGMk_wAAAAAM/load-loading.gif"
        alt="Dev Gif"
        width={100}
        height={100}
        className="mt-4"
      ></Image>
      <p className="mb-10 mt-5">
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
