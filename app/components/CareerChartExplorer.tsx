"use client";

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BookOpenText,
  BriefcaseBusiness,
  ChevronRight,
  GraduationCap,
  Layers3,
  ListChecks,
  ScrollText,
} from "lucide-react";
import type {
  CareerChartGlossaryItem,
  CareerChartOutline,
  CareerChartSection,
} from "../../types/career-chart";

const sectionIcons: Record<CareerChartSection["id"], typeof GraduationCap> = {
  "level-1": GraduationCap,
  "level-2": Layers3,
  "level-3": BookOpenText,
  "level-4": BriefcaseBusiness,
};

type TreeNode = {
  id: string;
  label: string;
  children: TreeNode[];
};

function buildTree(bullets: string[]) {
  const root: TreeNode = { id: "root", label: "root", children: [] };
  const stack: Array<{ indent: number; node: TreeNode }> = [{ indent: -1, node: root }];

  bullets.forEach((line, index) => {
    const indent = line.match(/^(\s*)/)?.[1].length ?? 0;
    const label = line.trim().replace(/^-+\s*/, "");
    const node: TreeNode = {
      id: `${index}-${label}`,
      label,
      children: [],
    };

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    stack[stack.length - 1].node.children.push(node);
    stack.push({ indent, node });
  });

  return root.children;
}

function DrilldownTree({ bullets }: { bullets: string[] }) {
  const tree = useMemo(() => buildTree(bullets), [bullets]);
  const [path, setPath] = useState<TreeNode[]>([]);

  const currentNodes = path.length ? path[path.length - 1].children : tree;
  const currentLabel = path[path.length - 1]?.label ?? null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setPath((current) => current.slice(0, -1))}
          disabled={!path.length}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
          <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-950">Start</span>
          {path.map((node) => (
            <div key={node.id} className="flex items-center gap-2">
              <ChevronRight size={14} />
              <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 dark:bg-slate-950 dark:text-sky-300">
                {node.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {currentLabel ? (
        <div className="rounded-3xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm leading-7 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200">
          <span className="font-black text-blue-700 dark:text-sky-300">Current:</span> {currentLabel}
        </div>
      ) : null}

      <div className="space-y-3">
        {currentNodes.map((node) => {
          const hasChildren = node.children.length > 0;

          return (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                if (hasChildren) {
                  setPath((current) => [...current, node]);
                }
              }}
              className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left text-sm leading-7 transition ${
                hasChildren
                  ? "border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-sky-400"
                  : "border-slate-200/80 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60"
              }`}
            >
              <span className="font-medium text-slate-700 dark:text-slate-200">{node.label}</span>
              {hasChildren ? (
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-sky-300">
                  <span>Next</span>
                  <ChevronRight size={16} />
                </span>
              ) : (
                <span className="text-xs font-semibold text-slate-400">End</span>
              )}
            </button>
          );
        })}
      </div>

      {!currentNodes.length ? (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
          No further branches in this path.
        </div>
      ) : null}
    </div>
  );
}

function GlossaryTable({ glossary }: { glossary: CareerChartGlossaryItem[] }) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="grid grid-cols-[minmax(120px,0.7fr)_minmax(0,2fr)] border-b border-slate-200 bg-slate-50 px-5 py-4 text-xs font-black uppercase tracking-[0.24em] text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        <span>Shortform</span>
        <span>Meaning</span>
      </div>
      {glossary.map((item) => (
        <div
          key={`${item.shortform}-${item.meaning}`}
          className="grid grid-cols-[minmax(120px,0.7fr)_minmax(0,2fr)] gap-4 border-b border-slate-100 px-5 py-4 text-sm text-slate-700 last:border-b-0 dark:border-slate-800 dark:text-slate-200"
        >
          <span className="font-black text-blue-700 dark:text-sky-300">{item.shortform}</span>
          <span>{item.meaning}</span>
        </div>
      ))}
    </div>
  );
}

export default function CareerChartExplorer({
  outline,
}: {
  outline: CareerChartOutline;
}) {
  const [activeId, setActiveId] = useState<string>(outline.sections[0]?.id ?? "level-1");

  const activeSection = useMemo(
    () => outline.sections.find((section) => section.id === activeId) ?? outline.sections[0],
    [activeId, outline.sections],
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 xl:sticky xl:top-24 xl:h-fit">
        <div className="rounded-[28px] bg-slate-950 p-5 text-white dark:bg-slate-800">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-sky-300">AI Chart</p>
          <h1 className="mt-3 text-2xl font-black leading-tight">{outline.pageTitle}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">{outline.pageSubtitle}</p>
        </div>

        <div className="mt-5 space-y-3">
          {outline.sections.map((section) => {
            const Icon = sectionIcons[section.id];
            const isActive = section.id === activeId;

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveId(section.id)}
                className={`flex w-full items-center gap-3 rounded-3xl px-4 py-4 text-left transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-blue-300 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    isActive ? "bg-white/15" : "bg-white text-blue-600 dark:bg-slate-900"
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-black">{section.sidebarLabel}</p>
                  <p className={`text-xs ${isActive ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}>
                    {section.title}
                  </p>
                </div>
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setActiveId("glossary")}
            className={`flex w-full items-center gap-3 rounded-3xl px-4 py-4 text-left transition ${
              activeId === "glossary"
                ? "bg-fuchsia-600 text-white shadow-lg"
                : "border border-slate-200 bg-slate-50 text-slate-700 hover:border-fuchsia-300 hover:bg-white dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            }`}
          >
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                activeId === "glossary" ? "bg-white/15" : "bg-white text-fuchsia-600 dark:bg-slate-900"
              }`}
            >
              <ListChecks size={18} />
            </div>
            <div>
              <p className="text-sm font-black">{outline.glossaryTitle}</p>
              <p className={`text-xs ${activeId === "glossary" ? "text-fuchsia-100" : "text-slate-500 dark:text-slate-400"}`}>
                Glossary
              </p>
            </div>
          </button>
        </div>
      </aside>

      <section className="space-y-6">
        <div className="rounded-[36px] bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 p-8 text-white shadow-xl">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-white/10">
              <ScrollText size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-black leading-tight">{outline.pageTitle}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200">
                {outline.note}
              </p>
            </div>
          </div>
        </div>

        {activeId === "glossary" ? (
          <div className="space-y-4">
            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                {outline.glossaryTitle}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                {outline.glossaryDescription}
              </p>
            </div>
            <GlossaryTable glossary={outline.glossary} />
          </div>
        ) : activeSection ? (
          <article className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-blue-50 text-blue-700 dark:bg-slate-950 dark:text-sky-300">
                {(() => {
                  const Icon = sectionIcons[activeSection.id];
                  return <Icon size={24} />;
                })()}
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-blue-600">
                  {activeSection.sidebarLabel}
                </p>
                <h3 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-100">
                  {activeSection.title}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {activeSection.description}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <DrilldownTree key={activeSection.id} bullets={activeSection.bullets} />
            </div>
          </article>
        ) : null}
      </section>
    </div>
  );
}
