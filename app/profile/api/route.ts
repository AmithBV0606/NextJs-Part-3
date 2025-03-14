import { NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  // const requestHeaders = new Headers(request.headers);
  // console.log(requestHeaders.get("Authorization"));

  const headersList = await headers();
  console.log(headersList.get("Authorization"));
  return new Response("<h1>Profile API data!!!</h1>", {
    headers: { "content-Type" : "text/html" }
  });
}