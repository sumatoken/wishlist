import { PencilIcon, SaveIcon, XCircleIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Address({ address, mode, userId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [addressState, setAddressState] = useState(address);
  const [error, setError] = useState(null);
  const editAddressHandler = async () => {
    const data = { addressState, userId };
    fetch("/api/user/profile/updateAddress", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((res) => {
        setIsEditing(false);
        setError(null);
        toast.success("Edited address!", {
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
  return (
    <div className="flex flex-col items-center justify-around align-center w-full lg:w-1/2">
      <div className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 w-full">
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
          <div className="text-slate-700 dark:text-slate-500">
            My Shipping Address:{" "}
          </div>
          {mode ? (
            !isEditing ? (
              <PencilIcon
                className="button h-5 w-5 text-blue-500"
                onClick={() => setIsEditing(true)}
              />
            ) : (
              <>
                <SaveIcon
                  className="button h-5 w-5 text-green-500"
                  onClick={() => editAddressHandler()}
                />
                <XCircleIcon
                  className="button h-5 w-5 text-yellow-500"
                  onClick={() => setIsEditing(false)}
                />
              </>
            )
          ) : null}
          <div>
            <textarea
              defaultValue={addressState}
              className="text-lg bg-inherit font-medium"
              disabled={!isEditing}
              onChange={(e) => setAddressState(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
