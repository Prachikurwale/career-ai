import Link from "next/link";
import Image from "next/image";
import { LogIn, LogOut } from "lucide-react";
import { auth, signIn, signOut } from "../../auth";
import ThemeToggle from "./ThemeToggle";
import NavbarClientControls from "./NavbarClientControls";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/95 md:px-8">
      <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-sky-400">
        CareerAI
      </Link>
      <div className="flex flex-wrap items-center justify-end gap-3">
        <NavbarClientControls isLoggedIn={Boolean(session)} />
        <ThemeToggle />

        {session ? (
          <div className="flex items-center gap-3">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                className="h-8 w-8 rounded-full border"
                alt="profile"
                width={32}
                height={32}
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                {session.user?.name?.charAt(0)}
              </div>
            )}
            <form action={async () => { "use server"; await signOut({ redirectTo: "/" }); }}>
              <button className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-950/60">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </form>
          </div>
        ) : (
          <form action={async () => { "use server"; await signIn("google", { redirectTo: "/dashboard" }); }}>
            <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 dark:bg-sky-500 dark:hover:bg-sky-400">
              <LogIn size={16} />
              <span>Login</span>
            </button>
          </form>
        )}
      </div>
    </nav>
  );
}
