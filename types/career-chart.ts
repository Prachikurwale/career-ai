export type CareerChartSectionId =
  | "level-1"
  | "level-2"
  | "level-3"
  | "level-4";

export type CareerChartSection = {
  id: CareerChartSectionId;
  sidebarLabel: string;
  title: string;
  description: string;
  bullets: string[];
};

export type CareerChartGlossaryItem = {
  shortform: string;
  meaning: string;
};

export type CareerChartOutline = {
  pageTitle: string;
  pageSubtitle: string;
  note: string;
  sections: CareerChartSection[];
  glossaryTitle: string;
  glossaryDescription: string;
  glossary: CareerChartGlossaryItem[];
};
