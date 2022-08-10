import React, { useState } from "react";
import {
  ArchiveIcon,
  PencilIcon,
  SaveIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import { toast } from "react-toastify";

export default function Link({ url }) {
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [editedUrl, setEditedUrl] = useState(url);
  const deleteLinkHandler = async () => {
    const data = currentUrl;
    fetch("/api/user/links/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log("res", res);
        setIsDeleted(true);
        setError(null);
        toast.warn("Deleted link!", {
          position: "bottom-center",
          autoClose: 1000,
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };
  const editLinkHandler = async () => {
    setIsEditing(true);

    const data = {
      currentUrl,
      editedUrl,
    };
    fetch("/api/user/links/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        setIsEditing(false);
        /* setError(null);
        setCurrentUrl() */
        setCurrentUrl(editedUrl);
        console.log("edit res", res);
        toast.success("Edited link!", {
          position: "bottom-center",
          autoClose: 1000,
        });
      })
      .catch((error) => {
        setIsEditing(false);
        console.log(error);
        setError(error);
      });
  };
  if (!isDeleted)
    return (
      <div className="rounded-md bg-white p-4 m-2 flex flex-row gap-2 w-full">
        <div className="flex flex-row gap-2">
          <input
            disabled={!isEditing}
            autoFocus={isEditing}
            className="bg-inherit w-fit"
            value={editedUrl}
            onChange={(e) => setEditedUrl(e.target.value)}
          />
        </div>
        <ArchiveIcon
          className="button h-5 w-5 text-red-500"
          onClick={() => deleteLinkHandler()}
        />
        {!isEditing ? (
          <PencilIcon
            className="button h-5 w-5 text-blue-500"
            onClick={() => setIsEditing(true)}
          />
        ) : (
          <>
            <SaveIcon
              className="button h-5 w-5 text-green-500"
              onClick={() => editLinkHandler()}
            />
            <XCircleIcon
              className="button h-5 w-5 text-yellow-500"
              onClick={() => setIsEditing(false)}
            />
          </>
        )}
      </div>
    );
}
/* export async function getServerSideProps() {
 
  return {
    props: {
      meta,
    }, // will be passed to the page component as props
  };
} */
