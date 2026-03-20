"use client";

import {
  Download,
  GraduationCap,
  IndianRupee,
  Lightbulb,
  Route,
} from "lucide-react";
import { getTranslation } from "../../lib/i18n";
import type { CareerReport, LanguageCode } from "../../types/career";

type ReportViewerProps = {
  language: LanguageCode;
  report: CareerReport;
  onSave?: () => void;
  onExport?: () => void;
  saveDisabled?: boolean;
  saveLabel?: string;
  titleSuffix?: string;
};

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h4 className="text-sm font-black uppercase tracking-[0.25em] text-slate-700 dark:text-slate-400">{title}</h4>
      <div className="mt-4 flex flex-wrap gap-3">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

export default function ReportViewer({
  language,
  report,
  onSave,
  onExport,
  saveDisabled,
  saveLabel,
  titleSuffix,
}: ReportViewerProps) {
  const t = getTranslation(language);

  return (
    <div id="roadmap-print-root" className="space-y-6 print:space-y-4">
      <section className="rounded-xl border border-blue-400 bg-linear-to-br from-sky-800 via-blue to-cyan-90 p-10 shadow-sm print:rounded-none print:bg-slate-950 print:p-0 print:shadow-none">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-300">
              {t.aiMasterReport}
            </p>
            <h2 className="mt-3 text-4xl font-black leading-tight">
              {report.title}
              {titleSuffix ? <span className="block text-sky-300">{titleSuffix}</span> : null}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
              {t.duration}: {report.duration}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 print:hidden">
            {onSave ? (
              <button
                type="button"
                onClick={onSave}
                disabled={saveDisabled}
                className="rounded-full bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {saveLabel ?? t.saveReport}
              </button>
            ) : null}
            {onExport ? (
              <button
                type="button"
                onClick={onExport}
                className="inline-flex items-center gap-1 rounded-full border border-white/20 bg-white/10 px-10 py-2 text-sm font-bold text-[#5f034b] transition hover:bg-white/20"
              >
                <Download size={18}  />
                <span>{t.exportPdf}</span>
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr] print:grid-cols-1">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 print:break-inside-avoid print:rounded-[24px] print:shadow-none">
          <div className="flex items-center gap-2 text-sky-700">
            <GraduationCap size={18} />
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{t.semesterBreakdown}</h3>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {report.semester_breakdown.map((semester) => (
              <article
                key={semester.semester}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
              >
                <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  {t.semester} {semester.semester}
                </p>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {semester.subjects.map((subject) => (
                    <li key={subject}>- {subject}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-xl border bg-[#f3f3f3] border-emerald-100 dark:bg-[#01012b] p-6 shadow-sm print:break-inside-avoid print:rounded-[24px] print:shadow-none">
            <div className="flex items-center gap-2 text-emerald-700">
              <IndianRupee size={21}   />
              <h3 className="text-lg font-black text-slate-900 dark:text-white">{t.feesAndSalary}</h3>
            </div>
            <div className="mt-5 space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <div>
                <p className="font-black text-slate-900 dark:text-slate-100">{t.government}</p>
                <p>{report.fees.government}</p>
              </div>
              <div>
                <p className="font-black text-slate-900 dark:text-slate-100">{t.private}</p>
                <p>{report.fees.private}</p>
              </div>
              <div>
                <p className="font-black text-slate-900 dark:text-slate-100">{t.fresher2026}</p>
                <p>{report.salary_2026.fresher}</p>
              </div>
              <div>
                <p className="font-black text-slate-900 dark:text-slate-100">{t.midLevelGrowth}</p>
                <p>{report.salary_2026.mid_level}</p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border bg-[#f3f3f3] border-sky-100 dark:bg-[#01102d] p-6 shadow-sm print:break-inside-avoid print:rounded-[24px] print:shadow-none">
            <div className="flex items-center gap-2 text-gray-800">
              
              <h3 className="text-lg font-black text-black- dark:text-slate-100">{t.skillSynergy}</h3>
            </div>
            <div className="mt-5 space-y-4 text-sm leading-7 text-gray-800 dark:text-slate-300">
              <div>
                <p className="font-black text-gray-800 dark:text-slate-100">{t.frontend}</p>
                <p>{report.skill_synergy.frontend}</p>
              </div>
              <div>
                <p className="font-black text-gray-800 dark:text-slate-100">{t.ai}</p>
                <p>{report.skill_synergy.ai}</p>
              </div>
              <div>
                <p className="font-black text-gray-800 dark:text-slate-100">{t.design}</p>
                <p>{report.skill_synergy.design}</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <ListBlock title={t.topColleges} items={report.top_colleges_maharashtra} />
      <ListBlock title={t.careerOpportunities} items={report.career_opportunities} />
      <ListBlock title={t.skillsRequired} items={report.skills_required} />

      <section className="rounded-xl border border-[#bdb5b5] bg-[#f9f9f9]  dark:bg-[#180128] p-6 shadow-sm print:break-inside-avoid print:shadow-none">
        <div className="flex items-center gap-2 text-amber-700">
          <Route size={18} />
          <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{t.growthPath}</h3>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {report.growth_path.map((step) => (
            <div
              key={step}
              className="rounded-2xl border border-amber-100 bg-white px-4 py-4 text-sm font-medium leading-6 text-slate-700 dark:border-amber-900/40 dark:bg-slate-900 dark:text-slate-300"
            >
              {step}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 print:break-inside-avoid print:shadow-none">
        <div className="flex items-center gap-2 text-violet-700">
          <Lightbulb size={18} />
          <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{t.howToUse}</h3>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{t.howToUseDescription}</p>
      </section>
    </div>
  );
}
