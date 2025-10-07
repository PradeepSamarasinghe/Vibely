import { NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Post from "@/models/Post";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const post = await Post.findById(params.id).lean();
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to fetch post" }, { status: 500 });
  }
}
