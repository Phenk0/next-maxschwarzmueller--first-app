import Link from "next/link";
import Image from "next/image";

import logoImg from "@/assets/logo.png";
import { header, logo, nav } from "./main-header.module.css";

function MainHeader() {
  return (
    <header className={header}>
      <Link href={"/"} className={logo}>
        <Image src={logoImg} alt="A plate with food on it" priority />
        NextLevel Food
      </Link>
      <nav className={nav}>
        <ul>
          <li>
            <Link href={"/meals"}>Browse Meals</Link>
          </li>
          <li>
            <Link href={"/community"}>Foodies Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
