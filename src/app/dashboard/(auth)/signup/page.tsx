"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const text = await res.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {}

      if (!res.ok) throw new Error(data?.error || text || `HTTP ${res.status}`);

      // Automatically sign in after signup
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      router.push("/"); // Go home
    } catch (err: any) {
      setMsg(err.message || "Signup failed");
      console.error("Signup failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 px-4">
      <form
        onSubmit={onSubmit}
        className="max-w-md w-full bg-gray-800 p-6 rounded-xl space-y-4 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">Create your account</h2>

        <input
          className="border border-gray-700 rounded px-3 py-2 w-full bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border border-gray-700 rounded px-3 py-2 w-full bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="border border-gray-700 rounded px-3 py-2 w-full bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-indigo-600 hover:bg-indigo-500 transition text-white px-4 py-2 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        {msg && <p className="text-sm text-center text-gray-300">{msg}</p>}
      </form>
    </main>
  );
}
