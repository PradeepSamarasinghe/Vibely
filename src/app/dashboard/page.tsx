"use client"; // 👈 required in App Router for client components

import React, { useEffect, useState } from "react";

function Dashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Loading data...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-sm p-5 ring-1 ring-black/5 hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                {user.name}
              </h2>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-600">
                {user.company?.name || "No company listed"}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Dashboard;
