export type CareerLevel = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
};

export type CareerSpecialization = {
  id: string;
  name: string;
  focus: string;
  outcome: string;
  duration: string;
};

export type CareerPath = {
  id: string;
  levelId: string;
  name: string;
  description: string;
  icon: string;
  specializations: CareerSpecialization[];
};

export type CareerSelection = {
  levelId: string;
  pathId: string;
  specializationId: string;
};

export const careerLevels: CareerLevel[] = [
  {
    id: "10th",
    label: "10th Standard",
    shortLabel: "After 10th",
    description: "Explore diploma, ITI, defence, and short-term career-start options.",
  },
  {
    id: "12th-science",
    label: "12th Science",
    shortLabel: "Science",
    description: "Compare engineering, medical, pharmacy, and computing-focused degrees.",
  },
  {
    id: "12th-commerce",
    label: "12th Commerce",
    shortLabel: "Commerce",
    description: "Navigate finance, management, law, and digital business pathways.",
  },
  {
    id: "12th-arts",
    label: "12th Arts",
    shortLabel: "Arts",
    description: "Discover media, design, public service, and humanities-led careers.",
  },
  {
    id: "graduate",
    label: "Graduate",
    shortLabel: "After Graduation",
    description: "Plan postgraduate, management, research, and advanced upskilling routes.",
  },
];

export const careerPaths: CareerPath[] = [
  {
    id: "iti",
    levelId: "10th",
    name: "ITI",
    description: "Skill-first technical trades for early employability and apprenticeships.",
    icon: "Wrench",
    specializations: [
      { id: "electrician", name: "Electrician", focus: "Industrial wiring and motors", outcome: "Technician roles in power and maintenance", duration: "2 years" },
      { id: "fitter", name: "Fitter", focus: "Assembly and mechanical fitting", outcome: "Plant and workshop technician roles", duration: "2 years" },
      { id: "welder", name: "Welder", focus: "Fabrication and welding processes", outcome: "Manufacturing and fabrication jobs", duration: "1 year" },
      { id: "diesel-mechanic", name: "Diesel Mechanic", focus: "Heavy engines and service", outcome: "Automobile and transport maintenance", duration: "1 year" },
    ],
  },
  {
    id: "diploma-engineering",
    levelId: "10th",
    name: "Diploma Engineering",
    description: "Three-year polytechnic programs leading to jobs or lateral-entry degrees.",
    icon: "Cpu",
    specializations: [
      { id: "computer-engineering", name: "Computer Engineering", focus: "Programming, networks, and software systems", outcome: "Junior developer and IT support roles", duration: "3 years" },
      { id: "mechanical", name: "Mechanical Engineering", focus: "Manufacturing, CAD, and design", outcome: "Production and maintenance jobs", duration: "3 years" },
      { id: "civil", name: "Civil Engineering", focus: "Construction, surveying, and site work", outcome: "Site supervisor and drafting jobs", duration: "3 years" },
      { id: "ai-ml", name: "AI / Machine Learning", focus: "Python, data, and automation basics", outcome: "AI support and analytics entry roles", duration: "3 years" },
      { id: "electronics", name: "Electronics Engineering", focus: "Circuits, embedded systems, and hardware", outcome: "Electronics technician roles", duration: "3 years" },
    ],
  },
  {
    id: "police-defense",
    levelId: "10th",
    name: "Police & Defense",
    description: "Uniformed service tracks with physical training and government recruitment.",
    icon: "Shield",
    specializations: [
      { id: "agniveer", name: "Agniveer", focus: "Army, Navy, and Air Force recruitment", outcome: "Armed forces service roles", duration: "6-12 months prep" },
      { id: "police-constable", name: "Police Constable", focus: "State police exams and physicals", outcome: "Constable and public safety roles", duration: "6-12 months prep" },
      { id: "home-guard", name: "Home Guard", focus: "Community safety and civil support", outcome: "Security and public support roles", duration: "3-6 months prep" },
    ],
  },
  {
    id: "skill-courses",
    levelId: "10th",
    name: "Skill Courses",
    description: "Digital and vocational programs for job-ready practical skills.",
    icon: "Sparkles",
    specializations: [
      { id: "digital-marketing", name: "Digital Marketing", focus: "SEO, ads, and content systems", outcome: "Marketing executive and freelancer roles", duration: "6-12 months" },
      { id: "data-entry", name: "Data Entry & Office Automation", focus: "Typing, spreadsheets, office tools", outcome: "Back-office support jobs", duration: "3-6 months" },
      { id: "dtp", name: "DTP & Graphic Basics", focus: "Design tools and print media", outcome: "DTP operator roles", duration: "6 months" },
      { id: "ms-cit", name: "MS-CIT & Computer Foundations", focus: "Digital literacy and productivity", outcome: "Entry-level computer operator roles", duration: "3 months" },
    ],
  },
  {
    id: "engineering-degree",
    levelId: "12th-science",
    name: "Engineering Degree",
    description: "JEE and CET based degrees for technology and product careers.",
    icon: "Rocket",
    specializations: [
      { id: "cs-it", name: "Computer Science / IT", focus: "Software engineering and systems", outcome: "Developer and product engineering roles", duration: "4 years" },
      { id: "mechanical-degree", name: "Mechanical Engineering", focus: "Design, thermodynamics, manufacturing", outcome: "Core engineering roles", duration: "4 years" },
      { id: "civil-degree", name: "Civil Engineering", focus: "Infrastructure and construction", outcome: "Site and planning roles", duration: "4 years" },
      { id: "electronics-degree", name: "Electronics & Telecommunication", focus: "Embedded systems and communications", outcome: "Electronics and telecom roles", duration: "4 years" },
      { id: "ai-data", name: "AI & Data Science", focus: "Machine learning and analytics", outcome: "Data and AI roles", duration: "4 years" },
    ],
  },
  {
    id: "medical-life-sciences",
    levelId: "12th-science",
    name: "Medical & Life Sciences",
    description: "Healthcare and bioscience routes including clinical and allied fields.",
    icon: "HeartPulse",
    specializations: [
      { id: "mbbs", name: "MBBS", focus: "Clinical medicine", outcome: "Doctor pathway", duration: "5.5 years" },
      { id: "bds", name: "BDS", focus: "Dental sciences", outcome: "Dental surgeon pathway", duration: "5 years" },
      { id: "pharmacy", name: "B.Pharm", focus: "Medicines and pharmaceutical sciences", outcome: "Pharmacist and pharma roles", duration: "4 years" },
      { id: "nursing", name: "B.Sc Nursing", focus: "Patient care and clinical practice", outcome: "Registered nurse pathway", duration: "4 years" },
    ],
  },
  {
    id: "science-computing",
    levelId: "12th-science",
    name: "Science & Computing",
    description: "Degree paths for software, analytics, and applied sciences.",
    icon: "Binary",
    specializations: [
      { id: "bsc-cs", name: "B.Sc Computer Science", focus: "Programming, data structures, and systems", outcome: "Software and IT analyst roles", duration: "3 years" },
      { id: "bca", name: "BCA", focus: "Applications and full-stack foundations", outcome: "Web and app development roles", duration: "3 years" },
      { id: "bsc-it", name: "B.Sc IT", focus: "Networking, software, and support systems", outcome: "IT operations and development roles", duration: "3 years" },
      { id: "bsc-physics", name: "B.Sc Physics", focus: "Research and analytical science", outcome: "Research assistant and teaching roles", duration: "3 years" },
    ],
  },
  {
    id: "finance-accounts",
    levelId: "12th-commerce",
    name: "Finance & Accounts",
    description: "Professional finance, audit, and business law pathways.",
    icon: "BadgeIndianRupee",
    specializations: [
      { id: "ca", name: "Chartered Accountancy", focus: "Audit, tax, and finance", outcome: "CA and finance leadership roles", duration: "4-5 years" },
      { id: "cs", name: "Company Secretary", focus: "Corporate law and compliance", outcome: "Compliance and secretarial roles", duration: "3-4 years" },
      { id: "bcom", name: "B.Com", focus: "Accounting and commerce fundamentals", outcome: "Banking and accounts roles", duration: "3 years" },
      { id: "bfm", name: "B.Com in Finance / Management", focus: "Financial analysis and management", outcome: "Finance analyst roles", duration: "3 years" },
    ],
  },
  {
    id: "management-business",
    levelId: "12th-commerce",
    name: "Management & Business",
    description: "Business administration, entrepreneurship, and modern digital commerce.",
    icon: "BriefcaseBusiness",
    specializations: [
      { id: "bba", name: "BBA", focus: "Business management and operations", outcome: "Management trainee roles", duration: "3 years" },
      { id: "bms", name: "BMS", focus: "Strategy and business systems", outcome: "Business analyst roles", duration: "3 years" },
      { id: "digital-business", name: "Digital Business", focus: "E-commerce and growth systems", outcome: "Growth and operations roles", duration: "3 years" },
      { id: "law-commerce", name: "Integrated BBA LLB", focus: "Business and legal studies", outcome: "Corporate law pathway", duration: "5 years" },
    ],
  },
  {
    id: "design-media",
    levelId: "12th-arts",
    name: "Design & Media",
    description: "Creative pathways in communication, experience design, and media.",
    icon: "Palette",
    specializations: [
      { id: "ui-ux", name: "UI / UX Design", focus: "Research, interfaces, and product design", outcome: "UI and UX designer roles", duration: "3-4 years" },
      { id: "journalism", name: "Journalism & Mass Media", focus: "News, writing, and media production", outcome: "Reporter and content roles", duration: "3 years" },
      { id: "fashion-design", name: "Fashion Design", focus: "Apparel and styling", outcome: "Fashion and apparel roles", duration: "3-4 years" },
      { id: "fine-arts", name: "Fine Arts", focus: "Visual arts and illustration", outcome: "Creative studio roles", duration: "4 years" },
    ],
  },
  {
    id: "public-service-humanities",
    levelId: "12th-arts",
    name: "Public Service & Humanities",
    description: "Humanities-led degrees with public sector and academic growth potential.",
    icon: "Landmark",
    specializations: [
      { id: "ba", name: "B.A.", focus: "Humanities and social sciences", outcome: "Teaching, public sector, and policy roles", duration: "3 years" },
      { id: "bsw", name: "Bachelor of Social Work", focus: "Community and development work", outcome: "NGO and social sector roles", duration: "3 years" },
      { id: "psychology", name: "Psychology", focus: "Behavior and mental health", outcome: "Counseling and HR support roles", duration: "3 years" },
      { id: "upsc-track", name: "Civil Services Foundation", focus: "UPSC and state PSC prep", outcome: "Government exam pathway", duration: "3 years + prep" },
    ],
  },
  {
    id: "postgraduate-tech",
    levelId: "graduate",
    name: "Postgraduate Tech",
    description: "Advanced technical study and specialization after graduation.",
    icon: "LaptopMinimal",
    specializations: [
      { id: "mca", name: "MCA", focus: "Software engineering and applications", outcome: "Developer and architect growth roles", duration: "2 years" },
      { id: "mtech-cs", name: "M.Tech in CS / AI", focus: "Advanced computing and AI", outcome: "Research and senior engineering roles", duration: "2 years" },
      { id: "pg-data", name: "PG in Data Science", focus: "Analytics and ML systems", outcome: "Data science roles", duration: "1-2 years" },
      { id: "cybersecurity", name: "PG in Cybersecurity", focus: "Security engineering and operations", outcome: "Security analyst roles", duration: "1-2 years" },
    ],
  },
  {
    id: "postgraduate-management",
    levelId: "graduate",
    name: "Postgraduate Management",
    description: "Leadership, strategy, and business growth-focused programs.",
    icon: "ChartNoAxesCombined",
    specializations: [
      { id: "mba", name: "MBA", focus: "Management, finance, and leadership", outcome: "Business and operations leadership roles", duration: "2 years" },
      { id: "pgdm", name: "PGDM", focus: "Industry-focused management training", outcome: "Corporate management roles", duration: "2 years" },
      { id: "marketing-analytics", name: "Marketing Analytics", focus: "Growth, campaigns, and data", outcome: "Marketing strategy roles", duration: "1-2 years" },
      { id: "product-management", name: "Product Management", focus: "Digital product strategy", outcome: "Associate product manager roles", duration: "1 year" },
    ],
  },
];

export function getPathsByLevel(levelId: string) {
  return careerPaths.filter((path) => path.levelId === levelId);
}

export function getPathById(pathId: string) {
  return careerPaths.find((path) => path.id === pathId);
}

export function getLevelById(levelId: string) {
  return careerLevels.find((level) => level.id === levelId);
}

export function getSpecializationById(pathId: string, specializationId: string) {
  return getPathById(pathId)?.specializations.find(
    (specialization) => specialization.id === specializationId,
  );
}
