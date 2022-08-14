import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import { compare } from "bcryptjs";
import { useRouter } from "next/router";
const router = useRouter();
export default NextAuth({
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (credentials.email === "" || credentials.password === "")
          return false;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          select: {
            id: true,
            email: true,
            username: true,
            fullname: true,
            password: true,
          },
        });
        const isPasswordCorrect = await compare(
          credentials.password,
          user.password
        ).then(function (result) {
          return result;
        });
        if (!user) {
          return false;
        } else {
          if (isPasswordCorrect) return user;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
        session.user.username = token.username;
        session.user.fullname = token.fullname;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        token.fullname = user.fullname;
        token.username = user.username;
      }
      return token;
    },
  },
  events: {
    signIn: ({ user }) => {
      router.push(`/${username}`);
    },
  },
});
