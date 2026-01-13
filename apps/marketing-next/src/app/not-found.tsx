import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-7xl font-bold text-blue-600 dark:text-blue-500 mb-4">404</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">Page not found.</p>
        <Link href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">Go Home</Link>
      </div>
    </div>
  );
}
