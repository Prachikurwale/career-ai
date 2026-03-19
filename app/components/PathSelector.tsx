"use client";

import StepCard from "./StepCard";

type SelectorItem = {
  id: string;
  title: string;
  description: string;
  badge?: string;
  icon?: string;
};

type PathSelectorProps = {
  items: SelectorItem[];
  selectedId?: string;
  columns?: "2" | "3";
  onSelect: (id: string) => void;
};

export default function PathSelector({
  items,
  selectedId,
  columns = "3",
  onSelect,
}: PathSelectorProps) {
  return (
    <div
      className={`grid gap-4 ${
        columns === "2" ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"
      }`}
    >
      {items.map((item) => (
        <StepCard
          key={item.id}
          title={item.title}
          description={item.description}
          badge={item.badge}
          icon={item.icon}
          selected={selectedId === item.id}
          onClick={() => onSelect(item.id)}
        />
      ))}
    </div>
  );
}
