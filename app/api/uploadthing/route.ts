import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Router
export const runtime = "nodejs";
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
