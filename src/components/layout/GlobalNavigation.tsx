"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navigationItems = [
  { label: "首页", href: "/" },
  { label: "问天之路", href: "/#timeline" },
  { label: "航天器", href: "/#spacecraft" },
  { label: "天宫", href: "/#tiangong" },
  { label: "探索深空", href: "/#deep-space" },
  { label: "航天精神", href: "/#spirit" },
];

export function GlobalNavigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 24);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        isScrolled || isMenuOpen
          ? "border-white/10 bg-[rgba(3,7,18,0.72)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      ].join(" ")}
    >
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          aria-label="问天 WENTIAN 首页"
          className="group flex items-end gap-3"
        >
          <span className="text-[1.38rem] font-semibold leading-none tracking-normal text-[var(--star-white)] transition-colors duration-300 group-hover:text-white">
            问天
          </span>
          <span className="pb-0.5 text-[0.64rem] font-semibold leading-none tracking-[0.32em] text-[var(--moon-gray)] transition-colors duration-300 group-hover:text-[var(--star-white)]">
            WENTIAN
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <div className="flex items-center gap-7">
            {navigationItems.map((item) => {
              const isActive = item.href === "/" && isHome;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative py-2 text-sm font-medium text-[rgba(248,250,252,0.72)] transition-colors duration-300 hover:text-[var(--star-white)]"
                >
                  <span>{item.label}</span>
                  <span
                    className={[
                      "absolute inset-x-0 -bottom-0.5 mx-auto h-px origin-center bg-[var(--china-red)] transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-75",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </div>

          <Link
            href="/#mission"
            className="group relative overflow-hidden border border-white/15 px-5 py-2.5 text-sm font-semibold text-[var(--star-white)] transition-colors duration-300 hover:border-[rgba(217,31,47,0.58)]"
          >
            <span className="relative z-10">启动任务</span>
            <span className="absolute inset-x-0 bottom-0 h-px bg-[var(--china-red)] transition-transform duration-300 group-hover:scale-x-100" />
          </Link>
        </div>

        <button
          type="button"
          aria-label={isMenuOpen ? "关闭导航菜单" : "打开导航菜单"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex size-11 items-center justify-center text-[var(--star-white)] transition-colors duration-300 hover:text-white lg:hidden"
        >
          {isMenuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
        </button>
      </nav>

      <div
        className={[
          "overflow-hidden border-t border-white/10 transition-[max-height,opacity] duration-500 lg:hidden",
          isMenuOpen ? "max-h-[31rem] opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col px-5 pb-7 pt-2 sm:px-8">
          {navigationItems.map((item) => {
            const isActive = item.href === "/" && isHome;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-center justify-between border-b border-white/8 py-4 text-base font-medium text-[rgba(248,250,252,0.78)] transition-colors duration-300 hover:text-[var(--star-white)]"
              >
                <span>{item.label}</span>
                <span
                  className={[
                    "h-px w-7 bg-[var(--china-red)] transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  ].join(" ")}
                />
              </Link>
            );
          })}

          <Link
            href="/#mission"
            onClick={() => setIsMenuOpen(false)}
            className="mt-6 inline-flex w-fit border border-white/15 px-5 py-3 text-sm font-semibold text-[var(--star-white)] transition-colors duration-300 hover:border-[rgba(217,31,47,0.58)]"
          >
            启动任务
          </Link>
        </div>
      </div>
    </header>
  );
}
