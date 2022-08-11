import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import HomePage from "../components/home_pages/HomePage";
import GuestHomePage from "../components/home_pages/GuestHomePage";
import NoUserPage from "../components/home_pages/NoUserPage";

import Loading from "../components/utils/Loading";
import { getCookie } from "cookies-next";

export default function Alias({}) {
  const router = useRouter();
  const isNewUser = getCookie("registred");
  const { alias } = router.query;
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  if (isNewUser && getCookie("alias") === alias)
    return <HomePage alias={alias} />;

  if (session && session.user.username === alias) {
    return <HomePage alias={alias} />;
  }
  return <GuestHomePage alias={alias} />;
}
