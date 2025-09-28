import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left: Text + CTA */}
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
              Better design for your <span className="text-indigo-600">digital products</span>
            </h1>

            <p className="text-gray-600 max-w-prose">
              We craft simple, fast, and accessible interfaces for web and mobile.
              From concept to launch, our team helps you turn ideas into products
              your users will love.
            </p>

            <div>
              <Link
                href="/portfolio"
                className="inline-flex items-center rounded-lg bg-indigo-600 px-5 py-3 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                See Our Works
                <span aria-hidden="true" className="ml-2">→</span>
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative">
            <div className="rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden">
              <Image
                src="https://cdn.pixabay.com/photo/2014/08/16/07/48/ball-419198_1280.jpg"
                alt="Colorful abstract sphere"
                width={800}
                height={600}
                className="h-auto w-full object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
