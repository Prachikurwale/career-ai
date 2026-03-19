"use client";

import Image from "next/image";
import { useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Grid2x2,
  LogOut,
  MessageCircleMore,
  ReceiptText,
} from "lucide-react";
import CareerChatbot from "./CareerChatbot";
import LoadingScreen from "./LoadingScreen";
import PathSelector from "./PathSelector";
import ReportViewer from "./ReportViewer";
import {
  careerLevels,
  getLevelById,
  getPathById,
  getPathsByLevel,
  getSpecializationById,
} from "../data/careers";
import {
  getTranslation,
  localizeCareerLevel,
  localizeCareerPath,
  localizeCareerSpecialization,
  parseLanguageCode,
} from "../../lib/i18n";
import { generateCareerReport, saveCareerReport } from "../../actions/career-ai";
import { signOutToHome } from "@/actions/auth";
import type { CareerReport, LanguageCode, SavedCareerReport } from "../../types/career";

type DashboardClientProps = {
  initialReports: SavedCareerReport[];
  userName?: string | null;
  userImage?: string | null;
  initialLanguage: LanguageCode;
};

type SelectionState = {
  levelId: string;
  pathId: string;
  specializationId: string;
};

export default function DashboardClient({
  initialReports,
  userName,
  userImage,
  initialLanguage,
}: DashboardClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [preferredLanguage, setPreferredLanguage] = useState<LanguageCode>(initialLanguage);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selection, setSelection] = useState<SelectionState>({
    levelId: "",
    pathId: "",
    specializationId: "",
  });
  const [reports, setReports] = useState<SavedCareerReport[]>(initialReports);
  const [generatedReport, setGeneratedReport] = useState<CareerReport | null>(null);
  const [activeSavedId, setActiveSavedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, startGenerate] = useTransition();
  const [isSaving, startSave] = useTransition();
  const [sidebarTab, setSidebarTab] = useState<"dashboard" | "saved" | "chat">("dashboard");
  const searchParamsString = searchParams.toString();
  const language = parseLanguageCode(searchParams.get("lang")) ?? preferredLanguage;

  const t = getTranslation(language);
  const displayName = userName?.trim() || "User";
  const selectedLevel = getLevelById(selection.levelId);
  const selectedPath = getPathById(selection.pathId);
  const selectedSpecialization = getSpecializationById(
    selection.pathId,
    selection.specializationId,
  );

  const availablePaths = useMemo(
    () => getPathsByLevel(selection.levelId),
    [selection.levelId],
  );

  const activeSavedReport = reports.find((report) => report._id === activeSavedId) ?? null;
  const visibleReport = generatedReport ?? activeSavedReport?.report ?? null;
  const showSavedList = sidebarTab === "saved" && !activeSavedId && !generatedReport;
  const showReport = step === 4 && Boolean(visibleReport);
  const showBack = step > 1 || sidebarTab === "saved" || sidebarTab === "chat" || activeSavedId !== null;

  const applyLanguage = (nextLanguage: LanguageCode) => {
    setPreferredLanguage(nextLanguage);
    const params = new URLSearchParams(searchParamsString);
    params.set("lang", nextLanguage);
    window.localStorage.setItem("career-ai-language", nextLanguage);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const resetToDashboard = () => {
    setSidebarTab("dashboard");
    setGeneratedReport(null);
    setActiveSavedId(null);
    setError(null);
    setSelection({ levelId: "", pathId: "", specializationId: "" });
    setStep(1);
  };

  const openSavedReports = () => {
    setSidebarTab("saved");
    setGeneratedReport(null);
    setActiveSavedId(null);
    setError(null);
    setStep(4);
  };

  const openChat = () => {
    setSidebarTab("chat");
    setGeneratedReport(null);
    setActiveSavedId(null);
    setError(null);
  };

  const handleLevelSelect = (levelId: string) => {
    setSidebarTab("dashboard");
    setSelection({ levelId, pathId: "", specializationId: "" });
    setGeneratedReport(null);
    setActiveSavedId(null);
    setError(null);
    setStep(2);
  };

  const handlePathSelect = (pathId: string) => {
    setSelection((current) => ({ ...current, pathId, specializationId: "" }));
    setGeneratedReport(null);
    setActiveSavedId(null);
    setError(null);
    setStep(3);
  };

  const handleSpecializationSelect = (specializationId: string) => {
    const nextSelection = { ...selection, specializationId };

    setSelection(nextSelection);
    setGeneratedReport(null);
    setActiveSavedId(null);
    setError(null);
    setStep(4);

    startGenerate(async () => {
      try {
        const report = await generateCareerReport({ ...nextSelection, language });
        setGeneratedReport(report);
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : t.reportError);
      }
    });
  };

  const handleSaveReport = () => {
    if (!generatedReport) {
      return;
    }

    startSave(async () => {
      try {
        const saved = await saveCareerReport({ ...selection, language }, generatedReport);
        setReports((current) => [saved, ...current]);
        setGeneratedReport(null);
        setActiveSavedId(saved._id);
        setSidebarTab("saved");
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : t.saveError);
      }
    });
  };

  const openSavedReport = (report: SavedCareerReport) => {
    setSidebarTab("saved");
    setGeneratedReport(null);
    setActiveSavedId(report._id);
    applyLanguage(report.language ?? "english");
    setStep(4);
  };

  const handleExport = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleBack = () => {
    if (activeSavedId) {
      setActiveSavedId(null);
      setGeneratedReport(null);
      setSidebarTab("saved");
      return;
    }

    if (sidebarTab === "saved") {
      resetToDashboard();
      return;
    }

    if (sidebarTab === "chat") {
      resetToDashboard();
      return;
    }

    if (step === 4) {
      setGeneratedReport(null);
      setStep(3);
      return;
    }

    if (step === 3) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="-mt-4 min-h-[calc(100vh-4.75rem)] overflow-hidden bg-[#efd9f7] dark:bg-[#150d1b]">
      <div className="grid min-h-[calc(100vh-4.75rem)] md:grid-cols-[126px_minmax(0,1fr)]">
        <aside className="flex flex-col border-r border-black/10 bg-[#d9d9d9] px-3 py-4 dark:border-white/10 dark:bg-slate-900">
          <div className="flex flex-col items-center">
            {userImage ? (
              <Image
                src={userImage}
                alt={displayName}
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-full border-2 border-black object-cover dark:border-white"
              />
            ) : (
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-black bg-white text-2xl font-black text-black dark:border-white dark:bg-slate-800 dark:text-white">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <p className="mt-2 text-center text-[17px] font-bold text-black dark:text-white">
              {displayName}
            </p>
            <div className="mt-3 w-full border-t border-dashed border-black dark:border-white" />
          </div>

          <div className="mt-8 space-y-3">
            <button
              type="button"
              onClick={resetToDashboard}
              className={`flex w-full items-center gap-2 text-left text-[15px] ${
                sidebarTab === "dashboard" ? "font-semibold text-black dark:text-white" : "text-black/80 dark:text-white/80"
              }`}
            >
              <Grid2x2 className="h-5 w-5" />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={openSavedReports}
              className={`flex w-full items-center gap-2 text-left text-[15px] ${
                sidebarTab === "saved" ? "font-semibold text-[#ff3a33]" : "text-black/80 dark:text-white/80"
              }`}
            >
              <ReceiptText className="h-5 w-5" />
              <span className={sidebarTab === "saved" ? "text-[#ff3a33]" : ""}>save report</span>
            </button>
          </div>

          <div className="mt-auto pt-10">
            <button
              type="button"
              onClick={openChat}
              className="mb-4 flex items-center gap-2 text-[18px] text-black transition hover:opacity-80 dark:text-white"
            >
              <MessageCircleMore className="h-6 w-6" />
              <span>AI chat</span>
            </button>

            <form action={signOutToHome}>
              <button className="flex items-center gap-2 text-[18px] text-[#ff3a33] transition hover:opacity-80">
                <LogOut className="h-6 w-6 text-black dark:text-white" />
                <span>Logout</span>
              </button>
            </form>
          </div>
        </aside>

        <section className="px-5 py-5 md:px-8">
          {showBack ? (
            <button
              type="button"
              onClick={handleBack}
              className="mb-3 inline-flex items-center text-black transition hover:opacity-80 dark:text-white"
              aria-label="Go back"
            >
              <ArrowLeft className="h-12 w-12" strokeWidth={2.2} />
            </button>
          ) : null}

          <div className="mx-auto max-w-5xl rounded-none border border-[#e9edf5] bg-[#fafbfd] p-6 shadow-[0_1px_0_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-950 md:p-8">
            {sidebarTab === "dashboard" && step === 1 ? (
              <div className="space-y-6">
                <h1 className="text-4xl font-black text-[#111827] dark:text-white">
                  Welcome back, {displayName}
                </h1>
                <PathSelector
                  items={careerLevels.map((level) => {
                    const localized = localizeCareerLevel(level, language);
                    return {
                      id: level.id,
                      title: localized.label,
                      description: localized.description,
                      badge: "Level",
                      icon: localized.shortLabel.slice(0, 2).toUpperCase(),
                    };
                  })}
                  selectedId={selection.levelId}
                  onSelect={handleLevelSelect}
                />
              </div>
            ) : null}

            {sidebarTab === "dashboard" && step === 2 ? (
              <PathSelector
                items={availablePaths.map((path) => {
                  const localized = localizeCareerPath(path, language);
                  return {
                    id: path.id,
                    title: localized.name,
                    description: path.description,
                    badge: selectedLevel ? localizeCareerLevel(selectedLevel, language).label : "Level",
                    icon: localized.name.slice(0, 2).toUpperCase(),
                  };
                })}
                selectedId={selection.pathId}
                columns="2"
                onSelect={handlePathSelect}
              />
            ) : null}

            {sidebarTab === "dashboard" && step === 3 && selectedPath ? (
              <PathSelector
                items={selectedPath.specializations.map((specialization) => {
                  const localized = localizeCareerSpecialization(specialization, language);
                  return {
                    id: specialization.id,
                    title: localized.name,
                    description: `${localized.focus}. Duration: ${specialization.duration}.`,
                    badge: localizeCareerPath(selectedPath, language).name,
                    icon: localized.name.slice(0, 2).toUpperCase(),
                  };
                })}
                selectedId={selection.specializationId}
                columns="2"
                onSelect={handleSpecializationSelect}
              />
            ) : null}

            {showSavedList ? (
              <div className="space-y-6">
                <div className="rounded-[24px] border border-[#dfe5ef] bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h2 className="text-4xl font-black text-[#111827] dark:text-white">Saved Reports</h2>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                    {reports.length} reports saved
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {reports.map((report) => (
                    <button
                      key={report._id}
                      type="button"
                      onClick={() => openSavedReport(report)}
                      className="rounded-[22px] border border-[#dfe5ef] bg-white p-5 text-left transition hover:-translate-y-0.5 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                      <p className="text-2xl font-black text-[#111827] dark:text-white">
                        {report.specializationName}
                      </p>
                      <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                        {report.levelLabel}
                      </p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {report.pathName}
                      </p>
                      <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
                        {new Date(report.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {isGenerating ? <LoadingScreen language={language} /> : null}

            {showReport && !isGenerating ? (
              <div className="space-y-5">
                {generatedReport ? (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleSaveReport}
                      disabled={isSaving}
                      className="rounded-full bg-[#111827] px-5 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
                    >
                      {isSaving ? t.saving : t.saveReport}
                    </button>
                  </div>
                ) : null}
                <ReportViewer
                  language={language}
                  report={visibleReport as CareerReport}
                  onExport={handleExport}
                  titleSuffix={generatedReport ? t.freshRoadmap : t.savedRoadmap}
                />
              </div>
            ) : null}

            {error ? (
              <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            {sidebarTab === "saved" && !reports.length ? (
              <div className="rounded-[24px] border border-dashed border-[#dfe5ef] bg-white p-10 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                  No saved reports yet
                </p>
              </div>
            ) : null}

            {sidebarTab === "chat" ? (
              <div className="space-y-6">
                <div className="rounded-[24px] border border-[#dfe5ef] bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                  <h2 className="text-4xl font-black text-[#111827] dark:text-white">AI Chat</h2>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                    Ask about careers, colleges, streams, exams, fees, and next steps.
                  </p>
                </div>
                <CareerChatbot language={language} />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
