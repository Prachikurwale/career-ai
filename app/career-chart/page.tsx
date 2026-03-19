import { generateCareerChartOutline } from "../../actions/career-ai";
import CareerChartExplorer from "../components/CareerChartExplorer";
import { careerChartFallbackOutline } from "../../lib/career-chart-fallback";
import { parseLanguageCode } from "../../lib/i18n";
import type { CareerChartOutline } from "../../types/career-chart";

type CareerChartPageProps = {
  searchParams?: Promise<{
    lang?: string;
  }>;
};

function isDeepEnough(outline: CareerChartOutline) {
  const level2 = outline.sections.find((section) => section.id === "level-2");
  const level3 = outline.sections.find((section) => section.id === "level-3");

  if (!level2 || !level3) {
    return false;
  }

  const level2NestedBranchCount = level2.bullets.filter((line) => /^\s{4,}-/.test(line)).length;
  const nestedBranchCount = level3.bullets.filter((line) => /^\s{4,}-/.test(line)).length;
  return level2NestedBranchCount >= 8 && nestedBranchCount >= 8;
}

export default async function CareerChartPage({
  searchParams,
}: CareerChartPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const language = parseLanguageCode(resolvedSearchParams?.lang) ?? "english";
  let outline = careerChartFallbackOutline;

  try {
    const aiOutline = await generateCareerChartOutline(language);
    outline = isDeepEnough(aiOutline) ? aiOutline : careerChartFallbackOutline;
  } catch {
    outline = careerChartFallbackOutline;
  }

  return (
    <main className="min-h-screen bg-slate-50 p-4 dark:bg-slate-950 md:p-8">
      <div className="mx-auto max-w-7xl">
        <CareerChartExplorer outline={outline} />
      </div>
    </main>
  );
}
