"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  House,
  LayoutDashboard,
  LogOut,
  Trash2,
  ReceiptText,
} from "lucide-react";
import BotMascotIcon from "./BotMascotIcon";
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
import {
  analyzeSkillAssessment,
  deleteCareerReport,
  generateCareerReport,
  saveCareerReport,
} from "../../actions/career-ai";
import { signOutToHome } from "@/actions/auth";
import type { CareerReport, LanguageCode, SavedCareerReport } from "../../types/career";

type DashboardClientProps = {
  initialReports: SavedCareerReport[];
  userName?: string | null;
  userImage?: string | null;
  userEmail?: string | null;
  initialLanguage: LanguageCode;
};

type SelectionState = {
  levelId: string;
  pathId: string;
  specializationId: string;
};

type AssessmentQuestion = {
  id: string;
  question: string;
  options: string[];
};

const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "hands_on",
    question: "Which activity do you enjoy most?",
    options: [
      "Fixing or building things",
      "Designing posters or visuals",
      "Helping and caring for people",
      "Using computers and the internet",
    ],
  },
  {
    id: "school_subject",
    question: "Which school subject feels easiest for you?",
    options: ["Maths / Science", "Drawing / Arts", "Biology / Health", "Computer / English"],
  },
  {
    id: "work_style",
    question: "What kind of work style suits you?",
    options: [
      "Practical field work",
      "Creative studio work",
      "Service and public-facing work",
      "Office or digital work",
    ],
  },
  {
    id: "career_goal",
    question: "What matters most in your career?",
    options: ["Technical skills", "Creativity", "Helping society", "Early job opportunity"],
  },
  {
    id: "environment",
    question: "Where would you like to work?",
    options: ["Workshop / industry", "Studio / media", "Hospital / public service", "Office / online"],
  },
  {
    id: "comfort",
    question: "What are you most comfortable with?",
    options: ["Machines and tools", "Colors and ideas", "People and care", "Apps and computers"],
  },
  {
    id: "future_plan",
    question: "What kind of future do you see?",
    options: [
      "Diploma or technical degree",
      "Creative professional course",
      "Government or defense path",
      "Skill course and fast employment",
    ],
  },
  {
    id: "strength",
    question: "What is your biggest strength?",
    options: ["Problem solving", "Imagination", "Discipline", "Communication"],
  },
  {
    id: "learning_style",
    question: "How do you learn best?",
    options: [
      "By doing practical tasks",
      "By creating and presenting",
      "By observing and serving",
      "By using digital tools",
    ],
  },
  {
    id: "job_choice",
    question: "Which job sounds more interesting?",
    options: [
      "Engineer / technician",
      "Designer / photographer",
      "Police / nurse / army",
      "Digital marketer / computer operator",
    ],
  },
];

export default function DashboardClient({
  initialReports,
  userName,
  userImage,
  userEmail,
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
  const [isDeleting, startDelete] = useTransition();
  const [isAssessing, startAssessment] = useTransition();
  const [sidebarTab, setSidebarTab] = useState<"dashboard" | "saved" | "chat">("dashboard");
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, string>>({});
  const [assessmentResult, setAssessmentResult] = useState<{
    primaryRecommendation: { pathId: string; title: string; reason: string };
    summary: string;
    strengths: string[];
    recommendedPaths: Array<{ pathId: string; title: string; reason: string }>;
    nextStep: string;
  } | null>(null);
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
  const showBack =
    step > 1 || sidebarTab === "saved" || sidebarTab === "chat" || activeSavedId !== null || showAssessment;

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
    setShowAssessment(false);
    setAssessmentAnswers({});
    setAssessmentResult(null);
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
    setShowAssessment(false);
  };

  const handleLevelSelect = (levelId: string) => {
    setSidebarTab("dashboard");
    setSelection({ levelId, pathId: "", specializationId: "" });
    setGeneratedReport(null);
    setActiveSavedId(null);
    setError(null);
    setShowAssessment(false);
    setAssessmentAnswers({});
    setAssessmentResult(null);
    setStep(2);
  };

  const handlePathSelect = (pathId: string) => {
    if (pathId === "skills-assessment-10th") {
      setShowAssessment(true);
      setAssessmentAnswers({});
      setAssessmentResult(null);
      setError(null);
      return;
    }

    setSelection((current) => ({ ...current, pathId, specializationId: "" }));
    setGeneratedReport(null);
    setActiveSavedId(null);
    setError(null);
    setShowAssessment(false);
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

  const handleDeleteReport = (reportId: string) => {
    startDelete(async () => {
      try {
        await deleteCareerReport(reportId);
        setReports((current) => current.filter((report) => report._id !== reportId));

        if (activeSavedId === reportId) {
          setActiveSavedId(null);
          setGeneratedReport(null);
        }
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Could not delete the saved report right now.",
        );
      }
    });
  };

  const handleExport = () => {
    if (typeof window !== "undefined") {
      const roadmapRoot = document.getElementById("roadmap-print-root");

      if (!roadmapRoot) {
        window.print();
        return;
      }

      const printWindow = window.open("", "_blank", "width=1100,height=900");

      if (!printWindow) {
        window.print();
        return;
      }

      const headMarkup = Array.from(document.head.querySelectorAll("style, link[rel='stylesheet']"))
        .map((node) => node.outerHTML)
        .join("\n");

      printWindow.document.open();
      printWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>DreamRoute Roadmap</title>
            ${headMarkup}
            <style>
              html, body {
                margin: 0;
                padding: 0;
                background: #ffffff;
              }

              body {
                font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                color: #0f172a;
              }

              .print-shell {
                padding: 24px;
              }

              @page {
                size: auto;
                margin: 14mm;
              }
            </style>
          </head>
          <body>
            <div class="print-shell">${roadmapRoot.outerHTML}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();

      window.setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 300);
    }
  };

  const handleBack = () => {
    if (showAssessment) {
      setShowAssessment(false);
      setAssessmentAnswers({});
      setAssessmentResult(null);
      return;
    }

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

  const submitAssessment = () => {
    if (assessmentQuestions.some((question) => !assessmentAnswers[question.id])) {
      setError("Please answer all assessment questions first.");
      return;
    }

    setError(null);

    const answerLines = assessmentQuestions.map(
      (question) => `${question.question}: ${assessmentAnswers[question.id]}`,
    );

    startAssessment(async () => {
      try {
        const result = await analyzeSkillAssessment(answerLines, language);
        setAssessmentResult(result);
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Could not analyze the assessment right now.",
        );
      }
    });
  };

  return (
    <div className="h-[calc(100vh-4.75rem)] overflow-hidden bg-[radial-gradient(circle_at_bottom_right,_rgba(216,180,254,0.18),_transparent_30%),linear-gradient(180deg,#f5e7fa_0%,#efd9f7_45%,#ead0f6_100%)] dark:bg-[radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.08),_transparent_30%),linear-gradient(180deg,#150d1b_0%,#1c1024_48%,#140d1c_100%)]">
      <div className="grid h-[calc(100vh-4.75rem)] min-h-0 items-stretch md:grid-cols-[290px_minmax(0,1fr)]">
        <aside className="flex h-full min-h-0 flex-col overflow-y-auto border-r border-black/10 bg-[#0a7b81] px-4 py-4 dark:border-white/10 dark:bg-[#0f5d61] ">
          <div className="flex flex-col items-center">
            {userImage ? (
              <Image
                src={userImage}
                alt={displayName}
                width={67}
                height={67}
                className="h-[67px] w-[67px] rounded-full   object-cover dark:border-white"
              />
            ) : (
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-black bg-white text-2xl font-black text-white dark:border-white dark:bg-slate-800 dark:text-white">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <p className="mt-2 text-center text-[19px] font-bold text-white dark:text-white">
              {displayName}
            </p>
            {userEmail ? (
              <p className="mt-1 break-all text-center text-[14px] font-medium text-white dark:text-white/80">
                {userEmail}
              </p>
            ) : null}
            <div className="mt-3 w-full border-t border-black/40 dark:border-white/40" />
          </div>

          <div className="mt-8 space-y-3">
            <Link
              href="/"
              className="flex w-full items-center gap-3 font-semibold rounded-xl px-2 py-2 text-left text-[16px] text-white transition-all duration-200 hover:bg-[#04b8b5] hover:text-white dark:text-white/80 dark:hover:bg-[#329d9c] dark:hover:text-slate-950"
            >
              <House className="h-5 w-5" />
              <span>Home</span>
            </Link>

            <button
              type="button"
              onClick={resetToDashboard}
              className={`flex w-full items-center gap-3 font-semibold rounded-xl px-2 py-2 text-left text-[16px] transition-all duration-200 ${
                sidebarTab === "dashboard"
                  ? "bg-white/55 font-bold text-white shadow-sm dark:bg-white/10 dark:text-white"
                  : "text-white hover:bg-[#04b8b5] hover:text-white dark:text-white/80 dark:hover:bg-[#04b8b5] dark:hover:text-slate-950"
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              onClick={openSavedReports}
              className={`flex w-full items-center font-semibold gap-3 rounded-xl px-2 py-2 text-left text-[16px] transition-all duration-200 ${
                sidebarTab === "saved"
                  ? "bg-white/55   font-bold text-white shadow-sm dark:bg-white/10"
                  : "text-white hover:bg-[#04b8b5] hover:text-white dark:text-white/80 dark:hover:bg-[#04b8b5] dark:hover:text-slate-950"
              }`}
            >
              <ReceiptText className="h-5 w-5" />
              <span className={sidebarTab === "saved" ? "text-white" : ""}>Saved Reports</span>
            </button>

          </div>

          <div className="mt-auto pt-10">
            <div className="mb-4 w-full border-t border-white/30 dark:border-white/15" />

            <form action={signOutToHome}>
              <button className="flex items-center gap-2 text-[17px] text-red-600 font-bold transition hover:opacity-90">
                <LogOut className="h-6 w-6 text-red-600 font-bold dark:text-white" />
                <span>Logout</span>
              </button>
            </form>
          </div>
        </aside>

        <section className="h-[calc(100vh-4.75rem)] min-h-0 overflow-y-auto px-5 py-5 md:px-7">
          {showBack ? (
            <button
              type="button"
              onClick={handleBack}
              className="mb-3 inline-flex items-center text-pink-600 transition hover:opacity-80 dark:text-white"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2.2} />
            </button>
          ) : null}

          <div className="min-h-full w-full rounded-none bg-[linear-gradient(180deg,#f5e7fa_0%,#efd9f7_45%,#ead0f6_100%)] p-6 shadow-[0_1px_0_rgba(15,23,42,0.06)] dark:bg-[linear-gradient(180deg,#150d1b_0%,#1c1024_48%,#140d1c_100%)] md:p-8">
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
              showAssessment && selection.levelId === "10th" ? (
                <div className="space-y-6">
                  <div className="rounded-none border border-[#dfe5ef] bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-3xl font-black text-[#111827] dark:text-white">
                      Skills & Interest Assessment
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                      Answer these 10 questions and get AI guidance for the best-fit 10th-standard options.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {assessmentQuestions.map((question, index) => (
                      <div
                        key={question.id}
                        className="rounded-[22px] border border-[#dfe5ef] bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                      >
                        <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-400">
                          Question {index + 1}
                        </p>
                        <h3 className="mt-2 text-lg font-bold text-[#111827] dark:text-white">
                          {question.question}
                        </h3>
                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                          {question.options.map((option) => {
                            const selected = assessmentAnswers[question.id] === option;
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() =>
                                  setAssessmentAnswers((current) => ({
                                    ...current,
                                    [question.id]: option,
                                  }))
                                }
                                className={`rounded-[18px] border px-4 py-3 text-left text-sm font-medium transition ${
                                  selected
                                    ? "border-blue-400 bg-blue-50 text-blue-700 dark:border-sky-500 dark:bg-sky-950/40 dark:text-sky-300"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-white dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
                                }`}
                              >
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={submitAssessment}
                      disabled={isAssessing}
                      className="rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
                    >
                      {isAssessing ? "Analyzing..." : "Analyze with AI"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAssessment(false);
                        setAssessmentAnswers({});
                        setAssessmentResult(null);
                      }}
                      className="rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 dark:border-slate-700 dark:text-slate-200"
                    >
                      Back to 10th options
                    </button>
                  </div>

                  {assessmentResult ? (
                    <div className="rounded-[24px] border border-[#dfe5ef] bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                      <h3 className="text-2xl font-black text-[#111827] dark:text-white">
                        AI Assessment Result
                      </h3>
                      <div className="mt-4 rounded-[20px] border border-blue-200 bg-blue-50 p-5 dark:border-sky-800 dark:bg-sky-950/30">
                        <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-600 dark:text-sky-300">
                          Best Field To Choose
                        </p>
                        <p className="mt-2 text-xl font-black text-[#111827] dark:text-white">
                          {assessmentResult.primaryRecommendation.title}
                        </p>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {assessmentResult.primaryRecommendation.reason}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAssessment(false);
                            handlePathSelect(assessmentResult.primaryRecommendation.pathId);
                          }}
                          className="mt-4 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
                        >
                          Choose this field
                        </button>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                        {assessmentResult.summary}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        {assessmentResult.strengths.map((strength) => (
                          <span
                            key={strength}
                            className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                          >
                            {strength}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {assessmentResult.recommendedPaths.map((item) => (
                          <button
                            key={`${item.pathId}-${item.title}`}
                            type="button"
                            onClick={() => {
                              setShowAssessment(false);
                              handlePathSelect(item.pathId);
                            }}
                            className="rounded-[20px] border border-[#dfe5ef] bg-slate-50 p-5 text-left transition hover:border-blue-300 hover:bg-white dark:border-slate-700 dark:bg-slate-950"
                          >
                            <p className="text-lg font-black text-[#111827] dark:text-white">{item.title}</p>
                            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                              {item.reason}
                            </p>
                          </button>
                        ))}
                      </div>
                      <p className="mt-5 text-sm font-medium text-slate-600 dark:text-slate-300">
                        {assessmentResult.nextStep}
                      </p>
                    </div>
                  ) : null}
                </div>
              ) : (
                <PathSelector
                  items={[
                    ...(selection.levelId === "10th"
                      ? [
                          {
                            id: "skills-assessment-10th",
                            title: "Skills & Interest Assessment",
                            description:
                              "Answer 10 questions and get AI guidance for the best-fit 10th-standard options.",
                            badge: "Assessment",
                            icon: "AI",
                          },
                        ]
                      : []),
                    ...availablePaths.map((path) => {
                      const localized = localizeCareerPath(path, language);
                      return {
                        id: path.id,
                        title: localized.name,
                        description: path.description,
                        badge: selectedLevel
                          ? localizeCareerLevel(selectedLevel, language).label
                          : "Level",
                        icon: localized.name.slice(0, 2).toUpperCase(),
                      };
                    }),
                  ]}
                  selectedId={selection.pathId}
                  columns="2"
                  onSelect={handlePathSelect}
                />
              )
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
                    <div
                      key={report._id}
                      className="rounded-[2px] border border-[#dfe5ef] bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => openSavedReport(report)}
                          className="flex-1 text-left"
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
                        <button
                          type="button"
                          onClick={() => handleDeleteReport(report._id)}
                          disabled={isDeleting}
                          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-rose-200 text-rose-600 transition hover:bg-rose-50 disabled:opacity-60 dark:border-rose-900/50 dark:text-rose-300 dark:hover:bg-rose-950/30"
                          aria-label="Delete saved report"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
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
              <div className="rounded-[24px] border border-dashed border-[#dfe5ef] bg-white p-7 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
                  No saved reports yet
                </p>
              </div>
            ) : null}

            {sidebarTab === "chat" ? (
              <div className="space-y-3">
               
                <CareerChatbot language={language} />
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <div className="group fixed right-5 top-1/2 z-40 -translate-y-1/2">
        <div className="pointer-events-none absolute right-16 top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#329d9c] px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:bg-[#329d9c]">
        Get guidance based on your goals and education
        </div>
        <button
          type="button"
          onClick={openChat}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#329d9c] text-white shadow-lg transition hover:scale-105 hover:opacity-95 dark:bg-slate-800 animate-pulse"
          aria-label="Open AI chat"
        >
          <BotMascotIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}
