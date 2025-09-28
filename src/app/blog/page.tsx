import Link from "next/link";
import Image from "next/image";

// Fetch all blog posts
async function getPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store", // SSR: fetch fresh data on every request
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Our Blog
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Insights, stories, and lessons on design, technology, and building
          digital products that matter.
        </p>
      </section>

      {/* Blog Grid */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <article
            key={post.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden ring-1 ring-black/5 hover:shadow-md transition"
          >
            <div className="relative h-48 w-full">
              {/* placeholder image for demo since API has no image */}
              <Image
                src={`https://picsum.photos/seed/${post.id}/600/400`}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-5 space-y-3">
              <p className="text-sm text-gray-500">Post #{post.id}</p>
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {post.body}
              </p>
              <Link
                href={`/blog/${post.id}`}
                className="inline-block text-indigo-600 font-medium text-sm hover:underline"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
