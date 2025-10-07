"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false
    });
    if (res?.error) setMsg("Invalid email or password");
    else setMsg("Signed in");
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md p-4 space-y-3">
      <input
        className="border rounded px-3 py-2 w-full"
        placeholder="Email"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="border rounded px-3 py-2 w-full"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button className="rounded bg-indigo-600 text-white px-4 py-2">Sign in</button>

      <button
        type="button"
        onClick={() => signIn("google")}
        className="rounded bg-gray-100 px-4 py-2 ml-2"
      >
        Sign in with Google
      </button>

      {msg && <p className="text-sm">{msg}</p>}
    </form>
  );
}
