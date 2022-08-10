import React from "react";
import {
  ArchiveIcon,
  PencilIcon,
  SaveIcon,
  XCircleIcon,
} from "@heroicons/react/solid";
import Link from "../utils/Link";
export default function Links({ links }) {
  console.log(links);
  return links.map((link, key) => (
    <Link url="zon.com/Dual-Sided-Waterproof-Leather-Protector-Writing/dp/B084VNDQNQ/ref=as_li_ss_tl?dchild=1&keywords=desk%2Bmat&qid=1597597316&sr=8-1-spons&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzVFVYNFBHMVgwVjVHJmVuY3J5cHRlZElkPUEwNTQ2ODM2MTZOTjJCUFBUV0FEVyZlbmNyeXB0ZWRBZElkPUExMDE3NDIyVTVLN1FTVENRT1dXJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ&linkCode=sl1&tag=youcomjte-20&linkId=9ad8a994fd44c0a8a1578221164f3331&th=1" />
  ));
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
}
