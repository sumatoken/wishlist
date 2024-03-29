import React, { useEffect, useState } from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { set } from "zod";

export default function Header() {
  const [guest, setGuest] = useState(true);
  const router = useRouter();
  const isNewUser = getCookie("newUser");
  const newUserAlias = getCookie("alias");
  const { data: session, status } = useSession();
  const isLoggedIn = () => {
    if (status) {
      if (session || status === "authenticated") return true;
      return false;
    }
  };

  useEffect(() => {
    const isGuest = () => {
      if (isNewUser === true) {
        setGuest(false);
      } else if (session) {
        setGuest(false);
      } else {
        setGuest(true);
      }
    };
    isGuest();
  }, [guest, session, isNewUser]);

  /*  const getAliasLink = () => {
    if (session) {
      return session.user.username;
    } else if (isNewUser) {
      return newUserAlias;
    }
  }; */
  return (
    <header>
      <nav className="bg-black border-gray-200 px-4 lg:px-6 py-2.5 ">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center">
            <Image
              height={70}
              width={70}
              src="/logo.jpg"
              className="button mr-3 h-6 sm:h-9"
            />

            <Link href="/">
              <span className="button self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                Linking
              </span>
            </Link>
          </div>

          {!session ? (
            <div className="flex items-center lg:order-2">
              <Link href="/feedback/suggestions">
                <span className="ml-6 button text-gray-800 bg-emerald-200 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                  Feedback
                </span>
              </Link>
              <button
                onClick={() => signIn(null, { callbackUrl: `/` })}
                className="button bg-white text-gray-800 dark:text-black hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log In
              </button>
              <Link href="/auth/register">
                <span className="button text-gray-800 bg-emerald-200 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                  Register
                </span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center lg:order-2">
              <button
                className="button text-white bg-yellow-600	 dark:text-white hover:text-white-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                onClick={() => signIn(null, { callbackUrl: "/auth/settings" })}
              >
                Settings
              </button>
              <button
                onClick={() => signOut()}
                className="button text-white bg-black dark:text-white hover:text-white-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log out
              </button>
            </div>
          )}
          <div
            className=" hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          ></div>
        </div>
      </nav>
    </header>
  );
}
