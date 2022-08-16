import React, { useState } from "react";
import Header from "../Header";
import Address from "../sections/Address";
import Story from "../sections/Story";
import PublicLinks from "../sections/links/PublicLinks";
import useSWR from "swr";
import Loading from "../utils/Loading";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function GuestHomePage({ data }) {
  const { data: session } = useSession();

  console.log("guest", data);
  return (
    <>
      <Head>
        <title>Whishlist - Home Page</title>
      </Head>
      <div className="flex flex-col gap-4 justify-center align-center items-center">
        <Story fullname={data.fullname} story={data.story} />
        <Address address={data.address} />
        <PublicLinks links={data.links} />
      </div>
    </>
  );
}
