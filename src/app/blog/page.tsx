import Link from "next/link";
import Image from "next/image";

// Fetch all blog posts from your own API
async function getPosts() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store", // SSR: always fetch fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

export default async function Blog() {
  const posts = await getPosts();

  const categories = ['All', 'Technology', 'Design', 'Development', 'Business'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-shine { animation: shine 1.5s ease-in-out; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-purple-100 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-700">
              {posts.length} stories published
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 animate-slide-up">
            Our Blog
            <span className="block mt-2 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Stories & Insights
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up animation-delay-200">
            Insights, stories, and lessons on design, technology, and building digital products that matter.
          </p>
        </div>

        {/* Category Filter - Optional, you can implement filtering logic */}
        <div className="flex flex-wrap gap-3 justify-center mb-12 animate-slide-up animation-delay-400">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full font-medium transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-700 hover:shadow-md hover:scale-105"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {posts.map((post: any, index: number) => (
            <article
              key={post._id}
              className="group animate-slide-up"
              style={{ animationDelay: `${600 + index * 150}ms` }}
            >
              <Link href={`/blog/${post._id}`}>
                <div className="relative h-full rounded-2xl bg-white shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 hover:scale-[1.02] hover:shadow-2xl group-hover:shadow-2xl">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={post.img || `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80`}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {post.category && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-900">
                          {post.category}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Author & Date */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                        {post.userEmail ? post.userEmail.charAt(0).toUpperCase() : 'A'}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {post.userEmail?.split('@')[0] || 'Anonymous'}
                        </p>
                        <p className="text-sm text-gray-500">
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })
                            : 'No date'}
                        </p>
                      </div>
                    </div>

                    {/* Title & Excerpt */}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-2">
                        {post.description || 'Click to read more...'}
                      </p>
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm font-medium text-purple-600 group-hover:translate-x-2 transition-transform duration-300 inline-flex items-center gap-2">
                        Read More
                        <span>→</span>
                      </span>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine pointer-events-none"></div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-8">Be the first to share your story!</p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Create Your First Post
            </Link>
          </div>
        )}
      </section>

      {/* Floating Write Button */}
      <Link href="/dashboard">
        <button className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center text-2xl animate-float z-50">
          ✍️
        </button>
      </Link>
    </main>
  );
}