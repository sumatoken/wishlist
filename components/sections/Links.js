import React, { useState } from "react";

import Link from "../utils/link/Link";
import AddLink from "../utils/AddLink";

export default function Links({ links, userId }) {
  const [frontLinks, setFrontLinks] = useState(links);
  const handleLinkAdd = (link) => {
    setFrontLinks([...frontLinks, link]);
    console.log(frontLinks);
  };
  return (
    <div className="flex flex-col items-center justify-around align-center w-full lg:w-1/2">
      <div className="flex flex-col items-center justify-around align-center w-full bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 w-full">
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
          <div className="flex flex-row gap-60">
            <div className="text-slate-700 dark:text-slate-500">
              My Wishlist:{" "}
            </div>
            <AddLink handleChange={handleLinkAdd} />
          </div>
          <div className="flex flex-col items-center justify-around align-center w-full">
            <div>
              {frontLinks.map((link, key) => (
                <Link key={key} url={link.url} id={link.id} userId={userId} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
{
  /* <div className="rounded-md bg-white p-4 m-2 flex flex-row gap-2">
    <div className="flex flex-row gap-2">
      <input
        disabled={!isEditing}
        autoFocus={isEditing}
        className="bg-inherit w-fit"
        //value={currentLink}
        //onChange={(e) => setUrl(e.target.value)}
      />
    </div>
    <ArchiveIcon
      className="button h-5 w-5 text-red-500"
     // onClick={() => deleteLinkHandler()}
    />
    {!isEditing ? (
      <PencilIcon
        className="button h-5 w-5 text-blue-500"
        //onClick={() => setIsEditing(true)}
      />
    ) : (
      <>
        <SaveIcon
          className="button h-5 w-5 text-green-500"
         // onClick={() => editLinkHandler()}
        />
        <XCircleIcon
          className="button h-5 w-5 text-yellow-500"
         // onClick={() => setIsEditing(false)}
        />
      </>
    )}
  </div> */
}
