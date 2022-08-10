import React from "react";
export default function Link({ url, meta }) {
  console.log("meta", meta);
  return <div>{url}</div>;
}
export async function getServerSideProps() {
  return {
    props: {
      meta,
    }, // will be passed to the page component as props
  };
}
