import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import HomePage from "../components/home_pages/HomePage";
import PublicHomePage from "../components/home_pages/PublicHomePage";
import NoUserPage from "../components/home_pages/NoUserPage";

import Loading from "../components/utils/Loading";
import prisma from "../lib/prisma";

export default function Alias({ user }) {
  const router = useRouter();
  const { alias } = router.query;
  const { data: session, status } = useSession();
  console.log(session);
  if (status === "loading") {
    return <Loading />;
  }
  if (!user) {
    return <NoUserPage />;
  }
  if (session?.user.username === alias) {
    return <HomePage user={user} />;
  } else {
    return <PublicHomePage user={user} />;
  }
  console.log(links);
  return <p>Alias: {alias}</p>;
}
export async function getServerSideProps(req, context) {
  const session = await getSession(context);
  const alias = await req.query.alias;
  const user =
    (await prisma.user.findUnique({
      where: {
        username: alias,
      },
      select: {
        username: true,
        fullname: true,
        email: true,
        story: true,
        address: true,
        links: true,
      },
    })) || null;
  return {
    props: {
      user,
    }, // will be passed to the page component as props
  };
}
