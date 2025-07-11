import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";
import type { ApiResponse } from "shared/dist";
 
const app = new Hono();
 
// CORS is optional for single origin deployment
// Keep for development flexibility, remove for production if desired
app.use(cors());
 
// Your existing API routes - keep the /api prefix for clarity
app.get("/api", (c) => {
  return c.text("Hello Hono!");
});
 
app.get("/api/hello", async (c) => {
  const data: ApiResponse = {
    message: "Hello BHVR(?)!",
    success: true,
  };
  return c.json(data, { status: 200 });
});
 
// Add more API routes here with /api prefix
// app.get('/api/users', ...)
// app.post('/api/data', ...)
 
// Serve static files for everything else
app.use("*", serveStatic({ root: "./static" }));
 
app.get("*", async (c, next) => {
  return serveStatic({ root: "./static", path: "index.html" })(c, next);
});
 
const port = parseInt(process.env.PORT || "3000");
 
export default {
  port,
  fetch: app.fetch,
};
 
console.log(`🦫 bhvr server running on port ${port}`);
