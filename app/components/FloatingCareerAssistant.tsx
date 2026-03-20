"use client";

import { useState } from "react";
import { MessageCircleMore, X } from "lucide-react";
import CareerChatbot from "./CareerChatbot";
import { getTranslation } from "../../lib/i18n";
import type { LanguageCode } from "../../types/career";

type FloatingCareerAssistantProps = {
  language: LanguageCode;
};

export default function FloatingCareerAssistant({
  language,
}: FloatingCareerAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = getTranslation(language);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {isOpen ? (
        <div className="w-[min(92vw,430px)] rounded-[32px] border border-slate-200 bg-white p-3 shadow-2xl dark:border-slate-800 dark:bg-slate-950">
          <div className="mb-3 flex items-center justify-between px-2 pt-2">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-600">
              {t.askAi}
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300"
              aria-label={t.close}
            >
              <X size={16} />
            </button>
          </div>
          <CareerChatbot key={`floating-chat-${language}`} language={language} compact />
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex items-center gap-3 rounded-full bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700"
      >
        <MessageCircleMore size={18} />
        <span>{t.askAi}</span>
      </button>
    </div>
  );
}
