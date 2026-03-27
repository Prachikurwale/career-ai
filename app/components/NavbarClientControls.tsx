"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Globe, LayoutDashboard, Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageDropdown from "./LanguageDropdown";
import { signInToDashboard } from "@/actions/auth";
import { getTranslation, parseLanguageCode } from "@/lib/i18n";
import { useMobileMenu } from "./MobileMenuContext";
import type { LanguageCode } from "@/types/career";

type NavbarClientControlsProps = {
  isLoggedIn: boolean;
};

const DEFAULT_LANGUAGE: LanguageCode = "english";

export default function NavbarClientControls({
  isLoggedIn,
}: NavbarClientControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isSidebarOpen, setIsSidebarOpen } = useMobileMenu();
  const language = parseLanguageCode(searchParams.get("lang")) ?? DEFAULT_LANGUAGE;
  const t = getTranslation(language);
  const isHome = pathname === "/";
  const isDashboard = pathname === "/dashboard";
  const showLanguage = isLoggedIn && isDashboard;
  const showLogin = !isLoggedIn && pathname !== "/login";
  const showDashboard = isLoggedIn && isHome;
  const showMenuButton = isLoggedIn && isDashboard;

  const updateLanguage = (nextLanguage: LanguageCode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLanguage);
    window.localStorage.setItem("career-ai-language", nextLanguage);
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="flex items-right justify-end w-full gap-3 md:justify-end">
       {showMenuButton && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg bg-[#329d9c] text-white transition hover:opacity-90 dark:bg-slate-700 shadow-sm"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      
      <div className="flex flex-wrap items-center justify-end gap-3">
        {showDashboard ? (
          <Link
            href={`/dashboard?lang=${language}`}
            className="inline-flex items-center gap-2 rounded-full bg-[#329d9c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#108c8a]"
          >
            <LayoutDashboard size={16} />
            <span>{t.dashboard}</span>
          </Link>
        ) : null}

        {showLanguage ? (
          <div className="hidden md:flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1.5 dark:border-slate-700 dark:bg-slate-900">
            <Globe className="h-5 w-5 text-pink-500 dark:text-slate-300 ml-1" />
            <LanguageDropdown value={language} onChange={updateLanguage} />
          </div>
        ) : null}

        <div className="hidden md:block">
          <ThemeToggle />
        </div>

        {showLogin ? (
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-[#329d9c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#2a8483]"
          >
            <span>{t.login}</span>
          </Link>
        ) : null}

        {!isLoggedIn && pathname === "/login" ? (
          <form action={signInToDashboard}>
            <button className="inline-flex items-center gap-2 rounded-full bg-[#329d9c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#068582]">
              <span>{t.login}</span>
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}
