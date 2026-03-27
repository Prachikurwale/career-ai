// "use client";

// import { FormEvent, useState, useTransition } from "react";
// import { Loader2, Send, User } from "lucide-react";
// import { askCareerAssistant } from "../../actions/career-ai";
// import { getTranslation } from "../../lib/i18n";
// import type { LanguageCode } from "../../types/career";
// import BotMascotIcon from "./BotMascotIcon";

// type ChatMessage = {
//   role: "user" | "assistant";
//   content: string;
// };

// const starterPrompts: Record<LanguageCode, string[]> = {
//   english: [
//     "Which diploma is best after 10th for coding?",
//     "Compare ITI Electrician and Diploma Mechanical near my location.",
//     "Suggest good colleges for B.Sc IT after 12th in my city.",
//   ],
//   hindi: [
//     "\u0031\u0030\u0935\u0940\u0902 \u0915\u0947 \u092c\u093e\u0926 \u0915\u094b\u0921\u093f\u0902\u0917 \u0915\u0947 \u0932\u093f\u090f \u0938\u092c\u0938\u0947 \u0905\u091a\u094d\u091b\u093e \u0921\u093f\u092a\u094d\u0932\u094b\u092e\u093e \u0915\u094c\u0928 \u0938\u093e \u0939\u0948?",
//     "\u092e\u0947\u0930\u0940 \u0932\u094b\u0915\u0947\u0936\u0928 \u0915\u0947 \u0906\u0938\u092a\u093e\u0938 ITI Electrician \u0914\u0930 Diploma Mechanical \u0915\u0940 \u0924\u0941\u0932\u0928\u093e \u0915\u0930\u094b\u0964",
//     "\u0031\u0032\u0935\u0940\u0902 \u0915\u0947 \u092c\u093e\u0926 B.Sc IT \u0915\u0947 \u0932\u093f\u090f \u092e\u0947\u0930\u0947 \u0936\u0939\u0930 \u092e\u0947\u0902 \u0905\u091a\u094d\u091b\u0947 \u0915\u0949\u0932\u0947\u091c \u0938\u0941\u091d\u093e\u090f\u0902\u0964",
//   ],
//   marathi: [
//     "\u0031\u0030\u0935\u0940 \u0928\u0902\u0924\u0930 \u0915\u094b\u0921\u093f\u0902\u0917\u0938\u093e\u0920\u0940 \u0915\u094b\u0923\u0924\u093e \u0921\u093f\u092a\u094d\u0932\u094b\u092e\u093e \u0938\u0930\u094d\u0935\u094b\u0924\u094d\u0924\u092e \u0906\u0939\u0947?",
//     "\u092e\u093e\u091d\u094d\u092f\u093e \u0932\u094b\u0915\u0947\u0936\u0928\u091c\u0935\u0933 ITI Electrician \u0906\u0923\u093f Diploma Mechanical \u092f\u093e\u0902\u091a\u0940 \u0924\u0941\u0932\u0928\u093e \u0915\u0930\u093e.",
//     "\u0031\u0032\u0935\u0940 \u0928\u0902\u0924\u0930 B.Sc IT \u0938\u093e\u0920\u0940 \u092e\u093e\u091d\u094d\u092f\u093e \u0936\u0939\u0930\u093e\u0924 \u091a\u093e\u0902\u0917\u0932\u0940 \u0915\u0949\u0932\u0947\u091c \u0938\u0941\u091a\u0935\u093e.",
//   ],
// };

// type CareerChatbotProps = {
//   language: LanguageCode;
//   compact?: boolean;
// };

// export default function CareerChatbot({
//   language,
//   compact = false,
// }: CareerChatbotProps) {
//   const t = getTranslation(language);
//   const [messages, setMessages] = useState<ChatMessage[]>([
//     { role: "assistant", content: t.chatDescription },
//   ]);
//   const [input, setInput] = useState("");
//   const [isPending, startTransition] = useTransition();

//   const submitQuestion = (question: string) => {
//     const trimmedQuestion = question.trim();

//     if (!trimmedQuestion || isPending) {
//       return;
//     }

//     setMessages((current) => [...current, { role: "user", content: trimmedQuestion }]);
//     setInput("");

//     startTransition(async () => {
//       try {
//         const answer = await askCareerAssistant(trimmedQuestion, language);
//         setMessages((current) => [...current, { role: "assistant", content: answer }]);
//       } catch {
//         setMessages((current) => [...current, { role: "assistant", content: t.chatError }]);
//       }
//     });
//   };

//   const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     submitQuestion(input);
//   };

//   return (
//     <section
//       className={`rounded-[36px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${
//         compact ? "p-4" : "p-6 md:p-8"
//       }`}
//     >
//       <div
//         className={`flex flex-col gap-3 border-b border-slate-100 dark:border-slate-800 ${
//           compact ? "pb-4" : "pb-5 md:flex-row md:items-end md:justify-between"
//         }`}
//       >
//         <div>
//           <p className="text-sm font-black uppercase tracking-[0.25em] text-[#329d9c]">
//             {t.brand}
//           </p>
//           <h2
//             className={`mt-2 font-black text-slate-900 dark:text-slate-100 ${
//               compact ? "text-xl" : "text-3xl"
//             }`}
//           >
//             {t.chatTitle}
//           </h2>
//           <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
//             {t.chatDescription}
//           </p>
//         </div>

//         <div className="rounded-2xl bg-[#329d9c] px-4 py-3 text-sm font-semibold text-white">
//           {t.chatStatus}
//         </div>
//       </div>

//       <div className="mt-5 flex flex-wrap gap-3">
//         {starterPrompts[language].map((prompt) => (
//           <button
//             key={prompt}
//             type="button"
//             onClick={() => submitQuestion(prompt)}
//             disabled={isPending}
//             className="cursor-pointer rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {prompt}
//           </button>
//         ))}
//       </div>

//       <div
//         className={`mt-6 space-y-4 rounded-[28px] bg-slate-50 p-4 dark:bg-[#20002a] ${
//           compact ? "max-h-85 overflow-y-auto" : "md:p-5"
//         }`}
//       >
//        {messages.map((message, index) => {
//   const isAssistant = message.role === "assistant";

//   return (
//     <article
//       key={`${message.role}-${index}`}
//       className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"} items-end`}
//     >
     
//       {isAssistant && (
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-3xl bg-[#329d9c] text-white shadow-sm mb-1">
//           <BotMascotIcon className="h-6 w-6" />
//         </div>
//       )}

      
//       <div
//         className={`max-w-[75%] md:max-w-2xl rounded-[24px] px-5 py-3 shadow-sm ${
//           isAssistant
//             ? "border border-blue-100 bg-white text-slate-700 dark:border-slate-700 dark:bg-[#034746] dark:text-slate-200 rounded-bl-none"
//             : "bg-[#dcc3eb] text-black dark:text-white dark:bg-[#2a0123] rounded-br-none"
//         }`}
//       >
       
//         {isAssistant && (
//           <div className="mb-1.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
//           </div>
//         )}

      
//         <div className="space-y-2 text-sm leading-relaxed">
//           {message.content.split("\n").map((line, lineIndex) => (
//             <p key={`${index}-${lineIndex}`}>{line || "\u00A0"}</p>
//           ))}
//         </div>
//       </div>

    
//       {!isAssistant && (
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 mb-1 shadow-sm">
//           <User size={20} />
//         </div>
//       )}
//     </article>
//   );
// })}

//         {isPending ? (
//           <div className="flex items-center gap-3 rounded-3xl border border-blue-100 bg-white px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
//             <Loader2 className="animate-spin text-blue-600" size={18} />
//             <span>{t.analyzingQuestion}</span>
//           </div>
//         ) : null}
//       </div>

//       <form onSubmit={handleSubmit} className="mt-6">
//         <label htmlFor="career-chatbot-input" className="sr-only">
//           {t.chatTitle}
//         </label>
//         <div className="flex flex-col gap-3 md:flex-row">
//           <div className="relative flex-1">
//             <input
//               id="career-chatbot-input"
//               value={input}
//               onChange={(event) => setInput(event.target.value)}
//               placeholder={t.askPlaceholder}
//               className="w-full rounded-[22px] border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:bg-slate-900"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isPending || !input.trim()}
//             className="inline-flex items-center justify-center rounded-4xl bg-[#329d9c] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#178f8d] disabled:cursor-not-allowed disabled:bg-slate-300"
//           >
//             {isPending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
//             <span>{t.send}</span>
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// }









"use client";

import { FormEvent, useState, useTransition } from "react";
import { Loader2, Send, User } from "lucide-react";
import { askCareerAssistant } from "../../actions/career-ai";
import { getTranslation } from "../../lib/i18n";
import type { LanguageCode } from "../../types/career";
 

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts: Record<LanguageCode, string[]> = {
  english: [
    "Which diploma is best after 10th for coding?",
    "Compare ITI Electrician and Diploma Mechanical near my location.",
    "Suggest good colleges for B.Sc IT after 12th in my city.",
  ],
  hindi: [
    "10वीं के बाद कोडिंग के लिए सबसे अच्छा डिप्लोमा कौन सा है?",
    "मेरी लोकेशन के आसपास ITI Electrician और Diploma Mechanical की तुलना करो।",
    "12वीं के बाद B.Sc IT के लिए मेरे शहर में अच्छे कॉलेज सुझाएं।",
  ],
  marathi: [
    "10वी नंतर कोडिंगसाठी कोणता डिप्लोमा सर्वोत्तम आहे?",
    "माझ्या लोकेशनजवळ ITI Electrician आणि Diploma Mechanical यांची तुलना करा.",
    "12वी नंतर B.Sc IT साठी माझ्या शहरात चांगली कॉलेज सुचवा.",
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
    if (!trimmedQuestion || isPending) return;

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
      className={`rounded-[36px] dark:bg-slate-900 border-0 md:border md:border-slate-200 md:shadow-sm dark:md:border-slate-800 ${
        compact ? "p-4" : "p-0 md:p-8"
      }`}
    >
     
      <div className="flex flex-col  gap-4 border-b border-slate-100 pb-5 dark:border-slate-800 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#329d9c] md:text-sm">
            {t.brand}
          </p>
          <div className="flex items-center justify-between gap-2 md:block">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 md:text-3xl">
              {t.chatTitle}
            </h2>
             <div className="rounded-2xl bg-[#329d9c] px-3 py-1.5 text-xs font-bold text-white md:hidden">
              {t.chatStatus}
            </div>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {t.chatDescription}
          </p>
        </div>

         <div className="hidden rounded-2xl bg-[#329d9c] px-5 py-3 text-sm font-semibold text-white md:block">
          {t.chatStatus}
        </div>
      </div>
 
      <div className="mt-5 flex flex-wrap gap-2 md:gap-3">
        {starterPrompts[language].map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => submitQuestion(prompt)}
            disabled={isPending}
            className="cursor-pointer rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 transition hover:border-[#329d9c] hover:bg-teal-50 md:text-sm disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      
      <div className="mt-6 min-h-[300px] space-y-4 rounded-[28px] border-0 md:border md:border-slate-300 md:shadow-sm dark:md:border-slate-800 p-4 dark:bg-[#20002a] md:p-6">
        {messages.map((message, index) => {
          const isAssistant = message.role === "assistant";
          return (
            <article
              key={`${message.role}-${index}`}
              className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"} items-end`}
            >
              {/* {isAssistant && (
                
              )} */}

              <div
                className={`max-w-[85%] rounded-[22px] px-4 py-3 shadow-sm md:max-w-2xl ${
                  isAssistant
                    ? "rounded-bl-none border border-blue-50 bg-white text-slate-700 dark:bg-[#034746] dark:text-slate-200"
                    : "rounded-br-none bg-[#dcc3eb] text-black dark:bg-[#2a0123] dark:text-white"
                }`}
              >
                <div className="text-sm leading-relaxed">
                  {message.content.split("\n").map((line, i) => (
                    <p key={i}>{line || "\u00A0"}</p>
                  ))}
                </div>
              </div>

              {/* {!isAssistant && (
                <div className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-700 dark:bg-slate-800">
                  <User size={18} />
                </div>
              )} */}
            </article>
          );
        })}

        {isPending && (
          <div className="flex w-fit items-center gap-3 rounded-full bg-white px-4 py-2 text-xs text-slate-500 shadow-sm">
            <Loader2 className="animate-spin text-[#329d9c]" size={14} />
            <span>{t.analyzingQuestion}</span>
          </div>
        )}
      </div>

       
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="relative flex items-center gap-2">
          <input
            id="career-chatbot-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about colleges, fees, exams..."
            className="flex-1 rounded-full border border-slate-200 dark:bg-black dark:text-amber-50 bg-slate-50 py-3 pl-5 pr-12 text-sm outline-none focus:border-[#329d9c] dark:focus:bg-slate-800 dark:border-slate-700 dark:bg-slate-950"
          />
          <button
            type="submit"
            disabled={isPending || !input.trim()}
            className="absolute right-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#329d9c] text-white transition hover:scale-105 disabled:bg-slate-300"
          >
            {isPending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
          </button>
        </div>
      </form>
    </section>
  );
}