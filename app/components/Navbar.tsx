"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { HandDrawnUnderline } from "./sketch/HandDrawnUnderline";
import { SketchStar } from "./sketch/SketchStar";
import { PROJECT_CATEGORIES } from "./project-categories";

const LINKS = [
  { href: "#home", zh: "首页", en: "Home" },
  { href: "#projects", zh: "AI实践项目", en: "AI Projects" },
  { href: "#notes", zh: "AI 随笔", en: "AI Notes" },
  { href: "#lab", zh: "实验室", en: "Lab" },
  { href: "#about", zh: "关于我", en: "About" },
  { href: "#contact", zh: "联系", en: "Contact" },
] as const;

function ProjectDropdown({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const openedOnHover = useRef(false);
  const menuId = mobile ? "mobile-project-categories" : "project-categories";

  useEffect(() => {
    if (!open) return;
    const closeOutside = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [open]);

  return (
    <div
      ref={container}
      role="presentation"
      className="relative"
      onPointerEnter={(event) => {
        if (!mobile && event.pointerType === "mouse" && !open) {
          openedOnHover.current = true;
          setOpen(true);
        }
      }}
      onPointerLeave={(event) => {
        openedOnHover.current = false;
        if (!mobile && event.pointerType === "mouse" && !container.current?.contains(document.activeElement)) setOpen(false);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          event.stopPropagation();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <button
        ref={trigger}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={(event) => {
          // Hover may already have opened the desktop menu before a click.
          if (!mobile && event.detail > 0 && openedOnHover.current) setOpen(true);
          else setOpen((current) => !current);
          openedOnHover.current = false;
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            requestAnimationFrame(() => container.current?.querySelector("a")?.focus());
          }
        }}
        className="group relative inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-left focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-ink-faint"
      >
        <span className="flex flex-col items-start gap-[0.15em]">
          <span className="whitespace-nowrap font-editorial-cn text-[0.92rem] font-light leading-none tracking-[0.18em] text-ink-soft">AI实践项目</span>
          <span className="font-editorial text-[0.6rem] font-normal uppercase leading-none tracking-[0.28em] text-ink-faint">AI Projects</span>
        </span>
        <ChevronDown aria-hidden size={12} strokeWidth={1.25} className={`text-ink-faint transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`} />
        <HandDrawnUnderline drawOnHover className="absolute -bottom-2 left-0 h-[5px] w-full text-ink" />
      </button>
      <div
        id={menuId}
        hidden={!open}
        className={mobile ? "pt-5" : "absolute -left-5 top-full min-w-[210px] pt-2"}
      >
        <ul className={mobile ? "space-y-1 border-l border-rule pl-3" : "rounded-sm border border-rule bg-paper p-2 shadow-[0_10px_28px_rgba(75,71,64,0.08)]"}>
          {PROJECT_CATEGORIES.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={() => { setOpen(false); onNavigate?.(); }}
                className="block whitespace-nowrap min-h-11 rounded-sm px-3 py-3 font-editorial-cn text-[0.95rem] font-light tracking-[0.08em] text-ink-soft transition-colors hover:bg-paper-deep hover:text-ink focus-visible:bg-paper-deep focus-visible:outline-1 focus-visible:outline-ink-faint"
              >
                {link.zh}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

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
        "group relative inline-flex min-w-0 flex-col items-start gap-[0.15em]",
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
    const query = window.matchMedia("(min-width: 1024px)");
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

        <div className="hidden items-center gap-5 lg:flex lg:gap-8 xl:gap-10">
          {LINKS.map((link) => (
            link.href === "#projects" ? (
              <ProjectDropdown key={link.href} />
            ) : (
              <NavLink key={link.href} href={link.href} zh={link.zh} en={link.en} />
            )
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "关闭菜单 Close menu" : "打开菜单 Open menu"}
          className="-mr-2 p-2 text-ink-soft transition-colors duration-300 hover:text-ink focus-visible:outline-none lg:hidden"
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
        className="mx-auto max-h-[calc(100dvh-80px)] w-full max-w-[1180px] overflow-y-auto px-6 pb-10 sm:px-10 lg:hidden"
      >
        <ul className="flex flex-col gap-7">
          {LINKS.map((link) => (
            <li key={link.href}>
              {link.href === "#projects" ? (
                <ProjectDropdown key={String(menuOpen)} mobile onNavigate={() => setMenuOpen(false)} />
              ) : (
                <NavLink
                  href={link.href}
                  zh={link.zh}
                  en={link.en}
                  onNavigate={() => setMenuOpen(false)}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
