import Link from "next/link";
import { navLinks } from "@/utils/navLinks";

export const Header = () => {
  return (
    <header className="bg-background/80 backdrop-blur">
      <div className="mx-auto w-full max-w-6xl px-6 py-3">
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
              return (
                <li
                  key={link.href}
                  className="flex w-fit items-center gap-1 after:mx-2 after:text-muted-foreground/60 after:content-['/'] last:after:content-['']"
                >
                  <Link
                    href={link.href}
                    className="text-foreground transition hover:text-foreground/80"
                  >
                    <span className="inline-flex items-center gap-2 whitespace-nowrap">
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </header>
  );
};
