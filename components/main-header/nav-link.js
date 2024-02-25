"use client";
import Link from "next/link";
import { active, link } from "./nav-link.module.css";
import { usePathname } from "next/navigation";

function NavLink({ href, children }) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={path.startsWith(href) ? `${link} ${active}` : link}
    >
      {children}
    </Link>
  );
}

export default NavLink;
