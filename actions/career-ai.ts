"use server";

import { auth } from "../auth";
import {
  getLevelById,
  getPathById,
  getSpecializationById,
} from "../app/data/careers";
import connectDB from "../lib/db";
import { getTranslation } from "../lib/i18n";
import { enforceRateLimit } from "../lib/rate-limit";
import CareerHistory from "../models/CareerHistory";
import type { LanguageCode } from "../types/career";

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
