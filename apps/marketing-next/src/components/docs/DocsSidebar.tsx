"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docsNavigation, NavItem } from "@/lib/docs-navigation";

interface DocsSidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function DocsSidebar({ mobile, onClose }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className={`${mobile ? "" : "sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto"} py-6 pr-4`}>
      <div className="space-y-6">
        {docsNavigation.map((section) => (
          <div key={section.title}>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
              {section.title}
            </h4>
            {section.items && (
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <SidebarItem key={item.href} item={item} pathname={pathname} onClose={onClose} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">Resources</h4>
        <ul className="space-y-1">
          <li>
            <a href="https://github.com/autonops/infraIQ" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 py-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          </li>
          <li>
            <a href="mailto:jason@autonops.io"
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 py-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get Help
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function SidebarItem({ item, pathname, onClose }: { item: NavItem; pathname: string; onClose?: () => void }) {
  const isActive = pathname === item.href;
  
  return (
    <li>
      <Link href={item.href || "#"} onClick={onClose}
        className={`block text-sm py-1.5 px-3 rounded-md transition-colors
          ${isActive 
            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium" 
            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"}`}>
        <span className="flex items-center gap-2">
          {item.title}
          {item.badge && (
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium
              ${item.badge === "Popular" 
                ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400" 
                : "bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-400"}`}>
              {item.badge}
            </span>
          )}
        </span>
      </Link>
    </li>
  );
}
