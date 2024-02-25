import Link from "next/link";
import Image from "next/image";

import MainHeaderBackground from "@/components/main-header/main-header-background";

import logoImg from "@/assets/logo.png";
import { header, logo, nav } from "./main-header.module.css";
import NavLink from "@/components/main-header/nav-link";

function MainHeader() {
  return (
    <>
      <MainHeaderBackground />
      <header className={header}>
        <Link href="/" className={logo}>
          <Image src={logoImg} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>
        <nav className={nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default MainHeader;
