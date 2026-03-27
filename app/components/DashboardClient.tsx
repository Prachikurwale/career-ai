"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Languages,
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
import ThemeToggle from "./ThemeToggle";
import LanguageDropdown from "./LanguageDropdown";
import { useMobileMenu } from "./MobileMenuContext";
import {
  careerLevels,
  getLevelById,
  getPathById,
  getPathsByLevel,
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

const dashboardCopy: Record<
  LanguageCode,
  {
    welcomeBack: (name: string) => string;
    levelBadge: string;
    assessmentTitle: string;
    assessmentDescription: string;
    questionLabel: (index: number) => string;
    analyzing: string;
    analyzeWithAi: string;
    backTo10thOptions: string;
    assessmentResultTitle: string;
    bestFieldToChoose: string;
    chooseThisField: string;
    durationLabel: string;
    reportsSaved: (count: number) => string;
    deleteSavedReport: string;
    openChat: string;
    chatTooltip: string;
    answerAllQuestions: string;
    deleteReportError: string;
    assessmentError: string;
  }
> = {
  english: {
    welcomeBack: (name) => `Welcome back, ${name}`,
    levelBadge: "Level",
    assessmentTitle: "Skills & Interest Assessment",
    assessmentDescription:
      "Answer these 10 questions and get AI guidance for the best-fit 10th-standard options.",
    questionLabel: (index) => `Question ${index}`,
    analyzing: "Analyzing...",
    analyzeWithAi: "Analyze with AI",
    backTo10thOptions: "Back to 10th options",
    assessmentResultTitle: "AI Assessment Result",
    bestFieldToChoose: "Best Field To Choose",
    chooseThisField: "Choose this field",
    durationLabel: "Duration",
    reportsSaved: (count) => `${count} reports saved`,
    deleteSavedReport: "Delete saved report",
    openChat: "Open AI chat",
    chatTooltip: "Get guidance based on your goals and education",
    answerAllQuestions: "Please answer all assessment questions first.",
    deleteReportError: "Could not delete the saved report right now.",
    assessmentError: "Could not analyze the assessment right now.",
  },
  hindi: {
    welcomeBack: (name) =>
      `\u0935\u093e\u092a\u0938 \u0938\u094d\u0935\u093e\u0917\u0924 \u0939\u0948, ${name}`,
    levelBadge: "\u0938\u094d\u0924\u0930",
    assessmentTitle: "\u0938\u094d\u0915\u093f\u0932\u094d\u0938 \u0914\u0930 \u0930\u0941\u091a\u093f \u0905\u0938\u0947\u0938\u092e\u0947\u0902\u091f",
    assessmentDescription:
      "\u0907\u0928 \u0031\u0030 \u0938\u0935\u093e\u0932\u094b\u0902 \u0915\u0947 \u091c\u0935\u093e\u092c \u0926\u0947\u0902 \u0914\u0930 \u0031\u0030\u0935\u0940\u0902 \u0915\u0947 \u0938\u092c\u0938\u0947 \u0909\u092a\u092f\u0941\u0915\u094d\u0924 \u0935\u093f\u0915\u0932\u094d\u092a\u094b\u0902 \u092a\u0930 AI \u0917\u093e\u0907\u0921\u0947\u0902\u0938 \u092a\u093e\u090f\u0902\u0964",
    questionLabel: (index) => `\u0938\u0935\u093e\u0932 ${index}`,
    analyzing: "\u0935\u093f\u0936\u094d\u0932\u0947\u0937\u0923 \u0939\u094b \u0930\u0939\u093e \u0939\u0948...",
    analyzeWithAi: "AI \u0938\u0947 \u0935\u093f\u0936\u094d\u0932\u0947\u0937\u0923 \u0915\u0930\u0947\u0902",
    backTo10thOptions: "\u0031\u0030\u0935\u0940\u0902 \u0915\u0947 \u0935\u093f\u0915\u0932\u094d\u092a\u094b\u0902 \u092a\u0930 \u0935\u093e\u092a\u0938 \u091c\u093e\u090f\u0902",
    assessmentResultTitle: "AI \u0905\u0938\u0947\u0938\u092e\u0947\u0902\u091f \u092a\u0930\u093f\u0923\u093e\u092e",
    bestFieldToChoose: "\u091a\u0941\u0928\u0928\u0947 \u0915\u0947 \u0932\u093f\u090f \u0938\u092c\u0938\u0947 \u0905\u091a\u094d\u091b\u093e \u0915\u094d\u0937\u0947\u0924\u094d\u0930",
    chooseThisField: "\u0907\u0938 \u0915\u094d\u0937\u0947\u0924\u094d\u0930 \u0915\u094b \u091a\u0941\u0928\u0947\u0902",
    durationLabel: "\u0905\u0935\u0927\u093f",
    reportsSaved: (count) => `${count} \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u0938\u0947\u0935 \u0939\u0948\u0902`,
    deleteSavedReport: "\u0938\u0947\u0935 \u0915\u0940 \u0917\u0908 \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u0939\u091f\u093e\u090f\u0902",
    openChat: "AI \u091a\u0948\u091f \u0916\u094b\u0932\u0947\u0902",
    chatTooltip: "\u0905\u092a\u0928\u0947 \u0917\u094b\u0932\u094d\u0938 \u0914\u0930 \u090f\u091c\u0941\u0915\u0947\u0936\u0928 \u0915\u0947 \u0939\u093f\u0938\u093e\u092c \u0938\u0947 \u0917\u093e\u0907\u0921\u0947\u0902\u0938 \u092a\u093e\u090f\u0902",
    answerAllQuestions:
      "\u0915\u0943\u092a\u092f\u093e \u092a\u0939\u0932\u0947 \u0938\u092d\u0940 \u0905\u0938\u0947\u0938\u092e\u0947\u0902\u091f \u0938\u0935\u093e\u0932\u094b\u0902 \u0915\u093e \u091c\u0935\u093e\u092c \u0926\u0947\u0902\u0964",
    deleteReportError:
      "\u0905\u092d\u0940 \u0938\u0947\u0935 \u0915\u0940 \u0917\u0908 \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u0939\u091f\u093e\u0908 \u0928\u0939\u0940\u0902 \u091c\u093e \u0938\u0915\u0940\u0964",
    assessmentError:
      "\u0905\u092d\u0940 \u0905\u0938\u0947\u0938\u092e\u0947\u0902\u091f \u0915\u093e \u0935\u093f\u0936\u094d\u0932\u0947\u0937\u0923 \u0928\u0939\u0940\u0902 \u0939\u094b \u0938\u0915\u093e\u0964",
  },
  marathi: {
    welcomeBack: (name) => `\u092a\u0941\u0928\u094d\u0939\u093e \u0938\u094d\u0935\u093e\u0917\u0924, ${name}`,
    levelBadge: "\u0938\u094d\u0924\u0930",
    assessmentTitle: "\u0938\u094d\u0915\u093f\u0932\u094d\u0938 \u0906\u0923\u093f \u0906\u0935\u0921 \u0905\u0938\u0947\u0938\u092e\u0947\u0902\u091f",
    assessmentDescription:
      "\u0939\u0947 \u0031\u0030 \u092a\u094d\u0930\u0936\u094d\u0928 \u0938\u094b\u0921\u0935\u093e \u0906\u0923\u093f \u0031\u0030\u0935\u0940\u0928\u0902\u0924\u0930\u091a\u094d\u092f\u093e \u0938\u0930\u094d\u0935\u093e\u0924 \u092f\u094b\u0917\u094d\u092f \u092a\u0930\u094d\u092f\u093e\u092f\u093e\u0902\u0938\u093e\u0920\u0940 AI \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0928 \u092e\u093f\u0933\u0935\u093e\u0964",
    questionLabel: (index) => `\u092a\u094d\u0930\u0936\u094d\u0928 ${index}`,
    analyzing: "\u0935\u093f\u0936\u094d\u0932\u0947\u0937\u0923 \u0938\u0941\u0930\u0942 \u0906\u0939\u0947...",
    analyzeWithAi: "AI \u0928\u0947 \u0935\u093f\u0936\u094d\u0932\u0947\u0937\u0923 \u0915\u0930\u093e",
    backTo10thOptions: "\u0031\u0030\u0935\u0940\u0928\u0902\u0924\u0930\u091a\u094d\u092f\u093e \u092a\u0930\u094d\u092f\u093e\u092f\u093e\u0902\u0915\u0921\u0947 \u092a\u0930\u0924 \u091c\u093e",
    assessmentResultTitle: "AI \u0905\u0938\u0947\u0938\u092e\u0947\u0902\u091f \u0928\u093f\u0915\u093e\u0932",
    bestFieldToChoose: "\u0928\u093f\u0935\u0921\u0923\u094d\u092f\u093e\u0938\u093e\u0920\u0940 \u0938\u0930\u094d\u0935\u094b\u0924\u094d\u0924\u092e \u0915\u094d\u0937\u0947\u0924\u094d\u0930",
    chooseThisField: "\u0939\u0947 \u0915\u094d\u0937\u0947\u0924\u094d\u0930 \u0928\u093f\u0935\u0921\u093e",
    durationLabel: "\u0915\u093e\u0932\u093e\u0935\u0927\u0940",
    reportsSaved: (count) => `${count} \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u0938\u0947\u0935 \u0906\u0939\u0947\u0924`,
    deleteSavedReport: "\u0938\u0947\u0935 \u0915\u0947\u0932\u0947\u0932\u093e \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u0939\u091f\u0935\u093e",
    openChat: "AI \u091a\u0948\u091f \u0909\u0918\u0921\u093e",
    chatTooltip: "\u0924\u0941\u092e\u091a\u094d\u092f\u093e \u0917\u094b\u0932\u094d\u0938 \u0906\u0923\u093f \u0936\u093f\u0915\u094d\u0937\u0923\u093e\u0928\u0941\u0938\u093e\u0930 \u092e\u093e\u0930\u094d\u0917\u0926\u0930\u094d\u0936\u0928 \u092e\u093f\u0933\u0935\u093e",
    answerAllQuestions:
      "\u0915\u0943\u092a\u092f\u093e \u0906\u0927\u0940 \u0938\u0930\u094d\u0935 \u0905\u0938\u0947\u0938\u092e\u0947\u0902\u091f \u092a\u094d\u0930\u0936\u094d\u0928\u093e\u0902\u091a\u0940 \u0909\u0924\u094d\u0924\u0930\u0947 \u0926\u094d\u092f\u093e\u0964",
    deleteReportError:
      "\u0906\u0924\u094d\u0924\u093e \u0938\u0947\u0935 \u0915\u0947\u0932\u0947\u0932\u093e \u0930\u093f\u092a\u094b\u0930\u094d\u091f \u0939\u091f\u0935\u0924\u093e \u0906\u0932\u093e \u0928\u093e\u0939\u0940\u0964",
    assessmentError:
      "\u0906\u0924\u094d\u0924\u093e \u0905\u0938\u0947\u0938\u092e\u0947\u0902\u091f\u091a\u0947 \u0935\u093f\u0936\u094d\u0932\u0947\u0937\u0923 \u0939\u094b\u090a \u0936\u0915\u0932\u0947 \u0928\u093e\u0939\u0940.",
  },
};

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
  const { isSidebarOpen, setIsSidebarOpen } = useMobileMenu();
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
  const ui = dashboardCopy[language];
  const displayName = userName?.trim() || "User";
  const selectedLevel = getLevelById(selection.levelId);
  const selectedPath = getPathById(selection.pathId);

  const availablePaths = useMemo(
    () => getPathsByLevel(selection.levelId),
    [selection.levelId],
  );

  const activeSavedReport = reports.find((report) => report._id === activeSavedId) ?? null;
  const visibleReport = generatedReport ?? activeSavedReport?.report ?? null;
  const showSavedList = sidebarTab === "saved" && !activeSavedId && !generatedReport;
  const showReport = step === 4 && Boolean(visibleReport);
  const showLanguage = true; // Always show in dashboard sidebar
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
    setIsSidebarOpen(false);
  };

  const openSavedReports = () => {
    setSidebarTab("saved");
    setGeneratedReport(null);
    setActiveSavedId(null);
    setError(null);
    setStep(4);
    setIsSidebarOpen(false);
  };

  const openChat = () => {
    setSidebarTab("chat");
    setGeneratedReport(null);
    setActiveSavedId(null);
    setError(null);
    setShowAssessment(false);
    setIsSidebarOpen(false);
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
            : ui.deleteReportError,
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
      const isMobileViewport = window.matchMedia("(max-width: 768px)").matches;

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

      if (isMobileViewport) {
        return;
      }

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
      setError(ui.answerAllQuestions);
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
            : ui.assessmentError,
        );
      }
    });
  };

  return (
    <div className="relative h-[calc(100vh-4.75rem)] overflow-hidden bg-[radial-gradient(circle_at_bottom_right,_rgba(216,180,254,0.18),_transparent_30%),linear-gradient(180deg,#f5e7fa_0%,#efd9f7_45%,#ead0f6_100%)] dark:bg-[radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.08),_transparent_30%),linear-gradient(180deg,#150d1b_0%,#1c1024_48%,#140d1c_100%)]">
     
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />

          <div className="fixed inset-0 top-[4.75rem] z-50 md:hidden">
           
            <div className="absolute right-0 top-0 h-full w-72 bg-[#0a7b81] dark:bg-[#0f5d61] overflow-y-auto flex flex-col shadow-xl">
             
              <div className="flex flex-col items-center p-6 border-b border-white/20 dark:border-white/20">
                <div className="flex h-24 w-24 items-center justify-center rounded-full  bg-white shadow-lg">
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt={displayName}
                      width={78}
                      height={78}
                      priority={false}
                      loading="lazy"
                      unoptimized
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-200 text-3xl font-black text-slate-600">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <p className="mt-4 text-center text-lg font-bold text-white">
                  {displayName}
                </p>
                <p className="mt-1 text-center text-sm text-white/90">
                  {userEmail}
                </p>
              </div>

            
              <div className="flex-1 space-y-2 p-4">
                
                {showLanguage ? (
                  <div className="mb-4 rounded-lg bg-white/20 p-3">
                    <div className="flex items-center gap-2 text-white text-sm font-semibold mb-2">
                      <Languages className="h-5 w-5" />
                      <span>Language</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-2 py-1.5">
                      <LanguageDropdown value={language} onChange={(lang) => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set("lang", lang);
                        window.localStorage.setItem("career-ai-language", lang);
                        router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname, {
                          scroll: false,
                        });
                      }} />
                    </div>
                  </div>
                ) : null}

                
                <div className="mb-4 rounded-lg bg-white/20 p-3 flex items-center justify-between">
                  <span className="text-white text-sm font-semibold">Dark Mode</span>
                  <ThemeToggle />
                </div>

             
                <Link
                  href="/"
                  className="flex w-full items-center gap-3 font-semibold rounded-lg px-4 py-3 text-white transition-all duration-200 hover:bg-[#04b8b5] dark:hover:bg-[#329d9c]"
                >
                  <House className="h-5 w-5" />
                  <span>{t.home}</span>
                </Link>

            
                <button
                  type="button"
                  onClick={resetToDashboard}
                  className={`flex w-full items-center gap-3 font-semibold rounded-lg px-4 py-3 text-white transition-all duration-200 ${
                    sidebarTab === "dashboard"
                      ? "bg-white/25 dark:bg-white/15"
                      : "hover:bg-[#04b8b5] dark:hover:bg-[#329d9c]"
                  }`}
                >
                  <LayoutDashboard size={20} />
                  <span>{t.dashboard}</span>
                </button>

                
                <button
                  type="button"
                  onClick={openSavedReports}
                  className={`flex w-full items-center gap-3 font-semibold rounded-lg px-4 py-3 text-white transition-all duration-200 ${
                    sidebarTab === "saved"
                      ? "bg-white/25 dark:bg-white/15"
                      : "hover:bg-[#04b8b5] dark:hover:bg-[#329d9c]"
                  }`}
                >
                  <ReceiptText className="h-5 w-5" />
                  <span>{t.savedReports}</span>
                </button>

               
                <button
                  type="button"
                  onClick={openChat}
                  className={`flex w-full items-center gap-3 font-semibold rounded-lg px-4 py-3 text-white transition-all duration-200 ${
                    sidebarTab === "chat"
                      ? "bg-white/25 dark:bg-white/15"
                      : "hover:bg-[#04b8b5] dark:hover:bg-[#329d9c]"
                  }`}
                >
                  <BotMascotIcon className="h-5 w-5" />
                  <span>{ui.openChat}</span>
                </button>
              </div>

              
              <div className="border-t border-white/30 p-4">
                <form action={signOutToHome}>
                  <button className="flex w-full items-center gap-3 text-lg font-bold text-red-500 transition hover:opacity-80">
                    <LogOut className="h-6 w-6" />
                    <span>{t.logout}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="grid h-[calc(100vh-4.75rem)] min-h-0 items-stretch md:grid-cols-[290px_minmax(0,1fr)]">
         
        <aside className="hidden md:flex h-full w-80 min-h-0 flex-col overflow-y-auto border-r border-black/10 bg-[#0a7b81] px-4 py-4 dark:border-white/10 dark:bg-[#0f5d61]">
          <div className="flex flex-col items-center">
            {userImage ? (
              <Image
                src={userImage}
                alt={displayName}
                width={67}
                height={67}
                priority={false}
                loading="lazy"
                unoptimized
                className="h-16.75 w-16.75 rounded-full object-cover shadow-md dark:border-white"
              />
            ) : (
              <div className="flex h-18 w-18 items-center justify-center rounded-full border-2 border-black bg-white text-2xl font-black shadow-md text-white dark:border-white dark:bg-slate-800 dark:text-white">
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
            <div className="mt-3 w-full border-t border-white/40 dark:border-white/40" />
          </div>

          <div className="mt-8 space-y-3">
            <Link
              href="/"
              className="flex w-full items-center gap-3 font-semibold rounded-xl px-2 py-2 text-left text-[16px] text-white transition-all duration-200 hover:bg-[#04b8b5] hover:text-white dark:text-white/80 dark:hover:bg-[#329d9c] dark:hover:text-slate-950"
            >
              <House className="h-5 w-5" />
              <span>{t.home}</span>
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
              <span>{t.dashboard}</span>
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
              <span className={sidebarTab === "saved" ? "text-white" : ""}>{t.savedReports}</span>
            </button>

          </div>

          <div className="mt-auto pt-10">
            <div className="mb-4 w-full border-t border-white/30 dark:border-white/15" />

            <form action={signOutToHome}>
              <button className="flex items-center gap-2 text-[17px] text-red-600 font-bold transition hover:opacity-90">
                <LogOut className="h-6 w-6 text-red-600 font-bold dark:text-white" />
                <span>{t.logout}</span>
              </button>
            </form>
          </div>
        </aside>

        <section className="h-[calc(100vh-4.75rem)] min-h-0 overflow-y-auto px-5 py-1 md:px-7">
          

          <div className="min-h-full w-full rounded-none     dark:bg-[linear-gradient(180deg,#150d1b_0%,#1c1024_48%,#140d1c_100%)] md:p-8">  
            
              {showBack && sidebarTab !== "chat" ? (
            <button
              type="button"
              onClick={handleBack}
              className="mb-3 inline-flex items-center text-pink-600 transition hover:opacity-80 dark:text-white"
              aria-label={t.back}
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2.2} />
            </button>
          ) : null}
            {sidebarTab === "dashboard" && step === 1 ? (
              <div className="space-y-6">
                <h1 className="text-4xl font-black text-[#111827] dark:text-white">
                  {ui.welcomeBack(displayName)}
                </h1>
                <PathSelector
                  items={careerLevels.map((level) => {
                    const localized = localizeCareerLevel(level, language);
                    return {
                      id: level.id,
                      title: localized.label,
                      description: localized.description,
                      badge: ui.levelBadge,
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
                  <div className="rounded-[10px] border border-[#dfe5ef] bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-3xl font-black text-[#111827] dark:text-white">
                      {ui.assessmentTitle}
                    </h2>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
                      {ui.assessmentDescription}
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {assessmentQuestions.map((question, index) => (
                      <div
                        key={question.id}
                        className="rounded-[10px] border border-[#dfe5ef] bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                      >
                        <p className="text-sm font-black uppercase tracking-[0.22em] text-slate-400">
                          {ui.questionLabel(index + 1)}
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
                                className={`cursor-pointer rounded-[18px] border px-4 py-3 text-left text-sm font-medium transition ${
                                  selected
                                    ? "border-blue-400 bg-blue-50 text-blue-700 dark:border-sky-500 dark:bg-sky-950/40 dark:text-sky-300"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 dark:hover:bg-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
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
                      className="rounded-full bg-[#329d9c] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#096d6b] disabled:opacity-60"
                    >
                      {isAssessing ? ui.analyzing : ui.analyzeWithAi}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAssessment(false);
                        setAssessmentAnswers({});
                        setAssessmentResult(null);
                      }}
                      className="rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:bg-[#329d9c] dark:border-slate-700 dark:text-slate-200"
                    >
                      {ui.backTo10thOptions}
                    </button>
                  </div>

                  {assessmentResult ? (
                    <div className="rounded-xl border border-[#dfe5ef] bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                      <h3 className="text-2xl font-black text-[#111827] dark:text-white">
                        {ui.assessmentResultTitle}
                      </h3>
                      <div className="mt-4 rounded-[20px] border border-blue-200 bg-blue-50 p-5 dark:border-sky-800 dark:bg-sky-950/30">
                        <p className="text-xs font-black uppercase tracking-[0.24em] text-blue-600 dark:text-sky-300">
                          {ui.bestFieldToChoose}
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
                          className="mt-4 rounded-full bg-[#329d9c] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#057472]"
                        >
                          {ui.chooseThisField}
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
                            className="cursor-pointer rounded-[20px] border border-[#dfe5ef] bg-slate-50 p-5 text-left transition hover:border-blue-300 hover:bg-slate-800 dark:border-slate-700 dark:bg-slate-950"
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
                            title: ui.assessmentTitle,
                            description: ui.assessmentDescription,
                            badge: ui.assessmentTitle,
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
                          : ui.levelBadge,
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
                    description: `${localized.focus}. ${ui.durationLabel}: ${specialization.duration}.`,
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
                  <h2 className="text-4xl font-black text-[#111827] dark:text-white">{t.savedReports}</h2>
                  <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                    {ui.reportsSaved(reports.length)}
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
                          className="flex-1 cursor-pointer text-left"
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
                          className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-rose-200 text-rose-600 transition hover:bg-rose-50 disabled:opacity-60 dark:border-rose-900/50 dark:text-rose-300 dark:hover:bg-rose-950/30"
                          aria-label={ui.deleteSavedReport}
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
                      className="rounded-full bg-[#329d9c]  hover:bg-[#0d7271] cursor-pointer px-5 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-60"
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
                  {t.noSavedReports}
                </p>
              </div>
            ) : null}

            {sidebarTab === "chat" ? (
              <div className="w-full   space-y-3">
               
                <CareerChatbot key={`dashboard-chat-${language}`} language={language} />
              </div>
            ) : null}
          </div>
        </section>
      </div>

      <div className="group fixed right-5 top-1/2 -translate-y-1/2" style={{ zIndex: isSidebarOpen ? 20 : 40 }}>
        <div className="pointer-events-none absolute right-16 top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-[#329d9c] px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 dark:bg-[#329d9c]">
          {ui.chatTooltip}
        </div>
        <button
          type="button"
          onClick={openChat}
          className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[#329d9c] text-white shadow-lg transition hover:scale-105 hover:opacity-95 dark:bg-slate-800 animate-pulse"
          aria-label={ui.openChat}
        >
          <BotMascotIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}
