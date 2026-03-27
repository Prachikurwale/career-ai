import Link from "next/link";
import { Bot, ChevronRight } from "lucide-react";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#fbfdff_0%,#f3f8ff_42%,#ffffff_100%)] px-4 py-8 sm:px-5 sm:py-12 md:px-8 dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.14),_transparent_28%),linear-gradient(180deg,#020617_0%,#071226_48%,#020617_100%)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-70 dark:hidden"
        style={{
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.78)' stroke-width='2'%3E%3Cpath d='M0 40L90 0L190 26L255 92L125 120L0 102Z'/%3E%3Cpath d='M0 155L120 120L180 220L88 330L0 360Z'/%3E%3Cpath d='M1230 660L1440 610L1600 660L1600 900L1360 860L1260 760Z'/%3E%3Cpath d='M1320 760L1470 720L1600 780'/%3E%3Cpath d='M55 0L125 120L180 220'/%3E%3Cpath d='M1440 610L1360 760'/%3E%3C/g%3E%3C/svg%3E"),
            radial-gradient(circle at center, rgba(255,255,255,0.94) 0%, rgba(238,248,255,0.82) 48%, rgba(186,230,253,0.52) 100%),
            linear-gradient(135deg, rgba(186,230,253,0.9) 0%, rgba(239,246,255,0.92) 42%, rgba(191,219,254,0.9) 100%)
          `,
          backgroundSize: "cover, auto, auto",
          backgroundPosition: "center, center, center",
        }}
      />
      <div className="absolute inset-0 bg-white/32 dark:hidden" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.05),_transparent_28%)] dark:hidden" />
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-6 sm:gap-10 lg:grid-cols-[1.1fr_0.9fr] px-4 sm:px-4 md:px-6">
        <div className="max-w-3xl">
         

          <h1 className="mt-1 text-3xl sm:text-5xl font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Find the Right Career Path for Your Future
          </h1>

          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-slate-600 dark:text-slate-300 md:text-xl">
            Explore clear, structured career roadmaps for students after 10th, 12th,
            and graduation. Make confident decisions with the right guidance.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            {session ? (
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#329d9c] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-extrabold text-white shadow-[0_20px_40px_rgba(37,99,235,0.28)] transition hover:bg-[#057b79]"
              >
                <span>Go to Dashboard</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#329d9c] px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-extrabold text-white shadow-[0_20px_40px_rgba(37,99,235,0.28)] transition hover:bg-[#016e6d]"
              >
                <span>Start Your Career Journey</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            )}
          </div>

          <div className="mt-12 grid gap-3 sm:gap-4 sm:grid-cols-3">
            {[
              "Structured roadmaps after 10th, 12th, and graduation",
              "Saved reports and dashboard-based progress tracking",
              "Clean guidance flow with login, language, and theme controls",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[20px] sm:rounded-[25px] border border-slate-200 bg-white/85 p-4 sm:p-5 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/75"
              >
                <p className="text-xs sm:text-sm font-semibold leading-5 sm:leading-6 text-slate-700 dark:text-slate-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative w-full flex items-center justify-center px-0 sm:px-2 md:px-0">
          <div className="relative w-full border-0 sm:border border-slate-200 bg-white/90 shadow-none sm:shadow-[0_30px_80px_rgba(15,23,42,0.12)] p-4 sm:p-4 md:p-8 rounded-xl sm:rounded-[36px] backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div>
                <p className="text-xs sm:text-sm font-black uppercase tracking-[0.28em] text-[#329d9c] dark:text-sky-300">
                  Dream Route
                </p>
                <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  Guided. Visual. Confident.
                </h2>
              </div>
              
            </div>

            <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
              {[
                "Choose your current level",
                "Pick the best path for your goals",
                "Generate and save AI reports inside your dashboard",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 sm:gap-4 rounded-[20px] sm:rounded-[24px] border border-slate-200 bg-slate-50 px-4 sm:px-5 py-3 sm:py-4 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex h-9 sm:h-10 w-9 sm:w-10 items-center justify-center shrink-0 rounded-3xl bg-[#329d9c] text-xs sm:text-sm font-black text-white dark:bg-sky-500">
                    0{index + 1}
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    
    </main>
  );
}
