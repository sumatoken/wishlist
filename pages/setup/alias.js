import React, { useState } from "react";
import { getCookie } from "cookies-next";
import Header from "../../components/Header";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "../../components/utils/Loading";
import { useRouter } from "next/router";
import Head from "next/head";
import { setCookie } from "cookies-next";

const aliasSchema = z.object({
  alias: z.string().min(4, { message: "Must be 4 characters or more" }),
});

export default function Alias() {
  const router = useRouter();
  const email = getCookie("email") || null;
  const fullname = getCookie("fullname");
  const [alias, setAlias] = useState("");
  const [error, setError] = useState(null);
  const [registered, setRegistred] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const handleAlias = async (alias) => {
    if (alias === "") {
      setError("Alias is requiered to set your page");
      return;
    }
    const data = {
      email,
      alias,
    };
    setSubmitting(true);
    fetch("/api/user/setup/alias", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        setCookie("alias", alias);
        setSubmitting(false);
        setError(null);
        setRegistred(true);
      })
      .catch((error) => {
        setSubmitting(false);

        setError(error);
      });
  };
  if (registered) router.push("/setup/address");
  return (
    <div>
      <Head>
        <title>Alias - Setup</title>
      </Head>
      <Header />
      <div className="container max-w-sm mx-auto flex flex-1 flex-col items-center  px-2">
        <h1>
          STEP 1 of 3<br />
          Create your page.
        </h1>
        <br />
        {error && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
            role="alert"
          >
            <span className="font-medium">Something went wrong!</span> This
            alias is already taken
          </div>
        )}
        <div className="flex flex-row gap-4 mb-4 flex-wrap">
          <label
            htmlFor="alias"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your alias:
          </label>{" "}
          <div className="flex flex-row gap-4">
            <input
              required
              type="text"
              id="alias"
              aria-describedby="helper-text-explanation"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="alias"
              onChange={(e) => setAlias(e.target.value)}
            />
            {isSubmitting ? (
              <Loading />
            ) : (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleAlias(alias)}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
              >
                Next
              </button>
            )}
          </div>
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            Your page will be:{" "}
            <span
              href="#"
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              https://www.website.com/{alias}
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
