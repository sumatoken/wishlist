import { useSession } from "next-auth/react";
import React from "react";
import Header from "../Header";
import Address from "../sections/Address";
import Links from "../sections/Links";
import Story from "../sections/Story";

export default function HomePage({ user }) {
  const { data: session } = useSession();
  return (
    <>
      owns
      <Header />
      <div className="w-full flex flex-col gap-4 justify-center align-center items-center">
        <Story fullname={user.fullname} story={user.story} />
        <Address address={user.address} />
        <Links links={user.links} />
      </div>
    </>
  );
}
