"use client";

import { useState } from "react";
import { getCareerGuidance } from "../../actions/career-ai";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function CareerQuiz({ level }: { level: string }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  
  const questions = [
    {
      q: "Which subject do you enjoy the most?",
      options: ["Maths", "Science", "Arts/Design", "Computers", "Social Work"],
    },
    {
      q: "What kind of work environment do you prefer?",
      options: ["Office/Desk", "Field Work/Outdoors", "Technical/Hands-on", "Hospital/Clinic", "Defense/Uniform"],
    },
    {
      q: "What is your primary goal?",
      options: ["High Salary", "Government Job", "Creative Freedom", "Helping People", "Technical Expertise"],
    },
  ];

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
       
      setLoading(true);
      const prompt = `User has completed ${level}. Their interests are: ${newAnswers.join(", ")}. 
      Based on the career chart logic, suggest 3 specific paths. 
      Include: Duration, Estimated Fees, Top Colleges, and Future Scope (Masters/Jobs).`;
      
      try {
        const aiResponse = await getCareerGuidance(prompt);
        setResult(aiResponse);
      } catch (error) {
        setResult("Error connecting to AI. Please check your NVIDIA API Key.");
      } finally {
        setLoading(false);
      }
    }
  };

  if (result) {
    return (
      <div className="bg-white p-8 rounded-3xl border shadow-xl animate-in fade-in zoom-in duration-300">
        <div className="flex items-center gap-2 text-green-600 font-bold mb-4">
          <CheckCircle2 /> AI Generated Roadmap for {level}
        </div>
        <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700 leading-relaxed">
          {result}
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-8 text-blue-600 font-bold hover:underline"
        >
          ← Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-10 rounded-3xl border shadow-xl max-w-2xl mx-auto">
      <div className="mb-8">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Question {step + 1} of {questions.length}</span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">{questions[step].q}</h2>
      </div>

      <div className="grid gap-4">
        {questions[step].options.map((opt) => (
          <button
            key={opt}
            disabled={loading}
            onClick={() => handleAnswer(opt)}
            className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-slate-700 flex justify-between items-center group"
          >
            {opt}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </button>
        ))}
      </div>

      {loading && (
        <div className="mt-8 flex items-center justify-center gap-2 text-blue-600 font-medium">
          <Loader2 className="animate-spin" /> Analyzing career charts...
        </div>
      )}
    </div>
  );
}