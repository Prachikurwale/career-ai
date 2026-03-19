import Link from "next/link";
import { redirect } from "next/navigation";
import { GraduationCap, School, BookOpen } from "lucide-react";
import { auth, signIn } from "../auth";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="text-6xl font-extrabold leading-tight text-slate-900 dark:text-slate-100">
          CareerAI for <span className="text-blue-600">Indian Students</span>
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-600 dark:text-slate-300">
          A high-performance AI career counseling platform for 10th standard, 12th streams,
          graduates, and postgraduates. Generate structured career roadmaps with Maharashtra and
          Nashik relevance.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <form action={async () => { "use server"; await signIn("google"); }}>
            <button className="rounded-full bg-blue-600 px-10 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-blue-700">
              Start My AI Career Journey
            </button>
          </form>
          <Link
            href="#about"
            className="rounded-full border border-slate-200 bg-white px-8 py-4 text-lg font-bold text-slate-700 transition-all hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-300"
          >
            Explore Features
          </Link>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-6xl gap-8 px-6 py-10 text-black md:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <School />
          </div>
          <h3 className="text-xl font-bold dark:text-slate-100">Interactive Drill-Down</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Students move from level to path to specialization before the AI generates the final
            roadmap.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">
            <GraduationCap />
          </div>
          <h3 className="text-xl font-bold dark:text-slate-100">Deep AI Reports</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Semester-wise subjects, fees, colleges, skills, career opportunities, and 2026 salary
            outlooks.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <BookOpen />
          </div>
          <h3 className="text-xl font-bold dark:text-slate-100">Save and Revisit</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Sign in with Google
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="rounded-[40px] bg-slate-950 p-10 text-white">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-sky-300">
            Platform Flow
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {[
              "Choose current level",
              "Pick the right path",
              "Select specialization",
              "Generate AI master report",
            ].map((item, index) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-black text-sky-300">0{index + 1}</p>
                <p className="mt-3 text-lg font-bold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
