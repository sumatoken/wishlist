import { PlusCircleIcon } from "@heroicons/react/solid";
import { getCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
export default function AddLink({ handleChange }) {
  const { data: session } = useSession();
  const [status, setStatus] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState("");
  const isNewUser = getCookie("registred");

  const HandleAddLink = async (url) => {
    console.log(session);
    setSubmitting(true);
    const data = {
      userId: isNewUser ? getCookie("newUserId") : session.user.id,
      url,
    };
    fetch("/api/user/links/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        setSubmitting(false);
        handleChange(res);
        setStatus(false);
        setError(null);
        toast.success("Added link!", {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        setSubmitting(false);
        toast.error("Something went wrong!", {
          position: "bottom-center",
          autoClose: 1000,
        });
        setError(error);
      });
  };
  if (status)
    return (
      <div className="flex items-center border-b border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder=""
          aria-label="Link"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          disabled={submitting}
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          type="button"
          onClick={() => HandleAddLink(url)}
        >
          Add
        </button>
        <button
          onClick={() => setStatus(false)}
          className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
          type="button"
        >
          Cancel
        </button>
      </div>
    );
  return (
    <div className="button flex flex-row gap-2" onClick={() => setStatus(true)}>
      <PlusCircleIcon /> <span>Add Link</span>
    </div>
  );
}
