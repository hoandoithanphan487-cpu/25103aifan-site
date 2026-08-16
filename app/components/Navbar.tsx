"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { HandDrawnUnderline } from "./sketch/HandDrawnUnderline";
import { SketchStar } from "./sketch/SketchStar";

const LINKS = [
  { href: "#home", zh: "首页", en: "Home" },
  { href: "#about", zh: "关于", en: "About" },
  { href: "#journey", zh: "经历", en: "Journey" },
  { href: "#contact", zh: "问候", en: "Say hello" },
] as const;

function NavLink({
  href,
  zh,
  en,
  onNavigate,
  className,
}: {
  href: string;
  zh: string;
  en: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={onNavigate}
      className={[
        "group relative inline-flex flex-col items-start gap-[0.15em]",
        "transition-opacity duration-500 hover:opacity-80 focus-visible:outline-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="font-editorial-cn text-[0.92rem] font-light leading-none tracking-[0.18em] text-ink-soft">
        {zh}
      </span>
      <span className="font-editorial text-[0.6rem] font-normal uppercase leading-none tracking-[0.28em] text-ink-faint">
        {en}
      </span>
      <HandDrawnUnderline
        drawOnHover
        className="absolute -bottom-2 left-0 h-[5px] w-full text-ink"
      />
    </a>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sync = () => setScrolled(window.scrollY > 32);
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    return () => window.removeEventListener("scroll", sync);
  }, []);

  // A menu left open while the layout grows back to desktop would strand the
  // close button off-screen.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-700",
        scrolled || menuOpen ? "bg-paper/85 backdrop-blur-[6px]" : "bg-transparent",
      ].join(" ")}
    >
      <nav
        aria-label="主导航"
        className="mx-auto flex w-full max-w-[1180px] items-center justify-between px-6 py-6 sm:px-10 sm:py-7 lg:px-16"
      >
        <a
          href="#home"
          className="group flex items-baseline gap-2 font-editorial text-[0.82rem] font-normal uppercase tracking-[0.42em] text-ink transition-opacity duration-500 hover:opacity-70 focus-visible:outline-none"
        >
          Yifan
          <SketchStar className="h-2 w-2 shrink-0 translate-y-[-0.35em] transition-transform duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:rotate-[18deg] motion-reduce:transition-none" />
        </a>

        <div className="hidden items-end gap-10 md:flex lg:gap-14">
          {LINKS.map((link) => (
            <NavLink key={link.href} href={link.href} zh={link.zh} en={link.en} />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "关闭菜单 Close menu" : "打开菜单 Open menu"}
          className="-mr-2 p-2 text-ink-soft transition-colors duration-300 hover:text-ink focus-visible:outline-none md:hidden"
        >
          {menuOpen ? (
            <X size={18} strokeWidth={1.25} aria-hidden />
          ) : (
            <Menu size={18} strokeWidth={1.25} aria-hidden />
          )}
        </button>
      </nav>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="mx-auto w-full max-w-[1180px] px-6 pb-10 sm:px-10 md:hidden"
      >
        <ul className="flex flex-col gap-7">
          {LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                zh={link.zh}
                en={link.en}
                onNavigate={() => setMenuOpen(false)}
              />
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
