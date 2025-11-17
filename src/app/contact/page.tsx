"use client";

import { useState } from "react";

export default function Contact() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const contactMethods = [
    {
      id: "email",
      icon: "📧",
      title: "Email",
      description: "Send us an email anytime",
      contact: "hello@vibely.com",
      link: "mailto:hello@vibely.com",
    },
    {
      id: "phone",
      icon: "📞",
      title: "Phone",
      description: "Mon-Fri from 8am to 5pm",
      contact: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      id: "location",
      icon: "📍",
      title: "Office",
      description: "Visit our office",
      contact: "123 Vibely Street, Tech City",
      link: "#",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      setTimeout(() => setSuccess(false), 5000);
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; opacity: 0; }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-shine { animation: shine 1.5s ease-in-out; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
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
            <span className="text-sm font-medium text-gray-700">We'd love to hear from you</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-gray-900 animate-slide-up">
            Get in Touch
            <span className="block mt-2 bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-slide-up animation-delay-200">
            Have a question or want to work together? We're here to help. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Methods */}
          <div className="lg:col-span-1 space-y-6">
            {contactMethods.map((method, index) => (
              <a
                key={method.id}
                href={method.link}
                className="block animate-slide-up"
                style={{ animationDelay: `${400 + index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(method.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={`relative p-6 rounded-2xl bg-white shadow-lg transition-all duration-500 border border-gray-100 ${
                    hoveredCard === method.id ? 'scale-105 shadow-2xl' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-4xl transition-transform duration-500 ${
                      hoveredCard === method.id ? 'scale-110 rotate-6' : ''
                    }`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{method.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{method.description}</p>
                      <p className="text-purple-600 font-semibold">{method.contact}</p>
                    </div>
                  </div>

                  {/* Shine Effect */}
                  {hoveredCard === method.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine pointer-events-none rounded-2xl"></div>
                  )}
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 animate-slide-up animation-delay-600">
            <div className="relative p-8 rounded-2xl bg-white shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>

              {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 animate-fade-in">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    required
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map or Additional Info */}
        <div className="mt-12 p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg border border-gray-100 animate-slide-up animation-delay-600">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Response</h3>
              <p className="text-sm text-gray-600">We typically respond within 24 hours</p>
            </div>
            <div>
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-bold text-gray-900 mb-2">Friendly Team</h3>
              <p className="text-sm text-gray-600">Our team is always happy to help</p>
            </div>
            <div>
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="font-bold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-sm text-gray-600">Serving clients worldwide</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}