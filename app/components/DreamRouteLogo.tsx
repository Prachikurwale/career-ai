import Link from "next/link";

type DreamRouteLogoProps = {
  href?: string;
  compact?: boolean;
};

export default function DreamRouteLogo({
  href = "/",
  compact = true,
}: DreamRouteLogoProps) {
  const content = (
    <div className="flex items-center gap-3">
      <svg
        viewBox="0 0 84 84"
        aria-hidden="true"
        className={compact ? "h-11 w-11 shrink-0" : "h-16 w-16 shrink-0"}
      >
        <defs>
          <linearGradient id="dreamroute-road" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#20b7f4" />
            <stop offset="55%" stopColor="#386df6" />
            <stop offset="100%" stopColor="#7d35df" />
          </linearGradient>
          <linearGradient id="dreamroute-star" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd95c" />
            <stop offset="100%" stopColor="#ff7b22" />
          </linearGradient>
        </defs>
        <path
          d="M14 68c5-12 18-13 28-18 13-7 18-18 13-26-4-7-1-13 11-22-6 13-2 21 7 28 10 8 12 17 4 29-7 11-8 18 1 24H42c-12-4-21-6-28-15Z"
          fill="url(#dreamroute-road)"
        />
        <path
          d="M37 72c4-18 14-18 22-25 8-6 8-13 1-19 3 8 0 13-8 18-10 6-17 9-22 26h7Z"
          fill="#5322ba"
          opacity="0.42"
        />
        <path
          d="M32 69c4-10 12-14 18-18 10-6 14-13 10-22"
          fill="none"
          stroke="#fff"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M40 61l4-2m6-4 4-2m6-5 3-2m3-4 2-2"
          fill="none"
          stroke="#fff"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M63 6l2.8 7.2L73 16l-7.2 2.8L63 26l-2.8-7.2L53 16l7.2-2.8L63 6Z"
          fill="url(#dreamroute-star)"
        />
        <circle cx="77" cy="10" r="1.6" fill="#ffbf3e" />
        <circle cx="74" cy="24" r="1.9" fill="#ffbf3e" />
        <circle cx="52" cy="10" r="1.9" fill="#ffbf3e" />
        <circle cx="48" cy="21" r="1.4" fill="#ff9f1c" />
      </svg>

      <div className="leading-none">
        <div className="text-[1.7rem] font-black tracking-tight">
          <span className="bg-gradient-to-r from-sky-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">
            DreamRoute
          </span>
        </div>
        {!compact ? (
          <div className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
            Turn Dreams into Careers
          </div>
        ) : (
          <div className="mt-0.5 text-[11px] font-semibold tracking-[0.18em] text-slate-500 dark:text-slate-400">
            DREAMS INTO CAREERS
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Link href={href} className="flex items-center">
      {content}
    </Link>
  );
}
