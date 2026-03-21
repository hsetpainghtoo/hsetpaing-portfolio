"use client";

import { redirect } from "next/navigation";

export default function NotFound() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center bg-gray-50">
      <h1 className="text-6xl font-extrabold text-gray-800">404</h1>
      <p className="mt-4 text-2xl font-semibold text-gray-700">
        Oops — page not found!
      </p>
      <p className="mt-2 text-gray-500">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

    </div>
  );
}
