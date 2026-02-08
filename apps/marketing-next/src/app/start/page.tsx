"use client";
import { useState } from "react";

const blocked = ["gmail.com","yahoo.com","hotmail.com","outlook.com","icloud.com","aol.com","protonmail.com"];

export default function StartPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [agreeError, setAgreeError] = useState("");

  const validate = () => {
    let valid = true;
    const domain = email.toLowerCase().split("@")[1];
    if (blocked.includes(domain)) { setError("Please use your work email"); valid = false; } else { setError(""); }
    if (!agreed) { setAgreeError("You must agree to the Terms of Service and Privacy Policy"); valid = false; } else { setAgreeError(""); }
    return valid;
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
              <input type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} onBlur={() => { const domain = email.toLowerCase().split("@")[1]; if (blocked.includes(domain)) { setError("Please use your work email"); } else { setError(""); } }} className={`w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border rounded-lg ${error ? "border-red-500" : "border-gray-200 dark:border-gray-700"}`} />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company <span className="text-gray-400">(optional)</span></label>
              <input type="text" name="company" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg" />
            </div>
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => { setAgreed(e.target.checked); if (e.target.checked) setAgreeError(""); }}
                  className="mt-1 w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  I agree to the{" "}
                  <a href="/terms/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                  {" "}and{" "}
                  <a href="/privacy/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
                </span>
              </label>
              {agreeError && <p className="text-red-500 text-sm mt-2">{agreeError}</p>}
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">Request Beta Access</button>
          </form>
        </div>
      </div>
    </section>
  );
}
