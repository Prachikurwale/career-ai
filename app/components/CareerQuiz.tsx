"use client";

import { useState } from "react";
import { getCareerGuidance } from "../../actions/career-ai";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";

export default function CareerQuiz({ level }: { level: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // --- NEW: Specific Questions for 10th Passed Students ---
  const questions10th = [
    {
      q: "What is your main interest after 10th?",
      options: ["Technical/Machines", "Government/Defense", "Medical/Lab", "Computer/Digital", "Agriculture/Arts"],
    },
    {
      q: "How many years do you want to study right now?",
      options: ["Short term (6 months - 1 year)", "Medium (2 years ITI)", "Long term (3 years Diploma)"],
    },
    {
      q: "What kind of job role excites you?",
      options: ["Field Work (Police/Army)", "Workshop (Fitter/Welder)", "Office (Data Entry/DTP)", "Hospital (Lab Tech)"],
    },
  ];

  const questions = questions10th; // Currently focused on 10th logic

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setLoading(true);
      
      // --- NEW: Targeted Prompt for 10th Career Charts ---
      const prompt = `
        User has passed 10th Grade. 
        Interests: ${newAnswers.join(", ")}.
        
        Strictly suggest paths from this list based on their interests:
        - Engineering Diploma (Computer, Civil, Mech)
        - Defense: Police Constable, Airmen, Navy Soldier
        - ITI: Fitter, Welder, Machinist, Diesel Mechanic
        - Computer: MS-CIT, Data Entry Operator, Digital Marketing, DTP
        - Medical/Specialized: DMLT/BMLT (Lab Tech), Fire and Safety, Art Teacher Diploma
        - Agriculture: Diploma in Agriculture Management (Animal Husbandry)
        - Fitness: Personal Fitness Trainer
        
        Provide a roadmap for the top 2 matches including Duration, Top Colleges, and starting Salary.
      `;
      
      try {
        const aiResponse = await getCareerGuidance(prompt);
        setResult(aiResponse);
      } catch {
        setResult("AI is busy. Please try again!");
      } finally {
        setLoading(false);
      }
    }
  };

  if (result) {
    return (
      <div className="bg-white p-8 rounded-3xl border shadow-xl animate-in fade-in zoom-in duration-300 max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-blue-600 font-bold mb-6 text-xl">
          <CheckCircle2 /> 10th Post-SSC Career Roadmap
        </div>
        <div className="prose prose-blue max-w-none text-slate-700 leading-relaxed bg-slate-50 p-6 rounded-2xl border border-blue-100">
          {result.split('\n').map((line, i) => (
            <p key={i} className="mb-2">{line}</p>
          ))}
        </div>
        <button onClick={() => window.location.reload()} className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
          Take Another Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl border shadow-2xl max-w-2xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
        <div 
          className="h-full bg-blue-600 transition-all duration-500" 
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="mb-10 text-center">
        <span className="bg-blue-50 text-blue-700 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
          {level || "10th"} Standard Career Path
        </span>
        <h2 className="text-3xl font-extrabold text-slate-900 mt-4 leading-tight">
          {questions[step].q}
        </h2>
      </div>

      <div className="grid gap-4">
        {questions[step].options.map((opt) => (
          <button
            key={opt}
            disabled={loading}
            onClick={() => handleAnswer(opt)}
            className="group w-full text-left p-6 rounded-2xl border-2 border-slate-100 hover:border-blue-600 hover:bg-blue-50 transition-all flex justify-between items-center"
          >
            <span className="font-bold text-slate-700 group-hover:text-blue-700 text-lg">{opt}</span>
            <ArrowRight className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
          </button>
        ))}
      </div>

      {loading && (
        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-blue-600">
          <Loader2 className="animate-spin w-10 h-10" />
          <p className="font-bold animate-pulse">Analyzing ITI, Diploma & Defense paths...</p>
        </div>
      )}
    </div>
  );
}
