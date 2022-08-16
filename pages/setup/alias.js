import { useSession } from "next-auth/react";
import React from "react";
import AliasComponent from "../../components/setup/AliasComponent";
import Loading from "../../components/utils/Loading";

export default function Alias() {
  const { data: session, status } = useSession();
  if (status === "loading") return <Loading />;
  if (status === "unauthenticated") return <p>register first</p>;
  return <AliasComponent />;
}
