"use client";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const [search, setSearch] = useState("");
  const { data: session, status } = useSession();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-100 px-4">
      <div className="max-w-xl w-full flex flex-col items-center gap-8 p-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-md">
        {/* Auth UI */}
        <div className="w-full flex flex-col items-center mb-4">
          {status === "loading" ? (
            <div className="text-gray-500 text-lg">Loading...</div>
          ) : session ? (
            <div className="flex flex-col items-center gap-2">
              <span className="text-gray-700 text-base font-medium">
                Welcome, {session.user?.name || session.user?.email}!
              </span>
              <button
                onClick={() => signOut()}
                className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold shadow hover:bg-gray-300 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-8 py-3 rounded-full bg-red-500 text-white font-semibold text-lg shadow-md hover:bg-red-600 transition-colors mb-2"
            >
              Login with Google
            </button>
          )}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 drop-shadow-lg">
          Trigger Warnings Finder
        </h1>
        <p className="text-lg sm:text-xl text-center text-gray-600 max-w-md">
          Search for books or movies and get notified if they may contain your personal triggers—without spoilers or explicit details.
        </p>
        <form
          className="w-full flex flex-col sm:flex-row gap-4 mt-4"
          onSubmit={e => {
            e.preventDefault();
            // Placeholder: handle search
          }}
        >
          <input
            type="text"
            className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow-sm bg-white/90"
            placeholder="Search for a book or movie..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="px-8 py-4 rounded-full bg-blue-600 text-white font-semibold text-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </div>
      <footer className="mt-16 text-gray-400 text-sm text-center">
        &copy; {new Date().getFullYear()} Trigger Warnings Finder. All rights reserved.
      </footer>
    </div>
  );
}
