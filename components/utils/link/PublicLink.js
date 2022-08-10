import { ExternalLinkIcon } from "@heroicons/react/solid";
import Link from "next/link";
export default function PublicLink({ url }) {
  return (
    <div className="rounded-md bg-white p-4 m-2 flex flex-row  w-full items-center">
      <div className="flex flex-row gap-2 items-center">
        <input
          disabled
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-fit"
          value={url}
        />
        <Link href={url}>
          <ExternalLinkIcon className="button h-5 w-5 text-violet-500" />
        </Link>
      </div>
    </div>
  );
}
