// A scenario where we do need caching.
export const dynamic = "force-static";

export async function GET() {
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Books" },
    { id: 3, name: "Clothing" },
    { id: 4, name: "Home & Garden" },
  ];

  //   Since this data rarely changes, every request to this endpoint will trigger a db call, which will be inefficient. To avoid this we can use caching.

  return Response.json(categories);
}
