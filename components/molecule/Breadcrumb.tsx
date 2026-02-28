"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/utils/navLinks";

export const Breadcrumb = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        <li className="flex items-center gap-1 after:mx-2 after:text-muted-foreground/60 after:content-['/'] last:after:content-['']">
          <Link
            href="/"
            className="text-foreground transition hover:text-foreground/80"
          >
            Home
          </Link>
        </li>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li
              key={link.href}
              className="flex items-center gap-1 after:mx-2 after:text-muted-foreground/60 after:content-['/'] last:after:content-['']"
              aria-current={isActive ? "page" : undefined}
            >
              {isActive ? (
                <span className="font-medium text-foreground">
                  {link.label}
                </span>
              ) : (
                <Link
                  href={link.href}
                  className="text-foreground transition hover:text-foreground/80"
                >
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
