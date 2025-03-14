import { NextRequest } from "next/server";
import { headers, cookies } from "next/headers";

export async function GET(request: NextRequest) {
  // const requestHeaders = new Headers(request.headers);
  // console.log(requestHeaders.get("Authorization"));

  const headersList = await headers();
  console.log(headersList.get("Authorization"));

  // To get the cookie
  const cookie = request.cookies.get("theme");
  console.log(cookie);

  // To set the cookie using the built-in function
  const cookieStore = await cookies();
  cookieStore.set("resultsPerPage", "20");

  // To get the cookie using the built-in function
  console.log(cookieStore.get("resultsPerPage"));

  return new Response("<h1>Profile API data!!!</h1>", {
    headers: { 
      "content-Type": "text/html", "Set-Cookie": "theme=dark" 
    },
  });
}
