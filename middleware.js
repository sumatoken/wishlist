import { NextResponse } from "next/server";

const allowedHosts = ["105.155.103.245"];

export async function middleware(req) {
  const visitorIP = await fetch("http://ip-api.com/json/?fields=status,query")
    .then((response) => response.json())
    .then((res) => res.query);

  if (allowedHosts.includes(visitorIP)) {
    return NextResponse.next();
  } else {
    return new Response("Not allowed", {
      status: 403,
    });
  }
}
