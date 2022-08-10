import React from "react";
import Header from "../Header";
import Address from "../sections/Address";
import Story from "../sections/Story";

export default function PublicHomePage({ user }) {
  return (
    <>
      {" "}
      !owns
      <Header />
      <div className="flex flex-col gap-4 justify-center align-center items-center">
        <Story fullname={user.fullname} story={user.story} />
        <Address address={user.address} />
      </div>
    </>
  );
}
