"use client";

import { useState } from "react";
import CareerQuiz from "./CareerQuiz";

export default function DashboardClient() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  if (selectedLevel) {
    return (
      <div className="space-y-6">
        <button 
          onClick={() => setSelectedLevel(null)} 
          className="text-slate-500 hover:text-blue-600 font-medium flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>
        <CareerQuiz level={selectedLevel} />
      </div>
    );
  }

  return (
    <div className="text-center space-y-4">
      <h3 className="text-xl font-bold text-slate-700 italic">Select your current stage to start the AI Quiz:</h3>
      <div className="grid md:grid-cols-3 gap-6">
        
        <button onClick={() => setSelectedLevel("10th (S.S.C)")} className="group bg-white p-8 rounded-3xl border-2 border-transparent hover:border-blue-500 transition-all shadow-sm hover:shadow-xl">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform"></div>
          <h4 className="text-2xl font-black text-slate-800">10th (S.S.C)</h4>
          <p className="text-slate-500 mt-2 text-sm">ITI, Diplomas, or 12th Streams</p>
        </button>

        <button onClick={() => setSelectedLevel("12th (H.S.C)")} className="group bg-white p-8 rounded-3xl border-2 border-transparent hover:border-blue-500 transition-all shadow-sm hover:shadow-xl">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform"></div>
          <h4 className="text-2xl font-black text-slate-800">12th (H.S.C)</h4>
          <p className="text-slate-500 mt-2 text-sm">Degree, Medical, or Defense</p>
        </button>

        <button onClick={() => setSelectedLevel("Graduation")} className="group bg-white p-8 rounded-3xl border-2 border-transparent hover:border-blue-500 transition-all shadow-sm hover:shadow-xl">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎓</div>
          <h4 className="text-2xl font-black text-slate-800">Graduation</h4>
          <p className="text-slate-500 mt-2 text-sm">Masters, Jobs, or PhD</p>
        </button>

      </div>
    </div>
  );
}