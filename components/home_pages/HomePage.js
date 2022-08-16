import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Header from "../Header";
import Address from "../sections/Address";
import Links from "../sections/Links";
import Story from "../sections/Story";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";
import PublicHomePage from "./PublicHomePage";
import Head from "next/head";

export default function HomePage({ data }) {
  const [mode, setMode] = useState(false);
  const { data: session } = useSession();
  if (mode) return <PublicHomePage data={data} />;
  return (
    <>
      <Head>
        <title>Whishlist Home Page</title>
      </Head>
      <ToastContainer />
      <div className="w-full flex flex-col gap-4 justify-center align-center items-center">
        <label
          htmlFor="default-toggle"
          className="inline-flex relative items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id="default-toggle"
            className="sr-only peer"
            checked={mode}
            onChange={() => setMode(!mode)}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            View as the public
          </span>
        </label>
        <Story
          fullname={data.fullname}
          story={data.story}
          mode
          userId={data.id}
        />
        <Address address={data.address} mode userId={data.id} />
        <Links links={data.links} userId={data.id} />
      </div>
    </>
  );
}
