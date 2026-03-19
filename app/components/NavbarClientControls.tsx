"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { House, LayoutDashboard } from "lucide-react";
import LanguageDropdown from "./LanguageDropdown";
import { getTranslation, parseLanguageCode } from "../../lib/i18n";
import type { LanguageCode } from "../../types/career";

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
  const searchParamsString = searchParams.toString();
  const language = parseLanguageCode(searchParams.get("lang")) ?? DEFAULT_LANGUAGE;
  const t = getTranslation(language);

  const updateLanguage = (nextLanguage: LanguageCode) => {
    const params = new URLSearchParams(searchParamsString);
    params.set("lang", nextLanguage);
    window.localStorage.setItem("career-ai-language", nextLanguage);
    const nextQuery = params.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-3">
      <LanguageDropdown value={language} onChange={updateLanguage} />

      <Link
        href={`/?lang=${language}`}
        className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-sky-300"
      >
        <House size={16} />
        <span>{t.home}</span>
      </Link>

      {isLoggedIn ? (
        <Link
          href={`/dashboard?lang=${language}`}
          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-sky-300"
        >
          <LayoutDashboard size={16} />
          <span>{t.dashboard}</span>
        </Link>
      ) : null}
    </div>
  );
}
