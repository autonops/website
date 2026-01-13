"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/#product", label: "Product" },
  { href: "/#background", label: "About" },
  { href: "/docs/", label: "Docs" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/start/", label: "Join Beta" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="max-w-[1100px] mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-gray-50">
          auton<span className="text-blue-600 dark:text-blue-500">ops</span>
        </Link>

        <div className="hidden md:flex items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 ml-6 text-[15px] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/autonops/infraIQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 ml-6 text-[15px] transition-colors"
          >
            GitHub
          </a>
          <div className="ml-6">
            <ThemeToggle />
          </div>
        </div>

        <button
          className="md:hidden p-2 z-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-50 mb-1.5 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-50 mb-1.5 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-gray-800 dark:bg-gray-50 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      <div className={`md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 py-4" : "max-h-0"}`}>
        <div className="px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-gray-400">
              {link.label}
            </Link>
          ))}
          <a href="https://github.com/autonops/infraIQ" target="_blank" className="text-gray-500 dark:text-gray-400">GitHub</a>
          <div className="pt-2"><ThemeToggle /></div>
        </div>
      </div>
    </nav>
  );
}
