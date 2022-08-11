import { useSession } from "next-auth/react";
import React from "react";
import Header from "../Header";
import Address from "../sections/Address";
import Links from "../sections/Links";
import Story from "../sections/Story";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSWR from "swr";

export default function HomePage({ alias }) {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR(`/api/user/links/${alias}`, fetcher);
  const { data: session } = useSession();
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  console.log("data", data);
  return (
    <>
      <Header />
      <ToastContainer />
      <div className="w-full flex flex-col gap-4 justify-center align-center items-center">
        <Story fullname={data.fullname} story={data.story} />
        <Address address={data.address} />
        <Links links={data.links} />
      </div>
    </>
  );
}
