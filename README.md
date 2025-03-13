# Next-Js by Codevolution : Part-2

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

### Route Handlers : 

- Previously we've learned how to route to pages with the file based routinng system.

- The app router lets you create custom request handlers for your requests using a feature called Route Handlers.

- Unlike page routes, which gave us HTML content, Route handlers let us build RESTful endpoints with complete control over the Response.

- Think of it like building a Node + Express app.

- There's no need to set up and configure a seperate server.

- Route handlers are great when making external API requests as well. For example, if you're building an app that needs to talk to third-party services.

- Route handlers run server-side, our sensitive info like private keys stays secure and nver reaches the browser.

- Route handlers are the equivalent of API routes in Page router.

- Next.js supports GET, POST, PUT, PATCH, DELETE, HEAD and OPTIONS.

- If an unsupported method is called, Next.js will return 405 method not allowed response.

**Summary :** Route handlers allows you to create custom request handlers for a given routes. They're defined in a `route.js`/`route.ts` file inside the app directory. The `route.ts` file at the same route segment level as `page.tsx` will result in a conflict and the page will not be served. The route handler will handle the requests.

### GET Request : 

```js
// comments/route.ts
import { comments } from "./data";

export async function GET() {
  return Response.json(comments);
}
```