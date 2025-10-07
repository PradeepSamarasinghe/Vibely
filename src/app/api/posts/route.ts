import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/db";
import Post, { IPost } from "@/models/Post";

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find().sort({ createdAt: -1 }).lean<IPost[]>();
    return NextResponse.json(posts, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = (await req.json()) as Partial<IPost>;

    for (const k of ["title", "description", "content", "username"] as const) {
      if (!body[k]) return NextResponse.json({ error: `${k} is required` }, { status: 400 });
    }

    const created = await Post.create({
      title: body.title,
      description: body.description,
      img: body.img ?? "",
      content: body.content,
      username: body.username,
    });

    // ensure plain JSON
    const json = JSON.parse(JSON.stringify(created));
    return NextResponse.json(json, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to create post" }, { status: 500 });
  }
}
