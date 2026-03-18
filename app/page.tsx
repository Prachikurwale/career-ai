import { auth, signIn } from "../auth";
import { GraduationCap, School, BookOpen } from "lucide-react";
import DashboardClient from "./components/DashboardClient"; 

export default async function Home() {
  const session = await auth();


  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50">
        <section className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Design Your Future with <span className="text-blue-600">AI Logic</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            From 10th S.S.C to Graduation and beyond—get personalized roadmaps, 
            fee estimates, and top college suggestions based on real career charts.
          </p>
          <form action={async () => { "use server"; await signIn("google"); }}>
            <button className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-blue-700 shadow-lg transition-all transform hover:scale-105">
              Start My Free Career Quiz
            </button>
          </form>
        </section>

        <section id="about" className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-black">
          <div className="bg-white p-8 rounded-3xl shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600"><School /></div>
            <h3 className="font-bold text-xl mb-2">Schooling (10th/12th)</h3>
            <p className="text-slate-500 text-sm">Detailed paths for ITI, Diplomas, or Science/Commerce/Arts streams.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border text-black">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-4 text-green-600"><GraduationCap /></div>
            <h3 className="font-bold text-xl mb-2">Professional Degrees</h3>
            <p className="text-slate-500 text-sm">Full deep-dive into Engineering, Medical, C.A., and Creative Arts.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4 text-purple-600"><BookOpen /></div>
            <h3 className="font-bold text-xl mb-2">Cost & Roadmap</h3>
            <p className="text-slate-500 text-sm">Year-by-year skills, fee estimates, and top college recommendations.</p>
          </div>
        </section>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="flex items-center gap-4 bg-white p-6 rounded-3xl border shadow-sm">
          {session.user?.image ? (
            <img src={session.user.image} className="w-16 h-16 rounded-full border-2 border-blue-500 p-0.5" alt="profile" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold uppercase">
              {session.user?.name?.charAt(0)}
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome, {session.user?.name}!</h2>
            <p className="text-slate-500 text-sm">{session.user?.email}</p>
          </div>
        </header>

      
        <DashboardClient />
      </div>
    </div>
  );
}