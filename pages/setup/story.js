import { useSession } from "next-auth/react";
import React from "react";
import Story from "../../components/setup/Story";
import Loading from "../../components/utils/Loading";
export default function story() {
  const { data: session, status } = useSession();
  if (status === "loading") return <Loading />;
  if (status === "unauthenticated") return <p>register first</p>;
  return <Story />;
}
