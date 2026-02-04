import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children, id }) => (
      <h1 id={id} className="text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24">
        {children}
      </h1>
    ),
    h2: ({ children, id }) => (
      <h2 id={id} className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-3 scroll-mt-24 border-b border-gray-200 dark:border-gray-800 pb-2">
        {children}
      </h2>
    ),
    h3: ({ children, id }) => (
      <h3 id={id} className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-2 scroll-mt-24">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{children}</p>
    ),
    a: ({ href, children }) => {
      const isExternal = href?.startsWith('http');
      if (isExternal) {
        return <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{children}</a>;
      }
      const cleanHref = href?.replace(/\.md$/, '').replace(/\.mdx$/, '');
      return <Link href={cleanHref || '#'} className="text-blue-600 dark:text-blue-400 hover:underline">{children}</Link>;
    },
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600 dark:text-gray-300 ml-4">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-600 dark:text-gray-300 ml-4">{children}</ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    pre: ({ children }) => (
      <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-4 overflow-x-auto mb-4 text-sm border border-gray-800">{children}</pre>
    ),
    code: ({ children, className }) => {
      if (!className) {
        return <code className="bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>;
      }
      return <code className={`${className} text-sm`}>{children}</code>;
    },
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg">{children}</table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>,
    tbody: ({ children }) => <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">{children}</tbody>,
    tr: ({ children }) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">{children}</tr>,
    th: ({ children }) => <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">{children}</th>,
    td: ({ children }) => <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{children}</td>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg">{children}</blockquote>
    ),
    hr: () => <hr className="border-gray-200 dark:border-gray-700 my-8" />,
    strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
    ...components,
  };
}
