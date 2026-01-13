"use client";
import { useState } from "react";

const blocked = ["gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com","aol.com","protonmail.com"];

export default function StartPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    const domain = email.toLowerCase().split("@")[1];
    if (blocked.includes(domain)) { setError("Please use your work email"); return false; }
    setError(""); return true;
  };

  return (
    <section className="py-20">
      <div className="max-w-[500px] mx-auto px-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
          <h1 className="text-2xl font-bold mb-2 text-center">Join the Beta</h1>
          <p className="text-gray-500 dark:text-gray-400 text-center mb-8">Free access through Q1 2026.</p>
          <form action="https://formspree.io/f/xdaoqglp" method="POST" onSubmit={(e) => { if (!validate()) e.preventDefault(); }} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input type="text" name="name" required className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Work Email</label>
              <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} onBlur={validate} className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-lg ${error ? "border-red-500" : "border-gray-200 dark:border-gray-700"}`} />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company <span className="text-gray-400">(optional)</span></label>
              <input type="text" name="company" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg" />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">Request Beta Access</button>
          </form>
        </div>
      </div>
    </section>
  );
}
