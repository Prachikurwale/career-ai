import { Schema, model, models } from "mongoose";

const CareerReportSchema = new Schema(
  {
    title: { type: String, required: true },
    duration: { type: String, required: true },
    semester_breakdown: [
      {
        semester: { type: String, required: true },
        subjects: [{ type: String, required: true }],
      },
    ],
    fees: {
      government: { type: String, required: true },
      private: { type: String, required: true },
    },
    top_colleges_maharashtra: [{ type: String, required: true }],
    career_opportunities: [{ type: String, required: true }],
    salary_2026: {
      fresher: { type: String, required: true },
      mid_level: { type: String, required: true },
    },
    skills_required: [{ type: String, required: true }],
    skill_synergy: {
      frontend: { type: String, required: true },
      ai: { type: String, required: true },
      design: { type: String, required: true },
    },
    growth_path: [{ type: String, required: true }],
  },
  { _id: false },
);

const CareerHistorySchema = new Schema(
  {
    userEmail: { type: String, required: true, index: true },
    userName: { type: String },
    language: { type: String, required: true, default: "english" },
    levelId: { type: String, required: true },
    levelLabel: { type: String, required: true },
    pathId: { type: String, required: true },
    pathName: { type: String, required: true },
    specializationId: { type: String, required: true },
    specializationName: { type: String, required: true },
    report: { type: CareerReportSchema, required: true },
  },
  { timestamps: true, collection: "career_history" },
);

const CareerHistory =
  models.CareerHistory || model("CareerHistory", CareerHistorySchema);

export default CareerHistory;
