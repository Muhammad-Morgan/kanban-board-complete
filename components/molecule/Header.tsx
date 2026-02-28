import Link from "next/link";
import { navLinks } from "@/utils/navLinks";

export const Header = () => {
  return (
    <header>
      <div className="container py-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link href="/" className="text-decoration-none">
                Home
              </Link>
            </li>
            {navLinks.map((link) => {
              return (
                <li
                  key={link.href}
                  className="breadcrumb-item"
                  style={{ width: "fit-content" }}
                >
                  <Link href={link.href} className="text-decoration-none">
                    <span className="d-flex align-items-center gap-2 mx-2 text-nowrap">
                      {link.label}
                    </span>
                  </Link>
                  {/* {isActive ? (
                    <span className="d-flex align-items-center gap-2 text-primary">
                      {link.label}
                    </span>
                  ) : (
                    <Link href={link.href} className="text-decoration-none">
                      <span className="d-flex align-items-center gap-2">
                        {link.label}
                      </span>
                    </Link>
                  )} */}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </header>
  );
};
