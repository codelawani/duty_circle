import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  theme: {
    brandColor: "#00BFFF",
    colorScheme: "auto",
    buttonText: "#ffffff",
  },
  callbacks: {
    async session({ session, token, user }) {
      if (session?.user) session.user.id = user.id;

      return session;
    },
  },
};

export default authOptions;
