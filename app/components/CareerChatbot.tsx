"use client";

import { FormEvent, useState, useTransition } from "react";
import { Loader2, MessageSquare, Send, User } from "lucide-react";
import { askCareerAssistant } from "../../actions/career-ai";
import { getTranslation } from "../../lib/i18n";
import type { LanguageCode } from "../../types/career";
import BotMascotIcon from "./BotMascotIcon";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts: Record<LanguageCode, string[]> = {
  english: [
    "Which diploma is best after 10th for coding?",
    "Compare ITI Electrician vs Diploma Mechanical in Maharashtra.",
    "Suggest Nashik colleges for B.Sc IT after 12th.",
  ],
  hindi: [
    "10वीं के बाद कोडिंग के लिए सबसे अच्छा डिप्लोमा कौन सा है?",
    "महाराष्ट्र में ITI Electrician और Diploma Mechanical की तुलना करें।",
    "12वीं के बाद B.Sc IT के लिए नाशिक के कॉलेज बताइए।",
  ],
  marathi: [
    "10वी नंतर कोडिंगसाठी कोणता डिप्लोमा सर्वोत्तम आहे?",
    "महाराष्ट्रात ITI Electrician आणि Diploma Mechanical यांची तुलना करा.",
    "12वी नंतर B.Sc IT साठी नाशिकमधील कॉलेज सुचवा.",
  ],
};

type CareerChatbotProps = {
  language: LanguageCode;
  compact?: boolean;
};

export default function CareerChatbot({
  language,
  compact = false,
}: CareerChatbotProps) {
  const t = getTranslation(language);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: t.chatDescription },
  ]);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();

  const submitQuestion = (question: string) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isPending) {
      return;
    }

    setMessages((current) => [...current, { role: "user", content: trimmedQuestion }]);
    setInput("");

    startTransition(async () => {
      try {
        const answer = await askCareerAssistant(trimmedQuestion, language);
        setMessages((current) => [...current, { role: "assistant", content: answer }]);
      } catch {
        setMessages((current) => [...current, { role: "assistant", content: t.chatError }]);
      }
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitQuestion(input);
  };

  return (
    <section
      className={`rounded-[36px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${
        compact ? "p-4" : "p-6 md:p-8"
      }`}
    >
      <div
        className={`flex flex-col gap-3 border-b border-slate-100 dark:border-slate-800 ${
          compact ? "pb-4" : "pb-5 md:flex-row md:items-end md:justify-between"
        }`}
      >
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-[#329d9c]">
            {t.brand}
          </p>
          <h2
            className={`mt-2 font-black text-slate-900 dark:text-slate-100 ${
              compact ? "text-xl" : "text-3xl"
            }`}
          >
            {t.chatTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">{t.chatDescription}</p>
        </div>

        <div className="rounded-2xl bg-[#329d9c] px-4 py-3 text-sm font-semibold text-white">
          {t.chatStatus}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {starterPrompts[language].map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => submitQuestion(prompt)}
            disabled={isPending}
            className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div
        className={`mt-6 space-y-4 rounded-[28px] bg-slate-50 p-4 dark:bg-[#329d9c] ${
          compact ? "max-h-[340px] overflow-y-auto" : "md:p-5"
        }`}
      >
        {messages.map((message, index) => {
          const isAssistant = message.role === "assistant";

          return (
            <article
              key={`${message.role}-${index}`}
              className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
            >
              {isAssistant ? (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-3xl bg-[#329d9c] text-white">
                  <BotMascotIcon className="h-6 w-6" />
                </div>
              ) : null}

              <div
                className={`max-w-3xl rounded-3xl px-4 py-3 ${
                  isAssistant
                    ? "border border-blue-100 bg-white text-slate-700 dark:border-slate-700 dark:bg-[#329d9c] dark:text-slate-200"
                    : "bg-[#dcc3eb] text-black dark:bg-[#deb6fb]"
                }`}
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] opacity-70">
                  {isAssistant ? <BotMascotIcon className="h-4 w-4" /> : <User size={14} />}
                  <span>{isAssistant ? t.aiCounselor : t.you}</span>
                </div>
                <div className="space-y-2 text-sm leading-7">
                  {message.content.split("\n").map((line, lineIndex) => (
                    <p key={`${index}-${lineIndex}`}>{line || "\u00A0"}</p>
                  ))}
                </div>
              </div>

              {!isAssistant ? (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                  <User size={18} />
                </div>
              ) : null}
            </article>
          );
        })}

        {isPending ? (
          <div className="flex items-center gap-3 rounded-3xl border border-blue-100 bg-white px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
            <Loader2 className="animate-spin text-blue-600" size={18} />
            <span>{t.analyzingQuestion}</span>
          </div>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <label htmlFor="career-chatbot-input" className="sr-only">
          {t.chatTitle}
        </label>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
             
            <input
              id="career-chatbot-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={t.askPlaceholder}
              className="w-full rounded-[22px] border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={isPending || !input.trim()}
            className="inline-flex items-center justify-center  rounded-4xl bg-[#329d9c] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#178f8d] disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isPending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
            <span>{t.send}</span>
          </button>
        </div>
      </form>
    </section>
  );
}
