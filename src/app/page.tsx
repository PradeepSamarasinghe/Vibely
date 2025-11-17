"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDelay, setSlideDelay] = useState(50000); // default 5s

  // Hero slider data
  const heroSlides = [
    {
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070",
      title: "Share Your Stories",
      subtitle: "Inspire The World",
      description: "A modern platform for writers, thinkers, and creators",
      // gradient: "from-purple-500 via-pink-300 to-blue-400",
    },
    {
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073",
      title: "Write. Create. Connect.",
      subtitle: "Your Voice Matters",
      description: "Join thousands of storytellers sharing their knowledge",
      // gradient: "from-blue-500 via-teal-300 to-cyan-400",
    },
    {
      image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=2073",
      title: "Ideas That Inspire",
      subtitle: "Stories That Move",
      description: "Discover and share compelling narratives that matter",
      // gradient: "from-pink-400 via-purple-300 to-indigo-400",
    }
  ];

  // Auto-advance slider
 useEffect(() => {
  if (slideDelay <= 0) return; // allow disabling autoplay by setting 0
  const timer = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, slideDelay);
  return () => clearInterval(timer);
}, [slideDelay, heroSlides.length]); // restart if delay or slides count changes

  // Fetch posts from API
  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/posts');
      if (res.ok) {
        const data = await res.json();
        const filtered = activeTab === 'all' 
          ? data 
          : data.filter((post: any) => post.category?.toLowerCase() === activeTab);
        setBlogPosts(filtered);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }

    try {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: 'POST',
      });

      if (res.ok) {
        setLikedPosts(prev => {
          const newSet = new Set(prev);
          if (newSet.has(postId)) {
            newSet.delete(postId);
          } else {
            newSet.add(postId);
          }
          return newSet;
        });
        
        fetchPosts();
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) {
      return;
    }

    try {
      const res = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setBlogPosts(prev => prev.filter((post: any) => post._id !== postId));
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Error deleting post');
    }
  };

  const handleOpenModal = () => {
    if (!session) {
      router.push('/api/auth/signin');
      return;
    }
    setIsModalOpen(true);
  };

  const isOwner = (postUserEmail: string) => {
    return session?.user?.email === postUserEmail;
  };

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const categories = ['all', 'technology', 'design', 'development', 'business'];

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
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { transform: scale(1.1); }
          to { transform: scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-shine { animation: shine 1.5s ease-in-out; }
        .animate-slide-in { animation: slideIn 1s ease-out forwards; }
        .animate-zoom-in { animation: zoomIn 20s ease-out forwards; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-2000 { animation-delay: 5s; }
        .animation-delay-4000 { animation-delay: 4s; }

        /* NEW: slide-in animation used for background <img> */
        @keyframes slide-in {
          from { opacity: 0; transform: scale(1.03); }
          to { opacity: 1; transform: scale(1); }
        }
        .slide-in { animation: slide-in 0.7s ease-out forwards; }
      `}</style>

      {/* Hero Slider Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* ---------- CHANGED: Background Image block (now uses plain <img> + strong gradient overlay + slide-in class) ---------- */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover ${currentSlide === index ? 'slide-in' : ''}`}
              />
              {/* stronger dark gradient overlay like your requested style */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative h-full flex items-center justify-center px-6">
              <div className="text-center max-w-5xl">
                {currentSlide === index && (
                  <>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-8 animate-slide-in">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      <span className="text-sm font-medium text-white">
                        {blogPosts.length} stories published
                      </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 animate-slide-in animation-delay-200">
                      {slide.title}
                      <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300">
                        {slide.subtitle}
                      </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/90 mb-10 animate-slide-in animation-delay-400">
                      {slide.description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in animation-delay-600">
                      <button
                        onClick={handleOpenModal}
                        className="group relative inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-gray-900 font-semibold shadow-2xl hover:shadow-white/50 transition-all duration-300 hover:scale-105"
                      >
                        {session ? 'Start Writing' : 'Get Started'}
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {session ? '✍️' : '→'}
                        </span>
                      </button>
                      <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-8 py-4 text-white font-semibold hover:bg-white/30 transition-all duration-300 hover:scale-105"
                      >
                        Explore Stories
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index
                  ? 'w-12 h-3 bg-white'
                  : 'w-3 h-3 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Scroll Indicator */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-white/50 flex justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12 animate-slide-up animation-delay-600">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 capitalize ${
                activeTab === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:shadow-md hover:scale-105'
              }`}
              onClick={() => setActiveTab(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading stories...</p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!loading && blogPosts.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {blogPosts.map((post: any, index: number) => (
              <article
                key={post._id}
                className="group animate-slide-up"
                style={{ animationDelay: `${800 + index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(post._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`relative h-full rounded-2xl bg-white shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 ${
                    hoveredCard === post._id ? 'scale-[1.02] shadow-2xl' : ''
                  }`}
                >
                  {/* Image */}
                  <Link href={`/blog/${post._id}`}>
                    <div className="relative h-56 overflow-hidden cursor-pointer">
                      {post.img ? (
                        <Image
                          src={post.img}
                          alt={post.title}
                          fill
                          className={`object-cover transition-transform duration-700 ${
                            hoveredCard === post._id ? 'scale-110' : 'scale-100'
                          }`}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white text-6xl">
                          📝
                        </div>
                      )}
                      {post.category && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-900 capitalize">
                            {post.category}
                          </span>
                        </div>
                      )}
                      {hoveredCard === post._id && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent animate-fade-in"></div>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Author & Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                          {post.userEmail?.charAt(0).toUpperCase() || 'A'}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {post.userEmail?.split('@')[0] || 'Anonymous'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {post.createdAt ? formatTimestamp(post.createdAt) : 'No date'}
                          </p>
                        </div>
                      </div>
                      
                      {/* Edit/Delete buttons for post owner */}
                      {session && isOwner(post.userEmail) && (
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/dashboard/edit/${post._id}`}
                            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                            title="Edit post"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                            title="Delete post"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Title & Excerpt */}
                    <Link href={`/blog/${post._id}`}>
                      <div className="cursor-pointer">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 line-clamp-2">
                          {post.description || 'Click to read more...'}
                        </p>
                      </div>
                    </Link>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        {post.readTime || '5 min read'}
                      </span>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(post._id)}
                          disabled={!session}
                          className={`flex items-center gap-1 transition-colors ${
                            likedPosts.has(post._id)
                              ? 'text-red-500'
                              : 'text-gray-500 hover:text-red-500'
                          } ${!session ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                          title={session ? 'Like this post' : 'Sign in to like'}
                        >
                          <span>{likedPosts.has(post._id) ? '❤️' : '🤍'}</span>
                          <span className="text-sm font-medium">{post.likes || 0}</span>
                        </button>
                        <Link
                          href={`/blog/${post._id}#comments`}
                          className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors"
                        >
                          <span>💬</span>
                          <span className="text-sm font-medium">{post.comments || 0}</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  {hoveredCard === post._id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine pointer-events-none"></div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && blogPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-8">
              {activeTab === 'all' 
                ? 'Be the first to share your story!' 
                : `No posts in ${activeTab} category yet.`}
            </p>
            {session && (
              <button
                onClick={handleOpenModal}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Create Your First Post
              </button>
            )}
          </div>
        )}
      </section>

      {/* Floating Write Button */}
      {session && (
        <button
          onClick={handleOpenModal}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center text-2xl animate-float z-50"
        >
          ✍️
        </button>
      )}
    </main>
  );
}
