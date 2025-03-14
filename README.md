# Next-Js by Codevolution : Part-3

### Topics Covered :

- Route Handlers
- GET Request
- POST Request
- Dynamic Route Handlers
- PATCH Request
- DELETE Request
- URL Query Parameters
- Headers in Route Handlers
- Cookies in Route Handlers
- Redirects in Route Handlers
- Caching in Route Handlers
- Middleware

## Route Handlers : 

- Previously we've learned how to route to pages with the file based routing system.

- The app router lets you create custom request handlers for your requests using a feature called Route Handlers.

- Unlike page routes, which gave us HTML content, Route handlers let us build RESTful endpoints with complete control over the Response.

- Think of it like building a Node + Express app.

- There's no need to set up and configure a seperate server.

- Route handlers are great when making external API requests as well. For example, if you're building an app that needs to talk to third-party services.

- Route handlers run server-side, our sensitive info like private keys stays secure and nver reaches the browser.

- Route handlers are the equivalent of API routes in Page router.

- Next.js supports GET, POST, PUT, PATCH, DELETE, HEAD and OPTIONS.

- If an unsupported method is called, Next.js will return 405 method not allowed response.

**NOTE :** 

1. Just like page routes, route handlers must live in the app folder.
2. Watchout for conflicts between `route.ts` and `page.tsx`. Both these files cannot be in the same folder. If it is, the `route.ts` will be the one to get the preference and takeover the `page.tsx` by default.
3. The solution for this is to move the `route.ts` file to the API sub directory.

**Summary :** Route handlers allows you to create custom request handlers for a given routes. They're defined in a `route.js`/`route.ts` file inside the app directory. The `route.ts` file at the same route segment level as `page.tsx` will result in a conflict and the page will not be served. The route handler will handle the requests.

## GET Request : 

```js
// comments/route.ts
import { comments } from "./data";

export async function GET() {
  return Response.json(comments);
}
```

## POST Request :

```js
// comments/route.ts
import { comments } from "./data";

export async function POST(request: Request) {
  const comment = await request.json();
  const newComment = {
    id: comments.length + 1,
    text: comment.text,
  };
  comments.push(newComment);
  return new Response(JSON.stringify(newComment), {
    headers: { "content-Type": "application/json" },
    status: 201,
  });
}
```

## Dynamic Route Handlers : 

- Just like dynamic app routing, we also have dynamic route handlers.

- The dynamic route handlers are the methods written inside `route.ts`, within the folders wrapped with square brackets `[]`.

- Now we have to retrieve a single commnet based on the id provided.

```js
// comments/[id]/route.ts

import { comments } from "../data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const comment = comments.find((comment) => comment.id === parseInt(id));
  return Response.json(comment);
}
```

## PATCH Request : 

- PATCH request lets us make partial modification to a resource.

```js
import { comments } from "../data";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const { text } = body;

  const index = comments.findIndex((comment) => comment.id === parseInt(id));
  comments[index].text = text;
  return Response.json(comments[index]);
}
```

## DELETE Request : 

```js
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = comments.findIndex((comment) => comment.id === parseInt(id));
  const deletedComment = comments[index];
  comments.splice(index, 1);
  return Response.json(deletedComment);
}
```

## URL Query Parameters : 

```js
// comments/route.ts

import { NextRequest } from "next/server";
import { comments } from "./data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  // console.log(searchParams);
  const query = searchParams.get("query");
  // console.log(query);
  const filteredComments = query
    ? comments.filter((comment) => comment.text.includes(query))
    : comments;
  return Response.json(filteredComments);
}
```

## Headers in Route Handlers : 

- HTTP headers represent the metadata associated with an API request and response.

- The Headers can be classified into 2 main categories :

1. **Request Headers** :

- These are sent by the client, such as a web browser, to the server. 

- They contain essential information about the request, which helps the server understand and process it correctly.

  - `User-Agent` : Identifies the browser and operating system to the server.
  - `Accept` : Indicates the content types like text, video, or image formats that the client can process.
  - `Authorization` : Header used by the client to authenticate itself to the server.

**In Next.js, we can receive the Header in 2 ways :**

Way 1 :

```ts
// profile/api/route.ts
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  console.log(requestHeaders.get("Authorization"));
  return new Response("Profile API data!!!");
}
```

Way 2 : 

```ts
// profile/api/route.ts
import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();
  console.log(headersList.get("Authorization"));
  return new Response("Profile API data!!!");
}
```

2. **Response Headers** :

- These are sent back from the server to the client. 

- They provide information about the server and the data being sent in the response.

  - `Content-Type` : Header which indicates the media type of the response. It tells the client what the data type of the returned content is, such as text/html for HTML documents, application/json for JSON data, etc.

```js
// profile/api/route.ts
import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();
  console.log(headersList.get("Authorization"));
  return new Response("<h1>Profile API data!!!</h1>", {
    headers: { "content-Type" : "text/html" }
  });
}
```

**NOTE :** To set the Headers we need to return a new Response with custom headers.

## Cookies in Route Handlers : 

- Cookies are small pieces of data that a server sends to a user's web browser.

- The browser can store the cookies and send them back to the same server with future requests.

- Cookies serve three main purposes:

  1. Managing sessions (like user logins and shopping carts)
  2. Handling personalization (such as user preferences and themes)
  3. Tracking (like recording and analyzing user behavior)

#### Setting and Getting cookies inside a route handler : 

**Approach 1 :**

- Setting a cookie by returning a new response with the `set-cookie` header.

```js
// profile/api/route.ts
import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();
  console.log(headersList.get("Authorization"));
  return new Response("<h1>Profile API data!!!</h1>", {
    headers: { 
      "content-Type": "text/html", 
      "Set-Cookie": "theme=dark", 
    },
  });
}
```

- Getting a cookie using the `get` method.

```js
// profile/api/route.ts
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // To get the cookie
  const cookie = request.cookies.get("theme");
  console.log(cookie);

  return new Response("<h1>Profile API data!!!</h1>", {
    headers: { 
      "content-Type": "text/html"
    },
  });
}
```

**Approach 2 :**

- Setting the cookies using Built-in cookies function.

```js
// profile/api/route.ts
import { headers, cookies } from "next/headers";

export async function GET() {
  // To set the cookie using the built-in function
  const cookieStore = await cookies();
  cookieStore.set("resultsPerPage", "20");

  return new Response("<h1>Profile API data!!!</h1>", {
    headers: { 
      "content-Type": "text/html",
    },
  });
}
```

- Getting the cookies using Built-in cookies function.

```js
// profile/api/route.ts
import { headers, cookies } from "next/headers";

export async function GET() {
  // To get the cookie using the built-in function
  console.log(cookieStore.get("resultsPerPage"));

  return new Response("<h1>Profile API data!!!</h1>", {
    headers: { 
      "content-Type": "text/html
    },
  });
}
```

## Redirects in Route Handlers : 

- Imagine you've built an user's API, that's been running for a while.

- Your `v1` endpoint has basic user information like id, email, full name and createdAt.

- After few months you've built a more comprehensive `v2` endpoint that includes structured names, user preferences and profile inframtion.

- To move clients to this new endpoint i.e `v2`, we can use redirect url in `v1` endpoint.

```js
// api/v1/users/route.ts

import { redirect } from "next/navigation";

export async function GET() {
  redirect("/api/v2/users");
}
```

## Caching in Route Handlers : 

- Route handlers are not cached by default but you can opt into caching when using the GET method.

- Caching only works with `GET` method.

- Other HTTP methods like POST, PUT, or DELETE are never cached.

- If you're using dynamic functions like headers() and cookies(), or working with the request object in your GET method, caching won't be applied.

- The request is cached using `export const dynamic = "force-static";`

```js
// time/route.ts

export const dynamic = "force-static";
// This line ensures that the response is cached and served instantly to all users.

export async function GET() {
  return Response.json({
    time: new Date().toLocaleTimeString(),
  });
}
```

- There will be no caching while development. So to test the caching we need to build the app and start the production server.

- Once the app is built, the cache will only be revalidated after the next production build.

- But what if we want to update our data without re-building our entire app?

- If you want to revalidate the cache after every specified time duration, we need the the revalidation time(in seconds).

```js
// time/route.ts

export const dynamic = "force-static";
export const revalidate = 10;

export async function GET() {
  return Response.json({
    time: new Date().toLocaleTimeString(),
  });
}
```

## Middleware :

- Middlewares in Next.js is a powerfull feature that lets you intercept and control the flow of requests and responses throughout your application.

- It does that at a global level, significantly enhancing features like redirects, URL rewrites, authentication, headers, cookies and more.

- Middleware lets you specify paths where it should be active

1. **Custom matcher config** :
```js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL('/', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/profile",
};
```

2. **Conditional statements** :

```js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  // Conditional statements
  if (request.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/hello", request.url));
    // return NextResponse.rewrite(new URL("/hello", request.url));
  }
}
```

**NOTE :** `rewrite` method keeps the URL in the browser unchanged, while serving different content.

#### Cookies and headers in middleware : 

```js
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Using cookies in middleware
  const response = NextResponse.next();
  const themePreference = request.cookies.get("theme");
  if (!themePreference) {
    response.cookies.set("theme", "dark")
  }
  
  // Using headers in middleware
  response.headers.set("custom-header", "custom-value");
  
  return response;
}
```