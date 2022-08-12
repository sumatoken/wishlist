import Link from "next/link";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import Loading from "../../components/utils/Loading";
import { setCookie } from "cookies-next";

const FormSchema = z
  .object({
    current_password: z.string(),
    new_password: z
      .string()
      .min(8, { message: "Must be 8 more characters long" }),
    confirm_password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords should be equal",
    path: ["confirm_password"],
  });

export default function Settings() {
  const [info, setInfo] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [changed, setIsRegistred] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status !== "loading" && !session) signIn();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
  });
  const handleInputChange = (ev) => {
    setInfo({
      ...info,
      [ev.target.name]: ev.target.value,
    });
  };

  const handlePasswordChange = async (info) => {
    const data = {
      session,
      info,
    };
    setIsSubmitting(true);

    fetch("/api/user/settings/changePassword", {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setError(null);
        setIsRegistred(true);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);

        setError(error);
      });
  };
  if (changed) router.push(`/${session.user.username}`);

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <Head>
        <title>Change password - Settings</title>
      </Head>
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form onSubmit={handleSubmit(handlePasswordChange)}>
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Change password</h1>
            {error && (
              <div
                className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                <span className="font-medium">Something went wrong!</span> Check
                your current password
              </div>
            )}
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="current_password"
              placeholder="Current passowrd"
              onChange={(e) => handleInputChange(e)}
              {...register("current_password")}
            />
            {errors.current_password ? (
              <p className="text-sm text-red-600 nt-1">
                {errors.current_password.message}
              </p>
            ) : null}
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="new_password"
              placeholder="New password"
              onChange={(e) => handleInputChange(e)}
              {...register("new_password")}
            />
            {errors.new_password ? (
              <p className="text-sm text-red-600 nt-1">
                {errors.new_password.message}
              </p>
            ) : null}

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm password"
              onChange={(e) => handleInputChange(e)}
              {...register("confirm_password")}
            />
            {errors.confirm_password ? (
              <p className="text-sm text-red-600 nt-1">
                {errors.confirm_password.message}
              </p>
            ) : null}
            {isSubmitting ? (
              <Loading />
            ) : (
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full text-center py-3 button text-gray-800 bg-emerald-200 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 my-1"
              >
                Update password
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
