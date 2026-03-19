import Link from "next/link";
import { Bot, ChevronRight, Sparkles, Stars } from "lucide-react";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.16),_transparent_28%),linear-gradient(180deg,#f7fbff_0%,#eef5ff_42%,#ffffff_100%)] px-5 py-12 dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_28%),linear-gradient(180deg,#020617_0%,#071226_48%,#020617_100%)] md:px-8">
      <section className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur dark:border-sky-900 dark:bg-slate-900/80 dark:text-sky-300">
            <Stars className="h-4 w-4" />
            <span>Career guidance for students after 10th, 12th, and graduation</span>
          </div>

          <h1 className="mt-8 text-5xl font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            Find the Right Career Path for Your Future
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
            Explore clear, structured career roadmaps for students after 10th, 12th,
            and graduation. Make confident decisions with the right guidance.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {session ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-blue-600 px-8 py-4 text-lg font-extrabold text-white shadow-[0_20px_40px_rgba(37,99,235,0.28)] transition hover:bg-blue-700"
              >
                <span>Go to Dashboard</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-blue-600 px-8 py-4 text-lg font-extrabold text-white shadow-[0_20px_40px_rgba(37,99,235,0.28)] transition hover:bg-blue-700"
              >
                <span>Start Your Career Journey</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            )}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              "Structured roadmaps after 10th, 12th, and graduation",
              "Saved reports and dashboard-based progress tracking",
              "Clean guidance flow with login, language, and theme controls",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/75"
              >
                <p className="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-x-[12%] top-[14%] h-56 rounded-full bg-blue-200/50 blur-3xl dark:bg-sky-500/20" />
          <div className="relative w-full max-w-xl rounded-[36px] border border-slate-200 bg-white/90 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.28em] text-blue-600 dark:text-sky-300">
                  CareerAI
                </p>
                <h2 className="mt-3 text-3xl font-black text-slate-900 dark:text-white">
                  Guided. Visual. Confident.
                </h2>
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-lg">
                <Sparkles className="h-8 w-8" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {[
                "Choose your current level",
                "Pick the best path for your goals",
                "Generate and save AI reports inside your dashboard",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-black text-white dark:bg-sky-500">
                    0{index + 1}
                  </div>
                  <p className="text-base font-semibold text-slate-700 dark:text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    
    </main>
  );
}
