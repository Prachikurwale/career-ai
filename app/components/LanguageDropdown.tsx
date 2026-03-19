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
      className={`rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 ${className}`.trim()}
    >
      {languageOptions.map((option) => (
        <option key={option.id} value={option.id}>
          {option.nativeLabel}
        </option>
      ))}
    </select>
  );
}
