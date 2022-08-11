import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import HomePage from "../components/home_pages/HomePage";
import PublicHomePage from "../components/home_pages/PublicHomePage";
import NoUserPage from "../components/home_pages/NoUserPage";

import Loading from "../components/utils/Loading";

export default function Alias({}) {
  const router = useRouter();
  const { alias } = router.query;
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }
  if (session && session.user.username === alias) {
    return <HomePage alias={alias} />;
  }
  return <PublicHomePage alias={alias} />;
}
