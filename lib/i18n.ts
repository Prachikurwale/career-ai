import { CareerLevel, CareerPath, CareerSpecialization } from "../app/data/careers";
import type { LanguageCode } from "../types/career";

type TranslationSet = Record<LanguageCode, string>;

type DashboardStrings = {
  languageStepBadge: string;
  selectLanguageTitle: string;
  selectLanguageDescription: string;
  dashboard: string;
  home: string;
  login: string;
  logout: string;
  workspace: string;
  workspaceDescription: string;
  generateNewPath: string;
  progress: string;
  stepLabel: string;
  savedReports: string;
  noSavedReports: string;
  guidedPathfinder: string;
  guidedPathfinderDescription: string;
  askFollowup: string;
  askFollowupDescription: string;
  brand: string;
  navigatorTitle: string;
  navigatorDescription: string;
  back: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  selection: string;
  savedPath: string;
  path: string;
  specialization: string;
  saveReport: string;
  saving: string;
  freshRoadmap: string;
  savedRoadmap: string;
  emptyReportTitle: string;
  emptyReportDescription: string;
  chatTitle: string;
  chatDescription: string;
  chatStatus: string;
  askPlaceholder: string;
  send: string;
  aiCounselor: string;
  you: string;
  aiThinking: string;
  generatingReport: string;
  generatingSubtitle: string;
  semesterSyllabus: string;
  collegeList: string;
  salaryBenchmarks: string;
  aiMasterReport: string;
  duration: string;
  exportPdf: string;
  semesterBreakdown: string;
  semester: string;
  feesAndSalary: string;
  government: string;
  private: string;
  fresher2026: string;
  midLevelGrowth: string;
  skillSynergy: string;
  frontend: string;
  ai: string;
  design: string;
  topColleges: string;
  careerOpportunities: string;
  skillsRequired: string;
  growthPath: string;
  howToUse: string;
  howToUseDescription: string;
  reportError: string;
  saveError: string;
  chatError: string;
  analyzingQuestion: string;
  askAi: string;
  close: string;
};

export const languageOptions: Array<{
  id: LanguageCode;
  label: string;
  nativeLabel: string;
}> = [
  { id: "english", label: "English", nativeLabel: "English" },
  { id: "hindi", label: "Hindi", nativeLabel: "हिंदी" },
  { id: "marathi", label: "Marathi", nativeLabel: "मराठी" },
];

const strings: Record<LanguageCode, DashboardStrings> = {
  english: {
    languageStepBadge: "Step 0",
    selectLanguageTitle: "Choose your preferred language",
    selectLanguageDescription: "Pick a language first. The dashboard, chatbot, and AI report will follow it.",
    dashboard: "Dashboard",
    home: "Home",
    login: "Login",
    logout: "Logout",
    workspace: "Career Workspace",
    workspaceDescription: "Generate deep AI reports, revisit saved roadmaps, and ask follow-up questions.",
    generateNewPath: "Generate New Path",
    progress: "Progress",
    stepLabel: "Step",
    savedReports: "Saved Reports",
    noSavedReports: "No reports saved yet. Generate one and keep it for later comparison.",
    guidedPathfinder: "Guided pathfinder",
    guidedPathfinderDescription: "Drill down from education level to a specialization with zero guesswork.",
    askFollowup: "Ask follow-up questions",
    askFollowupDescription: "Use the chatbot after generating a report to compare colleges, fees, and next moves.",
    brand: "CareerAI",
    navigatorTitle: "Interactive AI Career Navigator",
    navigatorDescription: "Choose your level, narrow the path, select a specialization, and let the AI generate a Maharashtra-focused roadmap with fees, semester subjects, salaries, and growth paths.",
    back: "Back",
    step1: "Level",
    step2: "Path",
    step3: "Specialization",
    step4: "AI Report",
    selection: "Selection:",
    savedPath: "Saved path",
    path: "Path",
    specialization: "Specialization",
    saveReport: "Save Report",
    saving: "Saving...",
    freshRoadmap: "Fresh AI-generated roadmap",
    savedRoadmap: "Saved roadmap",
    emptyReportTitle: "Your AI report will appear here",
    emptyReportDescription: "Select a specialization to trigger the full report engine, or open a saved roadmap from the sidebar.",
    chatTitle: "Ask the AI counselor anything",
    chatDescription: "Free-form guidance for streams, exams, fees, colleges, placements, and career fit.",
    chatStatus: "Live AI guidance",
    askPlaceholder: "Ask about colleges, fees, exams, salaries, or best path for your goals...",
    send: "Send",
    aiCounselor: "AI Counselor",
    you: "You",
    aiThinking: "AI Thinking",
    generatingReport: "Generating AI master report",
    generatingSubtitle: "Bharat Career Guru is analyzing your path, fees, semester structure, colleges, and salary outlook.",
    semesterSyllabus: "Semester syllabus",
    collegeList: "Maharashtra college list",
    salaryBenchmarks: "2026 salary benchmarks",
    aiMasterReport: "AI Master Report",
    duration: "Duration",
    exportPdf: "Export PDF",
    semesterBreakdown: "Semester Breakdown",
    semester: "Semester",
    feesAndSalary: "Fees and Salary",
    government: "Government",
    private: "Private",
    fresher2026: "2026 Fresher",
    midLevelGrowth: "Mid-Level Growth",
    skillSynergy: "Skill Synergy",
    frontend: "Frontend",
    ai: "AI",
    design: "Design",
    topColleges: "Top Colleges in Maharashtra",
    careerOpportunities: "Career Opportunities",
    skillsRequired: "Skills Required",
    growthPath: "Growth Path",
    howToUse: "How To Use This Report",
    howToUseDescription: "Compare colleges, verify eligibility and entrance exams on official sites, then use the skills and growth roadmap to build your portfolio step by step.",
    reportError: "Could not generate the AI report right now.",
    saveError: "Could not save the report right now.",
    chatError: "I could not reach the AI service right now. Please try again in a moment.",
    analyzingQuestion: "Analyzing your question with Bharat Career Guru...",
    askAi: "Ask AI",
    close: "Close",
  },
  hindi: {
    languageStepBadge: "स्टेप 0",
    selectLanguageTitle: "अपनी पसंदीदा भाषा चुनें",
    selectLanguageDescription: "पहले भाषा चुनें। डैशबोर्ड, चैटबॉट और AI रिपोर्ट उसी भाषा में होंगे।",
    dashboard: "डैशबोर्ड",
    home: "Home",
    login: "Login",
    logout: "Logout",
    workspace: "करियर वर्कस्पेस",
    workspaceDescription: "गहरी AI रिपोर्ट बनाइए, सेव किए गए रोडमैप फिर से देखिए और आगे के सवाल पूछिए।",
    generateNewPath: "नया पाथ बनाएं",
    progress: "प्रगति",
    stepLabel: "स्टेप",
    savedReports: "सेव की गई रिपोर्ट्स",
    noSavedReports: "अभी कोई रिपोर्ट सेव नहीं है। एक रिपोर्ट बनाइए और बाद में तुलना के लिए रखिए।",
    guidedPathfinder: "गाइडेड पाथफाइंडर",
    guidedPathfinderDescription: "बिना अनुमान के शिक्षा स्तर से स्पेशलाइजेशन तक पहुँचिए।",
    askFollowup: "आगे के सवाल पूछें",
    askFollowupDescription: "रिपोर्ट बनने के बाद चैटबॉट से कॉलेज, फीस और अगले कदम तुलना करें।",
    brand: "भारत करियर गुरु",
    navigatorTitle: "इंटरैक्टिव AI करियर नेविगेटर",
    navigatorDescription: "अपना स्तर चुनें, सही पाथ चुनें, स्पेशलाइजेशन चुनें और AI से महाराष्ट्र-केंद्रित रोडमैप पाएं।",
    back: "वापस",
    step1: "स्तर",
    step2: "पाथ",
    step3: "स्पेशलाइजेशन",
    step4: "AI रिपोर्ट",
    selection: "चयन:",
    savedPath: "सेव किया गया पाथ",
    path: "पाथ",
    specialization: "स्पेशलाइजेशन",
    saveReport: "रिपोर्ट सेव करें",
    saving: "सेव हो रही है...",
    freshRoadmap: "नई AI रिपोर्ट",
    savedRoadmap: "सेव किया गया रोडमैप",
    emptyReportTitle: "आपकी AI रिपोर्ट यहाँ दिखाई देगी",
    emptyReportDescription: "रिपोर्ट बनाने के लिए स्पेशलाइजेशन चुनें या साइडबार से सेव की गई रिपोर्ट खोलें।",
    chatTitle: "AI काउंसलर से कुछ भी पूछें",
    chatDescription: "स्ट्रीम, एग्जाम, फीस, कॉलेज, प्लेसमेंट और करियर फिट पर खुली बातचीत।",
    chatStatus: "लाइव AI गाइडेंस",
    askPlaceholder: "कॉलेज, फीस, एग्जाम, सैलरी या आपके लिए सही पाथ के बारे में पूछें...",
    send: "भेजें",
    aiCounselor: "AI काउंसलर",
    you: "आप",
    aiThinking: "AI सोच रहा है",
    generatingReport: "AI मास्टर रिपोर्ट बन रही है",
    generatingSubtitle: "भारत करियर गुरु आपके पाथ, फीस, सेमेस्टर, कॉलेज और सैलरी का विश्लेषण कर रहा है।",
    semesterSyllabus: "सेमेस्टर सिलेबस",
    collegeList: "महाराष्ट्र कॉलेज सूची",
    salaryBenchmarks: "2026 सैलरी बेंचमार्क",
    aiMasterReport: "AI मास्टर रिपोर्ट",
    duration: "अवधि",
    exportPdf: "PDF एक्सपोर्ट करें",
    semesterBreakdown: "सेमेस्टर विवरण",
    semester: "सेमेस्टर",
    feesAndSalary: "फीस और सैलरी",
    government: "सरकारी",
    private: "प्राइवेट",
    fresher2026: "2026 फ्रेशर",
    midLevelGrowth: "मिड-लेवल ग्रोथ",
    skillSynergy: "स्किल सिनर्जी",
    frontend: "फ्रंटएंड",
    ai: "AI",
    design: "डिज़ाइन",
    topColleges: "महाराष्ट्र के टॉप कॉलेज",
    careerOpportunities: "करियर अवसर",
    skillsRequired: "ज़रूरी स्किल्स",
    growthPath: "ग्रोथ पाथ",
    howToUse: "इस रिपोर्ट का उपयोग कैसे करें",
    howToUseDescription: "कॉलेज तुलना करें, पात्रता और एंट्रेंस एग्जाम आधिकारिक साइट पर जांचें, फिर स्किल और ग्रोथ रोडमैप के अनुसार पोर्टफोलियो बनाएं।",
    reportError: "अभी AI रिपोर्ट नहीं बन सकी।",
    saveError: "अभी रिपोर्ट सेव नहीं हो सकी।",
    chatError: "अभी AI सेवा तक पहुँचना संभव नहीं हुआ। कृपया थोड़ी देर बाद फिर कोशिश करें।",
    analyzingQuestion: "भारत करियर गुरु आपके सवाल का विश्लेषण कर रहा है...",
    askAi: "Ask AI",
    close: "Close",
  },
  marathi: {
    languageStepBadge: "स्टेप 0",
    selectLanguageTitle: "तुमची पसंतीची भाषा निवडा",
    selectLanguageDescription: "सुरुवातीला भाषा निवडा. डॅशबोर्ड, चॅटबॉट आणि AI रिपोर्ट त्याच भाषेत दिसतील.",
    dashboard: "डॅशबोर्ड",
    home: "Home",
    login: "Login",
    logout: "Logout",
    workspace: "करिअर वर्कस्पेस",
    workspaceDescription: "सखोल AI रिपोर्ट तयार करा, सेव केलेले रोडमॅप पुन्हा पाहा आणि पुढचे प्रश्न विचारा.",
    generateNewPath: "नवीन पाथ तयार करा",
    progress: "प्रगती",
    stepLabel: "स्टेप",
    savedReports: "सेव केलेले रिपोर्ट्स",
    noSavedReports: "अजून कोणताही रिपोर्ट सेव केलेला नाही. एक रिपोर्ट तयार करा आणि नंतर तुलना करा.",
    guidedPathfinder: "गाईडेड पाथफाइंडर",
    guidedPathfinderDescription: "अंदाज न लावता शिक्षण स्तरापासून स्पेशलायझेशनपर्यंत जा.",
    askFollowup: "पुढील प्रश्न विचारा",
    askFollowupDescription: "रिपोर्टनंतर चॅटबॉट वापरून कॉलेज, फी आणि पुढचे पर्याय तुलना करा.",
    brand: "भारत करिअर गुरु",
    navigatorTitle: "इंटरॅक्टिव AI करिअर नेव्हिगेटर",
    navigatorDescription: "तुमचा स्तर निवडा, योग्य पाथ निवडा, स्पेशलायझेशन निवडा आणि AI कडून महाराष्ट्र-केंद्रित रोडमॅप मिळवा.",
    back: "मागे",
    step1: "स्तर",
    step2: "पाथ",
    step3: "स्पेशलायझेशन",
    step4: "AI रिपोर्ट",
    selection: "निवड:",
    savedPath: "सेव केलेला पाथ",
    path: "पाथ",
    specialization: "स्पेशलायझेशन",
    saveReport: "रिपोर्ट सेव करा",
    saving: "सेव होत आहे...",
    freshRoadmap: "नवीन AI रोडमॅप",
    savedRoadmap: "सेव केलेला रोडमॅप",
    emptyReportTitle: "तुमचा AI रिपोर्ट येथे दिसेल",
    emptyReportDescription: "रिपोर्ट तयार करण्यासाठी स्पेशलायझेशन निवडा किंवा साइडबारमधून सेव केलेला रोडमॅप उघडा.",
    chatTitle: "AI काउंसलरला काहीही विचारा",
    chatDescription: "स्ट्रीम, परीक्षा, फी, कॉलेज, प्लेसमेंट आणि करिअर फिटबद्दल मुक्त मार्गदर्शन.",
    chatStatus: "लाइव्ह AI मार्गदर्शन",
    askPlaceholder: "कॉलेज, फी, परीक्षा, पगार किंवा तुमच्यासाठी योग्य पाथबद्दल विचारा...",
    send: "पाठवा",
    aiCounselor: "AI काउंसलर",
    you: "तुम्ही",
    aiThinking: "AI विचार करत आहे",
    generatingReport: "AI मास्टर रिपोर्ट तयार होत आहे",
    generatingSubtitle: "भारत करिअर गुरु तुमचा पाथ, फी, सेमिस्टर, कॉलेज आणि पगाराचा अंदाज तपासत आहे.",
    semesterSyllabus: "सेमिस्टर अभ्यासक्रम",
    collegeList: "महाराष्ट्र कॉलेज यादी",
    salaryBenchmarks: "2026 पगार बेंचमार्क",
    aiMasterReport: "AI मास्टर रिपोर्ट",
    duration: "कालावधी",
    exportPdf: "PDF एक्सपोर्ट करा",
    semesterBreakdown: "सेमिस्टर तपशील",
    semester: "सेमिस्टर",
    feesAndSalary: "फी आणि पगार",
    government: "शासकीय",
    private: "खाजगी",
    fresher2026: "2026 फ्रेशर",
    midLevelGrowth: "मिड-लेव्हल वाढ",
    skillSynergy: "स्किल सिनर्जी",
    frontend: "फ्रंटएंड",
    ai: "AI",
    design: "डिझाइन",
    topColleges: "महाराष्ट्रातील टॉप कॉलेज",
    careerOpportunities: "करिअर संधी",
    skillsRequired: "आवश्यक स्किल्स",
    growthPath: "ग्रोथ पाथ",
    howToUse: "हा रिपोर्ट कसा वापरावा",
    howToUseDescription: "कॉलेज तुलना करा, पात्रता आणि प्रवेश परीक्षा अधिकृत साइटवर तपासा आणि नंतर स्किल व ग्रोथ रोडमॅपनुसार पोर्टफोलिओ तयार करा.",
    reportError: "आत्ता AI रिपोर्ट तयार होऊ शकला नाही.",
    saveError: "आत्ता रिपोर्ट सेव होऊ शकला नाही.",
    chatError: "आत्ता AI सेवेशी संपर्क होऊ शकला नाही. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा.",
    analyzingQuestion: "भारत करिअर गुरु तुमच्या प्रश्नाचे विश्लेषण करत आहे...",
    askAi: "Ask AI",
    close: "Close",
  },
};

const careerLabelTranslations: Record<string, TranslationSet> = {
  "10th": { english: "10th Standard", hindi: "10वीं कक्षा", marathi: "10वी" },
  "12th-science": { english: "12th Science", hindi: "12वीं साइंस", marathi: "12वी सायन्स" },
  "12th-commerce": { english: "12th Commerce", hindi: "12वीं कॉमर्स", marathi: "12वी कॉमर्स" },
  "12th-arts": { english: "12th Arts", hindi: "12वीं आर्ट्स", marathi: "12वी आर्ट्स" },
  graduate: { english: "Graduate", hindi: "ग्रेजुएट", marathi: "पदवीधर" },
  iti: { english: "ITI", hindi: "आईटीआई", marathi: "आयटीआय" },
  "diploma-engineering": { english: "Diploma Engineering", hindi: "डिप्लोमा इंजीनियरिंग", marathi: "डिप्लोमा इंजिनिअरिंग" },
  "police-defense": { english: "Police & Defense", hindi: "पुलिस और रक्षा", marathi: "पोलीस आणि संरक्षण" },
  "skill-courses": { english: "Skill Courses", hindi: "स्किल कोर्सेस", marathi: "कौशल्य अभ्यासक्रम" },
  "engineering-degree": { english: "Engineering Degree", hindi: "इंजीनियरिंग डिग्री", marathi: "इंजिनिअरिंग पदवी" },
  "medical-life-sciences": { english: "Medical & Life Sciences", hindi: "मेडिकल और लाइफ साइंसेस", marathi: "मेडिकल आणि लाइफ सायन्स" },
  "science-computing": { english: "Science & Computing", hindi: "साइंस और कंप्यूटिंग", marathi: "सायन्स आणि कम्प्युटिंग" },
  "finance-accounts": { english: "Finance & Accounts", hindi: "फाइनेंस और अकाउंट्स", marathi: "फायनान्स आणि अकाउंट्स" },
  "management-business": { english: "Management & Business", hindi: "मैनेजमेंट और बिजनेस", marathi: "मॅनेजमेंट आणि बिझनेस" },
  "design-media": { english: "Design & Media", hindi: "डिज़ाइन और मीडिया", marathi: "डिझाइन आणि मीडिया" },
  "public-service-humanities": { english: "Public Service & Humanities", hindi: "पब्लिक सर्विस और ह्यूमैनिटीज", marathi: "पब्लिक सर्व्हिस आणि ह्युमॅनिटीज" },
  "postgraduate-tech": { english: "Postgraduate Tech", hindi: "पोस्टग्रेजुएट टेक", marathi: "पदव्युत्तर टेक" },
  "postgraduate-management": { english: "Postgraduate Management", hindi: "पोस्टग्रेजुएट मैनेजमेंट", marathi: "पदव्युत्तर मॅनेजमेंट" },
};

const careerDescriptionTranslations: Record<string, TranslationSet> = {
  "10th": {
    english: "Explore diploma, ITI, defence, and short-term career-start options.",
    hindi: "डिप्लोमा, आईटीआई, रक्षा और शॉर्ट-टर्म करियर विकल्प देखें।",
    marathi: "डिप्लोमा, आयटीआय, संरक्षण आणि अल्पकालीन करिअर पर्याय पाहा.",
  },
  "12th-science": {
    english: "Compare engineering, medical, pharmacy, and computing-focused degrees.",
    hindi: "इंजीनियरिंग, मेडिकल, फार्मेसी और कंप्यूटिंग आधारित डिग्री की तुलना करें।",
    marathi: "इंजिनिअरिंग, मेडिकल, फार्मसी आणि कम्प्युटिंग डिग्रींची तुलना करा.",
  },
  "12th-commerce": {
    english: "Navigate finance, management, law, and digital business pathways.",
    hindi: "फाइनेंस, मैनेजमेंट, लॉ और डिजिटल बिजनेस पाथ देखें।",
    marathi: "फायनान्स, मॅनेजमेंट, लॉ आणि डिजिटल बिझनेस पाथ पाहा.",
  },
  "12th-arts": {
    english: "Discover media, design, public service, and humanities-led careers.",
    hindi: "मीडिया, डिज़ाइन, पब्लिक सर्विस और ह्यूमैनिटीज आधारित करियर खोजें।",
    marathi: "मीडिया, डिझाइन, पब्लिक सर्व्हिस आणि ह्युमॅनिटीज करिअर शोधा.",
  },
  graduate: {
    english: "Plan postgraduate, management, research, and advanced upskilling routes.",
    hindi: "पोस्टग्रेजुएशन, मैनेजमेंट, रिसर्च और एडवांस अपस्किलिंग की योजना बनाएं।",
    marathi: "पदव्युत्तर, मॅनेजमेंट, रिसर्च आणि प्रगत अपस्किलिंग मार्ग ठरवा.",
  },
};

export function getTranslation(language: LanguageCode) {
  return strings[language];
}

export function parseLanguageCode(value?: string | null): LanguageCode | null {
  if (!value) {
    return null;
  }

  return languageOptions.some((option) => option.id === value)
    ? (value as LanguageCode)
    : null;
}

export function localizeCareerLevel(level: CareerLevel, language: LanguageCode) {
  return {
    ...level,
    label: careerLabelTranslations[level.id]?.[language] ?? level.label,
    shortLabel: careerLabelTranslations[level.id]?.[language] ?? level.shortLabel,
    description: careerDescriptionTranslations[level.id]?.[language] ?? level.description,
  };
}

export function localizeCareerPath(path: CareerPath, language: LanguageCode) {
  return {
    ...path,
    name: careerLabelTranslations[path.id]?.[language] ?? path.name,
  };
}

export function localizeCareerSpecialization(
  specialization: CareerSpecialization,
  language: LanguageCode,
) {
  const name = careerLabelTranslations[specialization.id]?.[language] ?? specialization.name;
  const focus = careerDescriptionTranslations[specialization.id]?.[language] ?? specialization.focus;
  return { ...specialization, name, focus };
}
