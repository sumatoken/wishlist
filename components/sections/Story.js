import React from "react";

export default function Story({ fullname, story }) {
  return (
    <div className="flex flex-col items-center justify-around align-center lg:w-1/2 md:w-3/4 xs:w-full">
      <figure className="md:flex bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800">
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
          <div className="text-slate-700 dark:text-slate-500">My story: </div>
          <blockquote>
            <p className="text-lg font-medium">"{story}"</p>
          </blockquote>
          <figcaption className="font-medium">
            <div className="text-sky-500 dark:text-sky-400">{fullname}</div>
          </figcaption>
        </div>
      </figure>
    </div>
  );
}
