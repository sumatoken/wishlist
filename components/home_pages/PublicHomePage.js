import React, { useState } from "react";
import Header from "../Header";
import Address from "../sections/Address";
import Story from "../sections/Story";
import PublicLinks from "../sections/links/PublicLinks";
import useSWR from "swr";
import Loading from "../utils/Loading";
import { useSession } from "next-auth/react";
import HomePage from "./HomePage";
import Head from "next/head";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function PublicHomePage({}) {
  const [mode, setMode] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();
  const { alias } = router.query;
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(`/api/user/links/${alias}`, fetcher);

  console.log(status);
  if (status === "loading" || !data || !alias) return <Loading />;

  if (!mode) {
    return <HomePage data={data} />;
  }
  return (
    <>
      <Head>
        <title>Whishlist - Home Page</title>
      </Head>
      <div className="flex flex-col gap-4 justify-center align-center items-center">
        <label
          htmlFor="default-toggle"
          className="inline-flex relative items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id="default-toggle"
            checked={mode}
            className="sr-only peer"
            onChange={() => setMode(!mode)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Switch modes
          </span>
        </label>

        <Story fullname={data.fullname} story={data.story} />
        <Address address={data.address} />
        <PublicLinks links={data.links} />
      </div>
    </>
  );
}
