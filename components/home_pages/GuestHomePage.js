import React, { useState } from "react";
import Header from "../Header";
import Address from "../sections/Address";
import Story from "../sections/Story";
import PublicLinks from "../sections/links/PublicLinks";
import useSWR from "swr";
import Loading from "../utils/Loading";
import { useSession } from "next-auth/react";
import Head from "next/head";

export default function PublicHomePage({ alias }) {
  const [mode, setMode] = useState(false);
  console.log("homepage");
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data: session } = useSession();
  const { data, error } = useSWR(`/api/user/links/${alias}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <Loading />;

  return (
    <>
      <Head>
        <title>Whishlist - Home Page</title>
      </Head>
      <Header />
      <div className="flex flex-col gap-4 justify-center align-center items-center">
        <Story fullname={data.fullname} story={data.story} />
        <Address address={data.address} />
        <PublicLinks links={data.links} />
      </div>
    </>
  );
}
