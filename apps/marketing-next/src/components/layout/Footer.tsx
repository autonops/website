import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 py-10">
      <div className="max-w-[1100px] mx-auto px-6 flex flex-wrap justify-between items-center gap-4">
        <div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} Autonops. All rights reserved.
          </div>
          <div className="text-gray-400 dark:text-gray-500 text-xs mt-1">
            Autonops Labs, Inc. · Founded in 2025
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-sm">
          <Link href="/security/" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Security</Link>
          <Link href="/privacy/" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Privacy</Link>
          <a href="https://github.com/autonops/infraIQ" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">GitHub</a>
          <a href="mailto:hello@autonops.io" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
