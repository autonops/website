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
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <Link href="/security/" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Security</Link>
          <Link href="/privacy/" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Privacy</Link>
          <Link href="/terms/" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Terms</Link>
          <a href="https://github.com/autonops/infraIQ" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">GitHub</a>
          <a href="https://x.com/autonops_io" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors" aria-label="X (Twitter)">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/company/autonops/" target="_blank" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">LinkedIn</a>
          <a href="mailto:info@autonops.io" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-500 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}
