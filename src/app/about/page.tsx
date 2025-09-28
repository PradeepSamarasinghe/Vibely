import Image from "next/image";
import React from "react";

function About() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Top: Image Container / Hero */}
      <section className="relative h-[40vh] w-full overflow-hidden rounded-b-2xl">
        <Image
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
          alt="Team working on digital products"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            About Vibely
          </h1>
          <p className="mt-2 max-w-2xl text-gray-200">
            We design fast, accessible, and beautiful interfaces for web and mobile.
          </p>
        </div>
      </section>

      {/* Bottom: Two Horizontal Text Containers */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Left card */}
          <article className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
            <h2 className="text-xl font-semibold text-gray-900">Who we are</h2>
            <p className="mt-3 text-gray-600">
              A product-focused team that blends strategy, UX, and engineering.
              We keep things clear, performant, and user-centered.
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                Human-first research and testing
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                WCAG-aware design and clean code
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-600" />
                Fast, maintainable delivery
              </li>
            </ul>
          </article>

          {/* Right card */}
          <article className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
            <h2 className="text-xl font-semibold text-gray-900">What we do</h2>
            <p className="mt-3 text-gray-600">
              We help teams ship products that feel natural and look refined.
              From discovery to handoff, we cover the full track.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-gray-700">
              <div className="rounded-lg bg-gray-50 p-3 ring-1 ring-black/5">
                UI/UX design
              </div>
              <div className="rounded-lg bg-gray-50 p-3 ring-1 ring-black/5">
                Frontend engineering
              </div>
              <div className="rounded-lg bg-gray-50 p-3 ring-1 ring-black/5">
                Design systems
              </div>
              <div className="rounded-lg bg-gray-50 p-3 ring-1 ring-black/5">
                Usability testing
              </div>
            </div>
            <div className="mt-6">
              <a
                href="/contact"
                className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              >
                Work with us
                <span aria-hidden className="ml-2">→</span>
              </a>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default About;
