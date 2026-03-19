"use client";

type StepCardProps = {
  title: string;
  description: string;
  badge?: string;
  icon?: string;
  onClick?: () => void;
  selected?: boolean;
};

export default function StepCard({
  title,
  description,
  badge,
  icon,
  onClick,
  selected = false,
}: StepCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-[28px] border p-6 text-left transition ${
        selected
          ? "border-blue-500 bg-blue-50 shadow-lg dark:border-sky-400 dark:bg-slate-900"
          : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-400"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          {badge ? (
            <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {badge}
            </span>
          ) : null}
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
          </div>
        </div>
        {icon ? (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white dark:bg-slate-800">
            {icon}
          </div>
        ) : null}
      </div>
    </button>
  );
}
