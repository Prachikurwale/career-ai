import Link from "next/link";
import { auth } from "@/auth";
import NavbarClientControls from "./NavbarClientControls";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/88 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/88">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="text-2xl font-black tracking-tight text-blue-600 dark:text-sky-400">
          CareerAI
        </Link>
        <NavbarClientControls isLoggedIn={Boolean(session)} />
      </div>
    </nav>
  );
}
