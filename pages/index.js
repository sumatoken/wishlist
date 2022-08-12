import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>
      <Header />
    </>
  );
}
