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
  /*   const isProfileIncomplete = async (process, status) => {
    if (status !== "authenticated") return;
    if (process === null) router.push("/setup/alias");
    if (process === 3) router.push("/setup/address");
    if (process === 6) router.push("/setup/story");
  };
   */
  if (status === "loading" || !data || !alias) return <Loading />;

  if (session && data.id === session.user.id) {
    //isProfileIncomplete(data.profileCompletion)
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
