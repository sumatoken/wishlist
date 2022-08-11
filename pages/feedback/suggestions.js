import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import Header from "../../components/Header";
import Loading from "../../components/utils/Loading";
const messageSchema = z.object({
  message: z.string().min(6, { message: "Please provide a valid feedback" }),
});
export default function Address() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSbmitting] = useState(false);
  const [sent, setSent] = useState(null);
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(messageSchema),
  });

  const handleFeedback = async (message) => {
    const data = message;
    setIsSbmitting(true);
    fetch("/api/feedback/suggestion", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res.message);
        setSent(true);
        setIsSbmitting(false);
        setError(null);
        toast.success("Feedback sent!");
      })
      .catch((error) => {
        setIsSbmitting(false);
        setSent(false);
        setError(error);
      });
  };

  return (
    <div>
      <Head>
        <title>Suggestion - Feedback</title>
      </Head>
      <Header />
      <form onSubmit={handleSubmit(handleFeedback)}>
        <ToastContainer />
        <div className="container max-w-sm mx-auto flex flex-1 flex-col items-center  px-2">
          <h1>
            Suggestions
            <br />
            Please let us know how we can make this site better for you.{" "}
          </h1>
          <br />
          {error ? (
            <div
              className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              <span className="font-medium">Something went wrong!</span>
            </div>
          ) : null}
          <div className="flex flex-row gap-4 mb-4 flex-wrap">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message:
            </label>
            <div className="w-full flex flex-col justify-center items-center align-center">
              <textarea
                id="message"
                rows="4"
                className="mb-6 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Helpful feedback."
                onChange={(e) => setMessage(e.target.value)}
                {...register("message")}
              ></textarea>
              {errors.message ? (
                <p className="text-sm text-red-600 nt-1">
                  {errors.message.message}
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
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
