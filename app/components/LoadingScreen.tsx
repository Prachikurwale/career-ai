"use client";

import { Loader2 } from "lucide-react";
import { getTranslation } from "../../lib/i18n";
import type { LanguageCode } from "../../types/career";

type LoadingScreenProps = {
  language: LanguageCode;
};

export default function LoadingScreen({ language }: LoadingScreenProps) {
  const t = getTranslation(language);

  return (
    <div className="rounded-xl border border-blue-400 bg-linear-to-br from-sky-800 via-blue to-cyan-90 p-10 shadow-sm">
      <div className="flex items-center gap-3 text-blue-700">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#329d9c] text-white">
          <Loader2 className="animate-spin" />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-white">
            {t.aiThinking}
          </p>
          <h3 className="text-2xl font-black text-slate-900">{t.generatingReport}</h3>
        </div>
      </div>
      <p className="mt-5 max-w-3xl text-sm leading-7 text-white-600">{t.generatingSubtitle}</p>
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {[t.semesterSyllabus, t.collegeList, t.salaryBenchmarks].map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-white bg-white/90 px-4 py-4 text-sm font-semibold text-slate-700 shadow-sm"
          >
            <div className="flex items-center gap-2 text-sky-600">
              
              <span>{item}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
