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
      className={`w-full rounded-[22px] border p-5 text-left transition-all duration-200 ${
        selected
          ? "border-[#bfcceb] bg-[#eef4ff] shadow-md ring-2 ring-[#d5e2ff] dark:border-sky-400 dark:bg-slate-900"
          : "border-[#dfe5ef] bg-white hover:-translate-y-0.5 hover:border-[#c2d2f2] hover:bg-[#fbfdff] hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          {badge ? (
            <span className="inline-flex rounded-full bg-[#eef2f8] px-3 py-1 text-[10px] font-black uppercase tracking-[0.32em] text-[#53637d] dark:bg-slate-800 dark:text-slate-300">
              {badge}
            </span>
          ) : null}
          <div>
            <h3 className="text-[17px] font-black text-[#111827] dark:text-slate-100">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-[#5f6f89] dark:text-slate-400">{description}</p>
          </div>
        </div>
        {icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111b31] text-sm font-black text-white dark:bg-slate-800">
            {icon}
          </div>
        ) : null}
      </div>
    </button>
  );
}
