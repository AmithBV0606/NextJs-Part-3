import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/', request.url));

  // if (request.nextUrl.pathname.startsWith("/profile")) {
  //   return NextResponse.redirect(new URL("/hello", request.url));
  //   // return NextResponse.rewrite(new URL("/hello", request.url));
  // }

  // Using cookies in middleware
  const response = NextResponse.next();
  const themePreference = request.cookies.get("theme");
  if (!themePreference) {
    response.cookies.set("theme", "dark");
  }
  
  // Using headers in middleware
  response.headers.set("custom-header", "custom-value");

  return response;
}

// See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/profile",
// };