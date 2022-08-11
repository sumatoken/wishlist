import Link from "next/link";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import Head from "next/head";
import { signIn } from "next-auth/react";
import Loading from "../../components/utils/Loading";
import { setCookie } from "cookies-next";

const FormSchema = z
  .object({
    fullname: z.string().min(6, { message: "Must be a valid name" }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Must be 8 more characters long" }),
    confirm_password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords should be equal",
    path: ["confirm_password"],
  });

export default function Register() {
  const [info, setInfo] = useState({
    fullname: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registered, setIsRegistred] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

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

  const handleRegister = async (info) => {
    setIsSubmitting(true);

    fetch("/api/user/register", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((response) => response.json())
      .then((res) => {
        setCookie("email", res.email);
        setCookie("fullname", res.fullname);
        setCookie("registred", true);
        setError(null);
        setIsRegistred(true);
      })
      .catch((error) => {
        console.log(error);
        setIsSubmitting(false);

        setError(error);
      });
  };
  if (registered) router.push("/setup/alias");

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <Head>
        <title>Register - Wishlist</title>
      </Head>
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            {error && (
              <div
                className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
              >
                <span className="font-medium">Something went wrong!</span> Email
                already exists
              </div>
            )}
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
              onChange={(e) => handleInputChange(e)}
              {...register("fullname")}
            />
            {errors.fullname ? (
              <p className="text-sm text-red-600 nt-1">
                {errors.fullname.message}
              </p>
            ) : null}
            <input
              type="text"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={(e) => handleInputChange(e)}
              {...register("email")}
            />
            {errors.email ? (
              <p className="text-sm text-red-600 nt-1">
                {errors.email.message}
              </p>
            ) : null}

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={(e) => handleInputChange(e)}
              {...register("password")}
            />
            {errors.password ? (
              <p className="text-sm text-red-600 nt-1">
                {errors.password.message}
              </p>
            ) : null}
            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
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
                Create Account
              </button>
            )}

            <div className="text-center text-sm text-grey-dark mt-4">
              By signing up, you agree to the
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Terms of Service
              </a>{" "}
              and
              <a
                className="no-underline border-b border-grey-dark text-grey-dark"
                href="#"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </form>
        <div className="text-grey-dark mt-6">
          Already have an account?
          <span
            onClick={() => signIn()}
            className="no-underline border-b border-blue text-blue"
            href="../login/"
          >
            Log in
          </span>
          .
        </div>
      </div>
    </div>
  );
}
