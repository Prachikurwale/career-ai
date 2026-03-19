"use client";

import { useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Bot, Compass, FileStack, History, Plus } from "lucide-react";
import LoadingScreen from "./LoadingScreen";
import FloatingCareerAssistant from "./FloatingCareerAssistant";
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
import type { CareerReport, LanguageCode, SavedCareerReport } from "../../types/career";

type DashboardClientProps = {
  initialReports: SavedCareerReport[];
  userName?: string | null;
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
  const [activeSavedId, setActiveSavedId] = useState<string | null>(
    initialReports[0]?._id ?? null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, startGenerate] = useTransition();
  const [isSaving, startSave] = useTransition();
  const searchParamsString = searchParams.toString();
  const language = parseLanguageCode(searchParams.get("lang")) ?? preferredLanguage;

  const t = getTranslation(language);
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

  const applyLanguage = (nextLanguage: LanguageCode) => {
    setPreferredLanguage(nextLanguage);
    const params = new URLSearchParams(searchParamsString);
    params.set("lang", nextLanguage);
    window.localStorage.setItem("career-ai-language", nextLanguage);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const beginNewPath = () => {
    setGeneratedReport(null);
    setError(null);
    setActiveSavedId(null);
    setSelection({ levelId: "", pathId: "", specializationId: "" });
    setStep(1);
  };

  const handleLevelSelect = (levelId: string) => {
    setSelection({ levelId, pathId: "", specializationId: "" });
    setGeneratedReport(null);
    setError(null);
    setStep(2);
  };

  const handlePathSelect = (pathId: string) => {
    setSelection((current) => ({ ...current, pathId, specializationId: "" }));
    setGeneratedReport(null);
    setError(null);
    setStep(3);
  };

  const handleSpecializationSelect = (specializationId: string) => {
    const nextSelection = { ...selection, specializationId };

    setSelection(nextSelection);
    setGeneratedReport(null);
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
        setActiveSavedId(saved._id);
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : t.saveError);
      }
    });
  };

  const handleExport = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const goBack = () => {
    if (step === 4) setStep(3);
    if (step === 3) setStep(2);
    if (step === 2) setStep(1);
  };

  return (
    <>
      <div className="grid gap-6 xl:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="rounded-4xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:sticky xl:top-24 xl:h-fit">
          <div className="rounded-[28px] bg-slate-950 p-5 text-white dark:bg-slate-800">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-300">
              {t.dashboard}
            </p>
            <h1 className="mt-3 text-2xl font-black">
              {userName ? `${userName.split(" ")[0]} ` : ""}
              {t.workspace}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">{t.workspaceDescription}</p>
            <button
              type="button"
              onClick={beginNewPath}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
            >
              <Plus size={16} />
              <span>{t.generateNewPath}</span>
            </button>
          </div>

          <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <History size={16} />
              <h2 className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">
                {t.savedReports}
              </h2>
            </div>
            <div className="mt-4 space-y-3">
              {reports.length ? (
                reports.map((report) => (
                  <button
                    key={report._id}
                    type="button"
                    onClick={() => {
                      setGeneratedReport(null);
                      setActiveSavedId(report._id);
                      applyLanguage(report.language ?? "english");
                      setStep(4);
                    }}
                    className={`w-full rounded-[22px] border px-4 py-3 text-left transition ${
                      activeSavedId === report._id && !generatedReport
                        ? "border-blue-400 bg-white shadow-sm dark:bg-slate-900"
                        : "border-transparent bg-white/80 hover:border-slate-200 dark:bg-slate-900/80 dark:hover:border-slate-700"
                    }`}
                  >
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100">
                      {report.specializationName}
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {report.levelLabel} - {report.pathName}
                    </p>
                  </button>
                ))
              ) : (
                <p className="text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {t.noSavedReports}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <Compass size={16} />
                <span className="text-sm font-bold">{t.guidedPathfinder}</span>
              </div>
              <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                {t.guidedPathfinderDescription}
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100">
                <Bot size={16} />
                <span className="text-sm font-bold">{t.askFollowup}</span>
              </div>
              <p className="mt-2 text-xs leading-6 text-slate-500 dark:text-slate-400">
                {t.askFollowupDescription}
              </p>
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-blue-600">
                  {t.brand}
                </p>
                <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-100">
                  {t.navigatorTitle}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {t.navigatorDescription}
                </p>
              </div>
              {step > 1 && step < 4 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-sky-300"
                >
                  <ArrowLeft size={16} />
                  <span>{t.back}</span>
                </button>
              ) : null}
            </div>

            {error ? (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            <div className="mt-8">
              {step === 1 ? (
                <PathSelector
                  items={careerLevels.map((level) => {
                    const localized = localizeCareerLevel(level, language);
                    return {
                      id: level.id,
                      title: localized.label,
                      description: localized.description,
                      badge: t.step1,
                      icon: localized.shortLabel.slice(0, 2).toUpperCase(),
                    };
                  })}
                  selectedId={selection.levelId}
                  onSelect={handleLevelSelect}
                />
              ) : null}

              {step === 2 ? (
                <PathSelector
                  items={availablePaths.map((path) => {
                    const localized = localizeCareerPath(path, language);
                    return {
                      id: path.id,
                      title: localized.name,
                      description: path.description,
                      badge: selectedLevel
                        ? localizeCareerLevel(selectedLevel, language).shortLabel
                        : undefined,
                      icon: localized.name.slice(0, 2).toUpperCase(),
                    };
                  })}
                  selectedId={selection.pathId}
                  columns="2"
                  onSelect={handlePathSelect}
                />
              ) : null}

              {step === 3 && selectedPath ? (
                <PathSelector
                  items={selectedPath.specializations.map((specialization) => {
                    const localized = localizeCareerSpecialization(specialization, language);
                    return {
                      id: specialization.id,
                      title: localized.name,
                      description: `${localized.focus}. ${t.duration}: ${specialization.duration}.`,
                      badge: localizeCareerPath(selectedPath, language).name,
                      icon: localized.name.slice(0, 2).toUpperCase(),
                    };
                  })}
                  selectedId={selection.specializationId}
                  columns="2"
                  onSelect={handleSpecializationSelect}
                />
              ) : null}

              {step === 4 ? (
                <div className="space-y-6">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {t.selection}
                    </span>{" "}
                    {selectedLevel
                      ? localizeCareerLevel(selectedLevel, language).label
                      : activeSavedReport?.levelLabel ?? t.savedPath}
                    {" -> "}
                    {selectedPath
                      ? localizeCareerPath(selectedPath, language).name
                      : activeSavedReport?.pathName ?? t.path}
                    {" -> "}
                    {selectedSpecialization
                      ? localizeCareerSpecialization(selectedSpecialization, language).name
                      : activeSavedReport?.specializationName ?? t.specialization}
                  </div>

                  {isGenerating ? (
                    <LoadingScreen language={language} />
                  ) : visibleReport ? (
                    <ReportViewer
                      language={language}
                      report={visibleReport}
                      onSave={generatedReport ? handleSaveReport : undefined}
                      onExport={handleExport}
                      saveDisabled={isSaving}
                      saveLabel={isSaving ? t.saving : t.saveReport}
                      titleSuffix={generatedReport ? t.freshRoadmap : t.savedRoadmap}
                    />
                  ) : (
                    <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-10 text-center dark:border-slate-700 dark:bg-slate-950">
                      <div className="mx-auto max-w-xl">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white dark:bg-slate-800">
                          <FileStack />
                        </div>
                        <h3 className="mt-5 text-2xl font-black text-slate-900 dark:text-slate-100">
                          {t.emptyReportTitle}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                          {t.emptyReportDescription}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </div>

      <FloatingCareerAssistant key={language} language={language} />
    </>
  );
}
