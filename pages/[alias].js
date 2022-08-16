import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import HomePage from "../components/home_pages/HomePage";
import GuestHomePage from "../components/home_pages/GuestHomePage";
import NoUserPage from "../components/home_pages/NoUserPage";

import Loading from "../components/utils/Loading";
import Header from "../components/Header";
import { deleteCookie, getCookie } from "cookies-next";
import useSWR from "swr";

export default function Alias() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { alias } = router.query;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(`/api/user/links/${alias}`, fetcher);

  console.log(status);
  if (status === "loading" || !data || !alias) return <Loading />;

  if (session && data.id === session.user.id) {
    return (
      <>
        <Header />
        <HomePage data={data} />;
      </>
    );
  } else {
    return (
      <>
        <Header />
        <GuestHomePage data={data} />;
      </>
    );
  }
}
