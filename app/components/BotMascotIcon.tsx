"use client";

type BotMascotIconProps = {
  className?: string;
};

export default function BotMascotIcon({ className = "h-6 w-6" }: BotMascotIconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 9C24 4.58172 27.5817 1 32 1C36.4183 1 40 4.58172 40 9V11H24V9Z"
        fill="#329d9c"
      />
      <path
        d="M20 12C12.268 12 6 18.268 6 26V36C6 45.9411 14.0589 54 24 54H40C49.9411 54 58 45.9411 58 36V26C58 18.268 51.732 12 44 12H20Z"
        fill="#FAF8F3"
        stroke="#151933"
        strokeWidth="2.5"
      />
      <rect x="15" y="20" width="34" height="18" rx="9" fill="#9DE7F7" stroke="#151933" strokeWidth="2.5" />
      <circle cx="24" cy="29" r="3.5" fill="#151933" />
      <circle cx="40" cy="29" r="3.5" fill="#151933" />
      <path d="M27 41H37C37 44.3137 34.3137 47 31 47H33C29.6863 47 27 44.3137 27 41Z" fill="#151933" />
      <path
        d="M16 42V50C16 53.3137 18.6863 56 22 56H24"
        stroke="#151933"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M48 42V50C48 53.3137 45.3137 56 42 56H40"
        stroke="#151933"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M26 54V60C26 61.6569 27.3431 63 29 63H35C36.6569 63 38 61.6569 38 60V54"
        fill="#FAF8F3"
      />
      <path
        d="M26 54V60C26 61.6569 27.3431 63 29 63H35C36.6569 63 38 61.6569 38 60V54"
        stroke="#151933"
        strokeWidth="2.5"
      />
      <path d="M10 18V10" stroke="#151933" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M54 18V10" stroke="#151933" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="10" cy="8" r="2.5" fill="#151933" />
      <circle cx="54" cy="8" r="2.5" fill="#151933" />
      <circle cx="7" cy="22" r="4" fill="#151933" />
      <circle cx="57" cy="22" r="4" fill="#151933" />
    </svg>
  );
}
