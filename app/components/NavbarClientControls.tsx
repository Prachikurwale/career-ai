"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Globe, LayoutDashboard, LogIn } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageDropdown from "./LanguageDropdown";
import { signInToDashboard } from "@/actions/auth";
import { parseLanguageCode } from "@/lib/i18n";
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
  const language = parseLanguageCode(searchParams.get("lang")) ?? DEFAULT_LANGUAGE;
  const isHome = pathname === "/";
  const isDashboard = pathname === "/dashboard";
  const showLanguage = isLoggedIn && isDashboard;
  const showLogin = !isLoggedIn && pathname !== "/login";
  const showDashboard = isLoggedIn && isHome;

  const updateLanguage = (nextLanguage: LanguageCode) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLanguage);
    window.localStorage.setItem("career-ai-language", nextLanguage);
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      {showDashboard ? (
        <Link
          href={`/dashboard?lang=${language}`}
          className="inline-flex items-center gap-2 rounded-full bg-[#329d9c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#108c8a]"
        >
          <LayoutDashboard size={16} />
          <span>Dashboard</span>
        </Link>
      ) : null}

      {showLanguage ? (
        <div className="flex items-center gap-2 rounded-2xl border border-[#329d9c] bg-white px-2 py-1.3 dark:border-slate-700 dark:bg-slate-900">
          <Globe className="h-4 w-4 text-pink-500 dark:text-slate-300" />
          <LanguageDropdown value={language} onChange={updateLanguage} className="border-0 px-1 py-1  " />
        </div>
      ) : null}

      <ThemeToggle />

      {showLogin ? (
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full bg-[#329d9c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#2a8483]"
        >
           
          <span>Login</span>
        </Link>
      ) : null}

      {!isLoggedIn && pathname === "/login" ? (
        <form action={signInToDashboard}>
          <button className="inline-flex items-center gap-2 rounded-full bg-[#329d9c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#068582]">
         
            <span>Login</span>
          </button>
        </form>
      ) : null}
    </div>
  );
}
