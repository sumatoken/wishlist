import PublicLink from "../../utils/link/PublicLink";

export default function PublicLinks({ links }) {
  return (
    <div className="flex flex-col items-center justify-around align-center w-full lg:w-1/2">
      <figure className="flex flex-col items-center justify-around align-center w-full bg-slate-100 rounded-xl p-8 md:p-0 dark:bg-slate-800 w-full">
        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
          <div className="flex flex-row gap-60">
            <div className="text-slate-700 dark:text-slate-500">
              My Wishlist:{" "}
            </div>
          </div>
          <div className="flex flex-col items-center justify-around align-center w-full">
            <blockquote>
              {links.map((link, key) => (
                <PublicLink key={key} url={link.url} />
              ))}
            </blockquote>
          </div>
        </div>
      </figure>
    </div>
  );
}
