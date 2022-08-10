import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { getCookie } from "cookies-next";

export default function Header() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
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
              <button
                onClick={() => signIn(null, { callbackUrl: "/user/links" })}
                className="button text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </button>
              <span className="button text-gray-800 bg-emerald-200 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                <Link href="/auth/register">Register</Link>
              </span>
            </div>
          ) : (
            <div className="flex items-center lg:order-2">
              <button
                disabled
                onClick={() => router.push("/user/links")}
                className="button bg-grey-600 text-black dark:text-white hover:text-white-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Welcome {getCookie("fullname")}
              </button>
              <Link href="/user/links">
                <button
                  onClick={() => router.push("/user/links")}
                  className="button text-white bg-emerald-600 dark:text-white hover:text-white-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Links
                </button>
              </Link>
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
