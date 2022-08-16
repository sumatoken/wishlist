import { useSession } from "next-auth/react";
import React from "react";
import StoryComponent from "../../components/setup/StoryComponent";
import Loading from "../../components/utils/Loading";
export default function Story() {
  const { data: session, status } = useSession();
  if (status === "loading") return <Loading />;
  if (status === "unauthenticated") return <p>register first</p>;
  return <StoryComponent />;
}
