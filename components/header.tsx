"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="w-full border-b bg-white/80 dark:bg-gray-950/80 backdrop-blur sticky top-0 z-30">
      <nav className="max-w-2xl mx-auto flex items-center gap-6 px-4 py-3">
        <Link
          href="/albums"
          className={`font-medium transition-colors hover:text-blue-600 ${
            pathname === "/" || pathname.startsWith("/albums")
              ? "text-blue-600"
              : "text-gray-700 dark:text-gray-200"
          }`}
          aria-current={
            pathname === "/" || pathname.startsWith("/albums")
              ? "page"
              : undefined
          }
        >
          Albums
        </Link>
        <Link
          href="/blogs"
          className={`font-medium transition-colors hover:text-blue-600 ${
            pathname.startsWith("/blogs")
              ? "text-blue-600"
              : "text-gray-700 dark:text-gray-200"
          }`}
          aria-current={pathname.startsWith("/blogs") ? "page" : undefined}
        >
          Blogs
        </Link>
      </nav>
    </header>
  );
}
