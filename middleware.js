import { NextResponse } from "next/server";

const allowedHosts = ["105.155.103.245"];

export async function middleware(req, res) {
  /* const visitorIP = await fetch("http://ip-api.com/json/?fields=status,query")
    .then((response) => response.json())
    .then((res) => res.query);

  if (allowedHosts.includes(visitorIP)) {
    return NextResponse.next();
  } else {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } */
}
