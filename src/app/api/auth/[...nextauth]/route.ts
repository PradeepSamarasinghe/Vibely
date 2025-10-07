// src/app/api/auth/[...nextauth]/route.ts
export { GET, POST } from "@/auth";  // re-export from auth.ts
export const runtime = "nodejs"; // bcryptjs & mongoose need Node, not Edge
// optional: for edge runtime
// export const runtime = "edge";
