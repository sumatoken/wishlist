import React from "react";

export default function Address({ address }) {
  return (
    <div className="flex flex-col items-center justify-around align-center w-full lg:w-1/2">
      <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 w-full">
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
          <div className="text-slate-700 dark:text-slate-500">
            My Shipping addres:{" "}
          </div>
          <blockquote>
            <p className="text-lg font-medium">{address}</p>
          </blockquote>
        </div>
      </figure>
    </div>
  );
}
