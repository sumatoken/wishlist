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

export default function PublicHomePage({ alias }) {
  const [mode, setMode] = useState(false);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: session } = useSession();
  const { data, error } = useSWR(`/api/user/links/${alias}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <Loading />;
  if (
    (session?.user.username === alias && mode) ||
    (getCookie("alias") === alias && mode)
  ) {
    return <HomePage alias={alias} />;
  }
  return (
    <>
      <Head>
        <title>Whishlist - Home Page</title>
      </Head>
      <div className="flex flex-col gap-4 justify-center align-center items-center">
        {session?.user.username === alias || getCookie("alias") === alias ? (
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
        ) : null}
        <Story fullname={data.fullname} story={data.story} />
        <Address address={data.address} />
        <PublicLinks links={data.links} />
      </div>
    </>
  );
}
