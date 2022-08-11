import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Header from "../Header";
import Loading from "../utils/Loading";
const addressSchema = z.object({
  address: z.string().min(6, { message: "Please provide a valid address" }),
});
export default function Address() {
  const router = useRouter();
  const email = getCookie("email") || false;
  const isGoingThruRegistration = getCookie("registred");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSbmitting] = useState(false);
  const [registered, setRegistred] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
  });

  const handleAddress = async (address) => {
    const data = {
      email,
      address,
    };
    setIsSbmitting(true);
    fetch("/api/user/setup/address", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        setIsSbmitting(false);
        setError(null);
        setRegistred(true);
      })
      .catch((error) => {
        setIsSbmitting(false);

        setError(error);
      });
  };
  if (registered) router.push("/setup/story");

  return (
    <div>
      <Head>
        <title>Shipping Address - Setup</title>
      </Head>
      <Header />
      <form onSubmit={handleSubmit(handleAddress)}>
        <div className="container max-w-sm mx-auto flex flex-1 flex-col items-center  px-2">
          <h1>
            STEP 2 of 3<br />
            Where should people send your gifts to?{" "}
          </h1>
          <br />
          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span className="font-medium">Something went wrong!</span> {error}
            </div>
          )}
          <div className="flex flex-row gap-4 mb-4 flex-wrap">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your Shipping Address:
            </label>
            <div className="w-full flex flex-col justify-center items-center align-center">
              <textarea
                id="message"
                rows="4"
                className="mb-6 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="ECSU
XXXXX CAMPUS BOX ELIZABETH CITY, NC 27909"
                onChange={(e) => setAddress(e.target.value)}
                {...register("address")}
              ></textarea>
              {errors.address ? (
                <p className="text-sm text-red-600 nt-1">
                  {errors.address.message}
                </p>
              ) : null}
              {isSubmitting ? (
                <Loading />
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
