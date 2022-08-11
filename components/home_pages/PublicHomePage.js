import React from "react";
import Header from "../Header";
import Address from "../sections/Address";
import Story from "../sections/Story";
import PublicLinks from "../sections/links/PublicLinks";
import useSWR from "swr";
import Loading from "../utils/Loading";

export default function PublicHomePage({ alias }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(`/api/user/links/${alias}`, fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <Loading />;

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4 justify-center align-center items-center">
        <Story fullname={data.fullname} story={data.story} />
        <Address address={data.address} />
        <PublicLinks links={data.links} />
      </div>
    </>
  );
}
