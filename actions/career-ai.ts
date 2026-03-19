"use server";

import { auth } from "../auth";
import {
  getLevelById,
  getPathById,
  getPathsByLevel,
  getSpecializationById,
} from "../app/data/careers";
import connectDB from "../lib/db";
import { CAREER_CHART_SOURCE } from "../lib/career-chart-source";
import { getTranslation } from "../lib/i18n";
import { enforceRateLimit } from "../lib/rate-limit";
import CareerHistory from "../models/CareerHistory";
import type { LanguageCode } from "../types/career";
import type { CareerChartOutline } from "../types/career-chart";

export type CareerReport = {
  title: string;
  duration: string;
  semester_breakdown: Array<{ semester: string; subjects: string[] }>;
  fees: {
    government: string;
    private: string;
  };
  top_colleges_maharashtra: string[];
  career_opportunities: string[];
  salary_2026: {
    fresher: string;
    mid_level: string;
  };
  skills_required: string[];
  skill_synergy: {
    frontend: string;
    ai: string;
    design: string;
  };
  growth_path: string[];
};

type SelectionInput = {
  language: LanguageCode;
  levelId: string;
  pathId: string;
  specializationId: string;
};

const NVIDIA_ENDPOINT = "https://integrate.api.nvidia.com/v1/chat/completions";
const NVIDIA_MODEL = "meta/llama-3.1-405b-instruct";

function getApiKey() {
  const apiKey = process.env.NVIDIA_API_KEY;

  if (!apiKey) {
    throw new Error("NVIDIA_API_KEY is missing");
  }

  return apiKey;
}

async function postToNvidia(messages: Array<{ role: string; content: string }>) {
  const response = await fetch(NVIDIA_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: NVIDIA_MODEL,
      messages,
      temperature: 0.4,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`NVIDIA API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content as string | undefined;
}

function sanitizeReport(report: CareerReport): CareerReport {
  return {
    title: report.title,
    duration: report.duration,
    semester_breakdown: report.semester_breakdown?.length
      ? report.semester_breakdown
      : [{ semester: "1", subjects: ["Foundation subjects to be confirmed by college syllabus"] }],
    fees: {
      government:
        report.fees?.government ?? "Approx. government fee varies by institute",
      private: report.fees?.private ?? "Approx. private fee varies by institute",
    },
    top_colleges_maharashtra: report.top_colleges_maharashtra ?? [],
    career_opportunities: report.career_opportunities ?? [],
    salary_2026: {
      fresher: report.salary_2026?.fresher ?? "Varies by city and role",
      mid_level: report.salary_2026?.mid_level ?? "Varies by company and experience",
    },
    skills_required: report.skills_required ?? [],
    skill_synergy: {
      frontend: report.skill_synergy?.frontend ?? "",
      ai: report.skill_synergy?.ai ?? "",
      design: report.skill_synergy?.design ?? "",
    },
    growth_path: report.growth_path ?? [],
  };
}

function extractJsonObject(rawContent: string) {
  const fencedMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fencedMatch?.[1]?.trim() ?? rawContent.trim();

  const firstBrace = candidate.indexOf("{");
  const lastBrace = candidate.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error("AI did not return a valid JSON object.");
  }

  return candidate.slice(firstBrace, lastBrace + 1);
}

function parseCareerReport(rawContent: string): CareerReport {
  const jsonString = extractJsonObject(rawContent)
    .replace(/^\uFEFF/, "")
    .trim();

  try {
    return JSON.parse(jsonString) as CareerReport;
  } catch {
    throw new Error(
      "AI returned an invalid report format. Please try again.",
    );
  }
}

function parseAiJson<T>(rawContent: string): T {
  const jsonString = extractJsonObject(rawContent)
    .replace(/^\uFEFF/, "")
    .trim();

  try {
    return JSON.parse(jsonString) as T;
  } catch {
    throw new Error("AI returned an invalid JSON format. Please try again.");
  }
}

export async function getCareerGuidance(userMessage: string) {
  const content = await postToNvidia([
    {
      role: "system",
      content:
        "You are Bharat Career Guru, a practical AI counselor for Indian students. Answer with clear guidance around streams, exams, colleges, fees, and job growth.",
    },
    { role: "user", content: userMessage },
  ]);

  return content ?? "No response received from the AI assistant.";
}

export async function generateCareerChartOutline(
  language: LanguageCode = "english",
) {
  const session = await auth();
  const rateLimitKey = session?.user?.email ?? "anonymous-career-chart";
  const rateLimit = enforceRateLimit(rateLimitKey, 4, 60_000);

  if (!rateLimit.ok) {
    throw new Error("Too many career chart requests. Please wait a minute and try again.");
  }

  const languageLabel = {
    english: "English",
    hindi: "Hindi in Devanagari script",
    marathi: "Marathi in Devanagari script",
  }[language];

  const prompt = `
You are Bharat Career Guru.

Your task is to convert the following career chart transcription into a deep, structured hierarchical outline.

Critical rules:
- Use ONLY the source text below. Do not invent new branches.
- Preserve durations exactly when they are present in the source.
- Organize the response strictly into these 4 sections:
  1. Level 1: 10th (S.S.C.) Options
  2. Level 2: 12th (H.S.C.) Streams
  3. Level 3: Undergraduate / Professional Courses
  4. Level 4: Post-Graduate / Career Outcomes
- Make the content deep and detailed.
- The "bullets" arrays must contain nested bullet lines using leading spaces and "-".
- For Level 2, clearly separate 12th Commerce, 12th Arts, and 12th Science, and inside Science separate PCMB, PCB, and PCM.
- In Level 2, nest the actual stream branches under each stream heading so a user can click a stream and keep drilling down into degrees and next outcomes.
- For Level 3 and Level 4, group branches under the right stream.
- IMPORTANT: In Level 3, whenever a bachelor's degree, diploma, or licence has a known next step in the source, nest that next step directly under it so users can click deeper after selecting the course.
- Level 4 should still summarize the post-graduate, exam, and career outcomes grouped by stream.
- Add a glossary from the shortforms list as a clean two-column table source using JSON items.
- Write ALL user-facing text in ${languageLabel}.
- Return strict JSON only.

Return exactly this schema:
{
  "pageTitle": "",
  "pageSubtitle": "",
  "note": "",
  "sections": [
    {
      "id": "level-1",
      "sidebarLabel": "",
      "title": "",
      "description": "",
      "bullets": ["- ...", "  - ..."]
    },
    {
      "id": "level-2",
      "sidebarLabel": "",
      "title": "",
      "description": "",
      "bullets": []
    },
    {
      "id": "level-3",
      "sidebarLabel": "",
      "title": "",
      "description": "",
      "bullets": []
    },
    {
      "id": "level-4",
      "sidebarLabel": "",
      "title": "",
      "description": "",
      "bullets": []
    }
  ],
  "glossaryTitle": "",
  "glossaryDescription": "",
  "glossary": [
    { "shortform": "", "meaning": "" }
  ]
}

Source transcription:
${CAREER_CHART_SOURCE}
  `;

  const content = await postToNvidia([
    {
      role: "system",
      content:
        "You are an expert Indian education and career mapping assistant. Return strict JSON only with no markdown fences.",
    },
    { role: "user", content: prompt },
  ]);

  if (!content) {
    throw new Error("No career chart outline returned by AI.");
  }

  return parseAiJson<CareerChartOutline>(content);
}

export async function generateCareerReport(selection: SelectionInput) {
  const session = await auth();
  const rateLimitKey = session?.user?.email ?? "anonymous-career-report";
  const rateLimit = enforceRateLimit(rateLimitKey, 6, 60_000);

  if (!rateLimit.ok) {
    throw new Error("Too many report requests. Please wait a minute and try again.");
  }

  const level = getLevelById(selection.levelId);
  const path = getPathById(selection.pathId);
  const specialization = getSpecializationById(
    selection.pathId,
    selection.specializationId,
  );

  if (!level || !path || !specialization) {
    throw new Error("Invalid career selection");
  }

  const languageInstructions = {
    english: "Write the entire report in English.",
    hindi: "Write the entire report in Hindi using Devanagari script.",
    marathi: "Write the entire report in Marathi using Devanagari script.",
  }[selection.language];

  const prompt = `
Generate a structured JSON report for this Indian student career selection.

Level: ${level.label}
Path: ${path.name}
Specialization: ${specialization.name}
Focus: ${specialization.focus}
Expected outcome: ${specialization.outcome}
Duration hint: ${specialization.duration}

Requirements:
- Focus on India.
- Include Maharashtra and Nashik colleges where relevant.
- Give realistic approximate 2026 salary ranges.
- Mention modern skills including AI, React, product thinking, and UI design where relevant.
- Use INR with the rupee symbol.
- ${languageInstructions}
- Output only valid JSON.

Return exactly this schema:
{
  "title": "",
  "duration": "",
  "semester_breakdown": [
    { "semester": "1", "subjects": [] }
  ],
  "fees": {
    "government": "",
    "private": ""
  },
  "top_colleges_maharashtra": [],
  "career_opportunities": [],
  "salary_2026": {
    "fresher": "",
    "mid_level": ""
  },
  "skills_required": [],
  "skill_synergy": {
    "frontend": "",
    "ai": "",
    "design": ""
  },
  "growth_path": []
}
  `;

  const content = await postToNvidia([
    {
      role: "system",
      content:
        "You are Bharat Career Guru, an Indian career counseling AI. Return strict JSON only, with no markdown fences or commentary.",
    },
    { role: "user", content: prompt },
  ]);

  if (!content) {
    throw new Error("No report returned by AI");
  }

  const parsed = parseCareerReport(content);
  return sanitizeReport(parsed);
}

export async function saveCareerReport(
  selection: SelectionInput,
  report: CareerReport,
) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Please sign in to save reports.");
  }

  const level = getLevelById(selection.levelId);
  const path = getPathById(selection.pathId);
  const specialization = getSpecializationById(
    selection.pathId,
    selection.specializationId,
  );

  if (!level || !path || !specialization) {
    throw new Error("Invalid career selection");
  }

  await connectDB();

  const saved = await CareerHistory.create({
    userEmail: session.user.email,
    userName: session.user.name,
    language: selection.language,
    levelId: level.id,
    levelLabel: level.label,
    pathId: path.id,
    pathName: path.name,
    specializationId: specialization.id,
    specializationName: specialization.name,
    report,
  });

  return JSON.parse(JSON.stringify(saved));
}

export async function askCareerAssistant(
  userMessage: string,
  language: LanguageCode = "english",
) {
  const session = await auth();
  const rateLimitKey = session?.user?.email ?? "anonymous-chat";
  const rateLimit = enforceRateLimit(rateLimitKey, 12, 60_000);

  if (!rateLimit.ok) {
    throw new Error("Too many chat requests. Please wait a moment and try again.");
  }

  const languageLabel = {
    english: "English",
    hindi: "Hindi in Devanagari script",
    marathi: "Marathi in Devanagari script",
  }[language];

  const content = await postToNvidia([
    {
      role: "system",
      content: `
You are Bharat Career Guru, a high-performance AI counselor for Indian students from 10th standard to post-graduation.

Your job:
- Answer free-form student questions about streams, diplomas, ITI, degrees, entrance exams, college selection, fees, scholarships, placements, and career growth.
- Prefer Indian context, with extra relevance for Maharashtra and Nashik when useful.
- Explain how careers connect to Full-Stack Development, React, UI Design, product thinking, or digital skills whenever relevant.
- Be practical, specific, and student-friendly.

When helpful, structure the answer with:
- Best-fit path
- Eligibility
- Entrance exams
- Duration
- Semester or year-wise study topics
- Government vs private fees in INR
- Top colleges in Maharashtra or Nashik
- 2026 fresher salary and growth outlook
- Next steps

Rules:
- If the student is confused, compare 2 or 3 options clearly.
- If exact fee or salary varies, give realistic ranges and say they are approximate.
- Never be vague if the user asks for a recommendation. Give a direct recommendation with reasons.
- Always answer in ${languageLabel}.
      `,
    },
    { role: "user", content: userMessage },
  ]);

  return content ?? getTranslation(language).chatError;
}

export async function analyzeSkillAssessment(
  answers: string[],
  language: LanguageCode = "english",
) {
  const session = await auth();
  const rateLimitKey = session?.user?.email ?? "anonymous-assessment";
  const rateLimit = enforceRateLimit(rateLimitKey, 5, 60_000);

  if (!rateLimit.ok) {
    throw new Error("Too many assessment requests. Please wait a moment and try again.");
  }

  const languageLabel = {
    english: "English",
    hindi: "Hindi in Devanagari script",
    marathi: "Marathi in Devanagari script",
  }[language];

  const tenLevelPaths = getPathsByLevel("10th").map((path) => ({
    id: path.id,
    name: path.name,
    description: path.description,
  }));

  const prompt = `
You are Bharat Career Guru.

Analyze this 10th-standard student skills and interests assessment.
Write all user-facing text in ${languageLabel}.

Available 10th-level path options:
${JSON.stringify(tenLevelPaths)}

Student answers:
${answers.map((answer, index) => `${index + 1}. ${answer}`).join("\n")}

Return strict JSON only in this shape:
{
  "primaryRecommendation": {
    "pathId": "",
    "title": "",
    "reason": ""
  },
  "summary": "",
  "strengths": ["", "", ""],
  "recommendedPaths": [
    { "pathId": "", "title": "", "reason": "" }
  ],
  "nextStep": ""
}

Important:
- You must recommend the single best field to choose in "primaryRecommendation".
- "primaryRecommendation" must be one of the available 10th-level path options.
- Be decisive, not vague.
- "recommendedPaths" can include 2 or 3 supporting alternatives, but the first priority is the one best-fit field.
`;

  const content = await postToNvidia([
    {
      role: "system",
      content:
        "You are an expert Indian student aptitude counselor. Return strict JSON only with no markdown fences.",
    },
    { role: "user", content: prompt },
  ]);

  if (!content) {
    throw new Error("No assessment analysis returned by AI.");
  }

  return parseAiJson<{
    primaryRecommendation: { pathId: string; title: string; reason: string };
    summary: string;
    strengths: string[];
    recommendedPaths: Array<{ pathId: string; title: string; reason: string }>;
    nextStep: string;
  }>(content);
}
