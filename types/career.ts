export type LanguageCode = "english" | "hindi" | "marathi";

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

export type SavedCareerReport = {
  _id: string;
  levelId: string;
  levelLabel: string;
  language: LanguageCode;
  pathId: string;
  pathName: string;
  specializationId: string;
  specializationName: string;
  createdAt: string;
  report: CareerReport;
};
