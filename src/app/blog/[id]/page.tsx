import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

function getBaseUrl() {
  // Works locally and on Vercel without headers()
  const fromEnv =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
  return fromEnv || "http://localhost:3000";
}

async function getPost(id: string) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/posts/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  if (!post) return notFound();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-3xl mx-auto px-6 py-10">
        <Link href="/blog" className="text-sm text-indigo-600 hover:underline">
          ← Back to Blog
        </Link>

        <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-gray-900">
          {post.title}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          {post.username ? `By ${post.username}` : "By Unknown"} •{" "}
          {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}
        </p>

        <div className="relative mt-6 h-64 w-full overflow-hidden rounded-2xl shadow ring-1 ring-black/5">
          <Image
            src={post.img || `https://picsum.photos/seed/${post._id}/1200/800`}
            alt={post.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {post.description && (
          <p className="mt-6 text-lg text-gray-700">{post.description}</p>
        )}

        <article className="prose prose-indigo mt-6 max-w-none">
          <div className="whitespace-pre-wrap">{post.content}</div>
        </article>
      </section>
    </main>
  );
}
