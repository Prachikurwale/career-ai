"use client";

import type { LanguageCode } from "../../types/career";
import { languageOptions } from "../../lib/i18n";

type LanguageDropdownProps = {
  value: LanguageCode;
  onChange: (language: LanguageCode) => void;
  className?: string;
};

export default function LanguageDropdown({
  value,
  onChange,
  className = "",
}: LanguageDropdownProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as LanguageCode)}
      aria-label="Select language"
      className={`bg-transparent border-0 text-sm font-semibold text-slate-700 dark:text-slate-200 outline-none cursor-pointer px-2 py-1 rounded transition ${className}`.trim()}
    >
      {languageOptions.map((option) => (
        <option key={option.id} value={option.id} className="text-slate-900 dark:text-slate-100">
          {option.nativeLabel}
        </option>
      ))}
    </select>
  );
}
