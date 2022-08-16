import { useSession } from "next-auth/react";
import React from "react";
import AddressComponent from "../../components/setup/AddressComponent";
import Loading from "../../components/utils/Loading";

export default function Address() {
  const { data: session, status } = useSession();
  if (status === "loading") return <Loading />;
  if (status === "unauthenticated") return <p>register first</p>;
  console.log(status);
  return <AddressComponent />;
}
