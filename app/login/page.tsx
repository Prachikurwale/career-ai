import { ArrowRight, Check, Eye, Lock, Mail } from "lucide-react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { signInToDashboard } from "@/actions/auth";
 

const highlights = [
  "AI-powered resume matching",
  "Direct connect with top recruiters",
  "Salary insights and career growth tools",
];

function GoogleBadge() {
  return (
    <span className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 p-0.5">
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="h-full w-full"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
        />
        <path
          fill="#FBBC05"
          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        />
        <path fill="none" d="M0 0h48v48H0z" />
      </svg>
    </span>
  );
}

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#eef4ff] px-4 py-8 sm:px-6 lg:px-8 dark:bg-slate-950">
      <div className="mx-auto grid min-h-[calc(100vh-9rem)] max-w-6xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(37,99,235,0.12)] dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[1fr_0.95fr]">
        <section className="flex items-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
          <div className="w-full max-w-md">
            <div className="space-y-3">
              <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                Welcome Back
              </h1>
              <p className="text-base text-slate-500 dark:text-slate-300 sm:text-lg">
                Continue your journey to your dream career.
              </p>
            </div>

            <form action={signInToDashboard} className="mt-10 space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  Email Address
                </label>
                <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-slate-700 dark:bg-slate-950">
                  <Mail className="h-5 w-5 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    className="w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-bold text-slate-700 dark:text-slate-200">
                    Password
                  </label>
                  <button
                    type="button"
                    className="text-sm font-semibold text-[#329d9c] transition hover:text-[#056e6d]"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:border-slate-700 dark:bg-slate-950">
                  <Lock className="h-5 w-5 text-slate-400" />
                  <input
                    id="password"
                    type="password"
                    placeholder="........"
                    className="w-full bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400 dark:text-slate-200"
                  />
                 
                </div>
              </div>

              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#329d9c] text-lg font-extrabold text-white shadow-[0_14px_24px_rgba(33,107,233,0.28)] transition hover:bg-[#0a8583]"
              >
                <span>Sign In</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            <div className="mt-9 flex items-center gap-4 text-xs font-bold uppercase tracking-[0.28em] text-slate-400">
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
              <span>Or Log In With</span>
              <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
            </div>

            <form action={signInToDashboard} className="mt-6">
              <button
                type="submit"
                className="flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-base font-bold text-slate-700 transition hover:border-[#066e6d] hover:text-[#329d9c] dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                <GoogleBadge />
                <span>Continue with Google</span>
              </button>
            </form>
          </div>
        </section>

        <aside className="relative overflow-hidden bg-[#329d9c] px-6 py-10 text-white sm:px-10 lg:px-12">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-y-0 left-0 w-px bg-white/20" />

          <div className="relative flex h-full flex-col justify-between">
            <div>
              <div className="max-w-md space-y-4">
                <h2 className="text-4xl font-black leading-tight sm:text-5xl">
                  New to CareerPath?
                </h2>
                <p className="text-lg leading-8 text-[#010320]">
                  Join over 100,000+ professionals finding their next big break. Create your
                  profile and get personalized job recommendations today.
                </p>
              </div>

              <div className="mt-10 space-y-5">
                {highlights.map((item) => (
                  <div key={item} className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 ring-1 ring-white/20">
                      <Check className="h-4 w-4" />
                    </span>
                    <span className="text-lg font-semibold text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <form action={signInToDashboard}>
                <button
                  type="submit"
                  className="flex h-14 w-full items-center justify-center rounded-2xl bg-white px-6 text-lg font-extrabold text-[#329d9c]  hover:text-[#ffffff] transition hover:bg-[#029491]"
                >
                  Create Free Account
                </button>
              </form>
              <p className="mx-auto mt-5 max-w-sm text-center text-sm leading-6 text-[#050232]">
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
