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
    label: "Bachelor / Graduation",
    shortLabel: "Bachelor",
    description: "Explore degree-completion, teacher training, management, and professional next steps.",
  },
  {
    id: "postgraduate",
    label: "Post Graduation",
    shortLabel: "Post Graduate",
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
      { id: "graphic-designing", name: "Graphic Designing", focus: "Visual design, branding, and posters", outcome: "Junior designer and studio roles", duration: "6-12 months" },
      { id: "data-entry", name: "Data Entry & Office Automation", focus: "Typing, spreadsheets, office tools", outcome: "Back-office support jobs", duration: "3-6 months" },
      { id: "web-design-development", name: "Web Design / Development Certificate", focus: "Web pages, UI, and basic development", outcome: "Junior web support and freelance roles", duration: "6-12 months" },
      { id: "computer-applications", name: "Diploma in Computer Applications", focus: "Office tools, internet, and computer basics", outcome: "Computer operator and admin roles", duration: "6-12 months" },
      { id: "dtp", name: "DTP & Graphic Basics", focus: "Design tools and print media", outcome: "DTP operator roles", duration: "6 months" },
      { id: "ms-cit", name: "MS-CIT & Computer Foundations", focus: "Digital literacy and productivity", outcome: "Entry-level computer operator roles", duration: "3 months" },
      { id: "desktop-publishing", name: "Desktop Publishing", focus: "Layout, print, and digital publishing tools", outcome: "Publishing and production support roles", duration: "6 months" },
      { id: "data-mining", name: "Data Mining", focus: "Data handling and basic analytics", outcome: "Data support roles", duration: "6-12 months" },
    ],
  },
  {
    id: "engineering-diploma-technical",
    levelId: "10th",
    name: "Engineering Diploma (Technical)",
    description: "Diploma-led technical routes with progression into jobs, degrees, and government exams.",
    icon: "HardHat",
    specializations: [
      { id: "govt-contractor", name: "Government Contractor (Civil / Electrical)", focus: "Site execution, compliance, and contractor work", outcome: "Civil and electrical contracting roles", duration: "After diploma + license" },
      { id: "be-lateral-entry", name: "Degree Engineering (B.E.)", focus: "Lateral entry into engineering degree", outcome: "Degree-based engineering careers", duration: "3 years after diploma" },
      { id: "rto-inspector", name: "R.T.O Inspector Exam", focus: "Transport department exam preparation", outcome: "RTO and transport inspection roles", duration: "Exam based" },
      { id: "amie-iete", name: "A.M.I.E / I.E.T.E", focus: "Professional engineering membership studies", outcome: "Equivalent engineering progression and UPSC eligibility", duration: "Flexible" },
      { id: "merchant-navy", name: "Merchant Navy", focus: "Marine engineering and ship operations", outcome: "Marine technical and deck roles", duration: "Course + selection" },
    ],
  },
  {
    id: "health-service-diplomas",
    levelId: "10th",
    name: "Health, Service & Diploma Courses",
    description: "Allied health, hospitality, aviation, and service-focused diploma routes after 10th.",
    icon: "Stethoscope",
    specializations: [
      { id: "dmlt-10th", name: "DMLT / BMLT / MMLT Foundation", focus: "Medical lab exposure and diagnostics", outcome: "Lab support pathways", duration: "1-2 years" },
      { id: "nursing-care-assistant", name: "Diploma in Nursing Care Assistant", focus: "Patient support and hospital assistance", outcome: "Nursing assistant roles", duration: "1 year" },
      { id: "radiology-diploma", name: "Diploma in X-Ray / Radiology", focus: "Imaging support and diagnostics", outcome: "Radiology technician assistant roles", duration: "1-2 years" },
      { id: "hotel-management-diploma", name: "Hotel Management Diploma", focus: "Hospitality, service, and operations", outcome: "Hotel and front-office roles", duration: "1-3 years" },
      { id: "travel-tour-management", name: "Diploma in Travel & Tour Management", focus: "Travel operations and itinerary planning", outcome: "Travel desk and tourism roles", duration: "1 year" },
      { id: "culinary-arts", name: "Diploma in Culinary Arts", focus: "Kitchen, bakery, and food production", outcome: "Commis and kitchen careers", duration: "1-2 years" },
      { id: "cabin-crew-ground", name: "Diploma in Cabin Crew / Ground Staff", focus: "Airport operations and passenger handling", outcome: "Ground staff and cabin support roles", duration: "6-12 months" },
    ],
  },
  {
    id: "defense-public-service",
    levelId: "10th",
    name: "Defense, Police & Public Service",
    description: "Security, defense, railway, and public service entry tracks after 10th.",
    icon: "ShieldCheck",
    specializations: [
      { id: "indian-army", name: "Defense: Indian Army", focus: "Army recruitment and physical preparation", outcome: "Army service roles", duration: "Selection based" },
      { id: "airmen-navy-soldier", name: "Airmen / Navy Soldier", focus: "Defense service recruitment pathways", outcome: "Air force and navy support roles", duration: "Selection based" },
      { id: "state-police", name: "State Police", focus: "Police exam and physical test preparation", outcome: "Police constable roles", duration: "Selection based" },
      { id: "railways", name: "Railways", focus: "Technical and clerical railway recruitment", outcome: "Railway support roles", duration: "Exam based" },
      { id: "ssc-mts", name: "SSC MTS", focus: "Central government multitasking staff exam", outcome: "Government support staff roles", duration: "Exam based" },
      { id: "fire-safety", name: "Fire and Safety", focus: "Fire prevention and industrial safety", outcome: "Safety officer assistant roles", duration: "6-12 months" },
    ],
  },
  {
    id: "creative-vocational-courses",
    levelId: "10th",
    name: "Creative & Vocational Courses",
    description: "Design, interior, fashion, office practice, and lifestyle skill programs.",
    icon: "Palette",
    specializations: [
      { id: "fine-arts-diploma", name: "Diploma in Fine Arts", focus: "Drawing, painting, and visual composition", outcome: "Art and studio support roles", duration: "1-3 years" },
      { id: "commercial-applied-art", name: "Commercial / Applied Art", focus: "Advertising and visual communication", outcome: "Commercial art roles", duration: "1-2 years" },
      { id: "photography-diploma", name: "Diploma in Photography", focus: "Photography and editing basics", outcome: "Photography assistant and freelancer roles", duration: "6-12 months" },
      { id: "art-teacher-diploma", name: "Art Teacher Diploma", focus: "Art education and classroom methods", outcome: "Art teaching support roles", duration: "1-2 years" },
      { id: "interior-design", name: "Interior Design", focus: "Space planning and aesthetics", outcome: "Interior design assistant roles", duration: "1-2 years" },
      { id: "private-secretary-practice", name: "Private Secretary Practice", focus: "Office management, drafting, and coordination", outcome: "Secretary and office executive roles", duration: "1 year" },
      { id: "beauty-culture", name: "Beauty Culture & Hair Dressing", focus: "Beauty, salon, and grooming services", outcome: "Salon and freelance beauty roles", duration: "6-12 months" },
      { id: "garment-technology", name: "Garment Technology", focus: "Fashion production and apparel basics", outcome: "Garment unit and fashion support roles", duration: "1-2 years" },
      { id: "fitness-trainer", name: "Personal Fitness Trainer", focus: "Exercise science and coaching basics", outcome: "Gym trainer roles", duration: "3-6 months" },
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
      { id: "dmlt", name: "Laboratory Technician Diploma (D.M.L.T)", focus: "Diagnostics and lab procedures", outcome: "Lab technician roles", duration: "2 years" },
      { id: "ded-science", name: "D.Ed", focus: "Teacher training and school education", outcome: "Primary teacher pathway", duration: "2 years" },
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
      { id: "travel-tourism-science", name: "Diploma in Travel and Tourism", focus: "Travel operations and tourism services", outcome: "Tour operations roles", duration: "1 year" },
      { id: "lic-agent", name: "L.I.C Agent", focus: "Insurance products and sales", outcome: "Insurance advisor roles", duration: "Short certification" },
      { id: "hostel-hotel-management", name: "Hotel Management Diploma", focus: "Hospitality services and hotel operations", outcome: "Hotel management pathway", duration: "1-3 years" },
      { id: "bpa", name: "BPA", focus: "Performing arts studies", outcome: "Music and arts careers", duration: "3 years" },
    ],
  },
  {
    id: "aviation-law-government",
    levelId: "12th-science",
    name: "Aviation, Law & Government Paths",
    description: "Pilot, cabin crew, legal foundation, and government-oriented routes after science.",
    icon: "Plane",
    specializations: [
      { id: "air-hostess", name: "Air Hostess / Flight Steward", focus: "Passenger service and cabin operations", outcome: "Cabin crew and ground handling roles", duration: "6-12 months" },
      { id: "student-pilot", name: "Student Pilot Licence to Commercial Pilot", focus: "Pilot training and aviation licensing", outcome: "Commercial pilot pathway", duration: "18-36 months" },
      { id: "llb-foundation", name: "L.L.B Foundation", focus: "Law foundation with D.T.L / D.D.L / L.L.M progression", outcome: "Legal studies pathway", duration: "Integrated progression" },
      { id: "govt-clerical", name: "Other Govt Clerical Grade Exam", focus: "Government clerical exam preparation", outcome: "Clerical service roles", duration: "Exam based" },
      { id: "mpa", name: "BPA to MPA", focus: "Advanced performing arts education", outcome: "Music and arts teaching careers", duration: "5 years combined" },
    ],
  },
  {
    id: "science-pcmb",
    levelId: "12th-science",
    name: "PCMB Pathways",
    description: "Combined physics, chemistry, maths, and biology routes with technical and healthcare flexibility.",
    icon: "Atom",
    specializations: [
      { id: "dpharm-bpharm", name: "D.Pharm to B.Pharm to M.Pharm / Pharm.D", focus: "Pharmacy education and medicine systems", outcome: "Pharmacist and advanced pharma careers", duration: "2-8 years" },
      { id: "bca-bcs-mca", name: "B.C.A / B.C.S to M.C.A", focus: "Software, systems, and applications", outcome: "Developer and software engineer roles", duration: "3-5 years" },
      { id: "barch-march", name: "B.Arch to M.Arch", focus: "Architecture, space, and built environments", outcome: "Architect pathway", duration: "5-7 years" },
      { id: "bsc-biotech", name: "B.Sc Biotechnology", focus: "Biotech, lab science, and applied biology", outcome: "Biotech and research roles with M.Sc / MBA progression", duration: "3-5 years" },
      { id: "bsc-electronics", name: "B.Sc Electronics to M.Sc / PhD", focus: "Electronics systems and circuit science", outcome: "Electronics and research careers", duration: "3-8 years" },
    ],
  },
  {
    id: "science-pcb",
    levelId: "12th-science",
    name: "PCB Medical Pathways",
    description: "Biology-focused clinical, paramedical, and allied health routes.",
    icon: "Cross",
    specializations: [
      { id: "bpt", name: "B.Physiotherapy", focus: "Physical rehabilitation and therapy", outcome: "Physiotherapist roles", duration: "4.5 years" },
      { id: "ayush", name: "B.H.M.S / B.U.M.S / B.A.M.S", focus: "Alternative medicine systems", outcome: "AYUSH doctor pathways", duration: "5.5 years" },
      { id: "bvsc", name: "B.V.Sc", focus: "Veterinary science and animal care", outcome: "Veterinary doctor pathway", duration: "5 years" },
      { id: "bds-mds", name: "B.D.S to M.D.S", focus: "Dental care and surgery", outcome: "Dental specialist pathway", duration: "5-8 years" },
      { id: "mbbs-md-ms", name: "M.B.B.S to M.D / M.S", focus: "Clinical medicine and specialization", outcome: "Doctor and specialist careers", duration: "5.5-8.5 years" },
      { id: "paramedical", name: "Paramedical Courses", focus: "Clinical support and hospital technologies", outcome: "Allied healthcare roles", duration: "1-4 years" },
      { id: "nursing-phd", name: "B.Sc Nursing to M.Sc / PhD", focus: "Nursing leadership and practice", outcome: "Advanced nursing careers", duration: "4-8 years" },
      { id: "bmlt-bmit-brit", name: "B.M.L.T / B.M.I.T / B.R.I.T", focus: "Medical imaging and lab technologies", outcome: "Diagnostics and imaging careers", duration: "3-4 years" },
      { id: "home-science", name: "B.Sc Home Science", focus: "Nutrition, family science, and development", outcome: "Nutrition and social sector roles", duration: "3 years" },
      { id: "life-science-bsc", name: "B.Sc Botany / Microbiology / Zoology / Chemistry", focus: "Core life sciences and research", outcome: "M.Sc, PhD, and biotech progression", duration: "3-8 years" },
    ],
  },
  {
    id: "science-pcm",
    levelId: "12th-science",
    name: "PCM Engineering & Defence",
    description: "Maths-focused engineering, architecture, defence, and competitive exam routes.",
    icon: "Compass",
    specializations: [
      { id: "nda", name: "N.D.A to Navy / Army / Airforce", focus: "Defence academy preparation", outcome: "Commissioned defence officer roles", duration: "Exam + academy" },
      { id: "barch-interior", name: "B.Arch to Interior / Landscape Design", focus: "Architecture and space design", outcome: "Architecture and design careers", duration: "5+ years" },
      { id: "be-btech", name: "B.E / B.Tech", focus: "Engineering across core and software domains", outcome: "Engineering careers", duration: "4 years" },
      { id: "ies", name: "I.E.S Exam", focus: "Engineering services examination", outcome: "Railway and public sector engineering jobs", duration: "Exam based" },
      { id: "merchant-navy-pcm", name: "Merchant Navy to Marine Engineer", focus: "Marine systems and ship engineering", outcome: "Marine engineering careers", duration: "Course + selection" },
      { id: "me-teacher", name: "M.E to Engineer / Teacher", focus: "Engineering specialization and academics", outcome: "Senior engineer and teaching roles", duration: "2 years after degree" },
      { id: "mpsc-upsc-pcm", name: "MPSC / UPSC Exams", focus: "Public service preparation", outcome: "Administrative and government roles", duration: "Exam based" },
      { id: "defence-direct-entry", name: "Defence Direct Entry", focus: "Indian Navy and Airforce direct technical entry", outcome: "Technical defence roles", duration: "Selection based" },
      { id: "ms-foreign", name: "M.S (Foreign University)", focus: "International higher studies and specialization", outcome: "Global engineering and research careers", duration: "1-2 years after degree" },
      { id: "mtech-iit", name: "M.Tech (IIT)", focus: "Advanced technical specialization", outcome: "Research and high-end engineering roles", duration: "2 years" },
      { id: "bsc-statistics", name: "B.Sc Statistics", focus: "Statistics, risk, and analytics", outcome: "Actuarial and analytics pathway", duration: "3 years" },
      { id: "planning-design", name: "Bachelor of Planning and Design", focus: "Urban planning and design systems", outcome: "Planning and design careers", duration: "4 years" },
      { id: "technical-entry-army", name: "Technical Entry in Indian Army", focus: "Army technical branch entry", outcome: "Technical officer roles", duration: "Selection based" },
      { id: "direct-second-year-diploma", name: "Direct 2nd Year Engineering Diploma", focus: "Bridge route into diploma engineering", outcome: "Technical diploma progression", duration: "2 years" },
      { id: "bsc-it-msc-it", name: "B.Sc IT to M.Sc IT", focus: "IT systems and advanced computing", outcome: "Software and IT specialist roles", duration: "5 years combined" },
      { id: "bcs-bca-phy-mca", name: "B.C.S / B.C.A / B.Sc Physics to M.C.A / M.C.S / M.C.M / M.B.A", focus: "Flexible progression into computing and management", outcome: "IT and management roles", duration: "5 years combined" },
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
      { id: "icwa", name: "I.C.W.A", focus: "Cost and management accounting", outcome: "Cost accountant roles", duration: "3-4 years" },
      { id: "bcom", name: "B.Com", focus: "Accounting and commerce fundamentals", outcome: "Banking and accounts roles", duration: "3 years" },
      { id: "bfm", name: "B.Com in Finance / Management", focus: "Financial analysis and management", outcome: "Finance analyst roles", duration: "3 years" },
      { id: "bank-insurance-exams", name: "Bank / Insurance Officer Exams", focus: "Banking, insurance, and probationary officer prep", outcome: "Bank and insurance officer roles", duration: "Exam based" },
      { id: "stock-market", name: "Stock Market (NSE / BSE)", focus: "Trading, markets, and analytics", outcome: "Financial analyst and market roles", duration: "6-12 months +" },
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
      { id: "bba-mba", name: "B.B.A to M.B.A", focus: "Business education into management leadership", outcome: "Manager and business roles", duration: "5 years combined" },
      { id: "digital-business", name: "Digital Business", focus: "E-commerce and growth systems", outcome: "Growth and operations roles", duration: "3 years" },
      { id: "law-commerce", name: "Integrated BBA LLB", focus: "Business and legal studies", outcome: "Corporate law pathway", duration: "5 years" },
      { id: "bca-commerce", name: "B.C.A", focus: "Applications, software, and systems", outcome: "IT and developer roles", duration: "3 years" },
      { id: "deled-bed", name: "D.Ed to B.Ed to M.Ed", focus: "Teacher education pathway", outcome: "Teacher and education leadership roles", duration: "Progressive" },
      { id: "baf", name: "BAF", focus: "Accounting and finance specialization", outcome: "Finance executive roles", duration: "3 years" },
      { id: "bbi", name: "BBI", focus: "Banking and insurance studies", outcome: "Insurance and banking roles", duration: "3 years" },
      { id: "ug-diploma-commerce", name: "U.G Diploma Course", focus: "Short undergraduate diploma options", outcome: "Early business support roles", duration: "1-2 years" },
      { id: "ssc-mpsc-upsc", name: "SSC / MPSC / UPSC Exams", focus: "Government exam preparation", outcome: "Government service pathways", duration: "Exam based" },
      { id: "iata", name: "IATA", focus: "Travel and airline operations certification", outcome: "Travel and aviation support roles", duration: "6-12 months" },
      { id: "ima", name: "Indian Military Academy", focus: "Defense leadership preparation", outcome: "Defense officer pathway", duration: "Selection based" },
    ],
  },
  {
    id: "commerce-degree-progression",
    levelId: "12th-commerce",
    name: "Commerce Degree Progression",
    description: "Common undergraduate-to-postgraduate academic and professional progressions from commerce.",
    icon: "BookOpenText",
    specializations: [
      { id: "mba-specializations", name: "M.B.A (Marketing / Finance / Materials)", focus: "Management specialization after graduation", outcome: "Managerial and leadership roles", duration: "2 years after degree" },
      { id: "bba-to-mba", name: "B.B.A to M.B.A", focus: "Business management progression", outcome: "Business and management careers", duration: "5 years combined" },
      { id: "bca-commerce-path", name: "B.C.A", focus: "Applications and software route from commerce", outcome: "Software and IT roles", duration: "3 years" },
      { id: "teacher-commerce-path", name: "D.Ed to B.Ed to M.Ed", focus: "Teacher education from commerce track", outcome: "Teacher pathway", duration: "Progressive" },
      { id: "icwa-duplicate", name: "ICWA", focus: "Costing, audit, and management accounting", outcome: "Cost accountant and finance roles", duration: "3-4 years" },
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
      { id: "bmm", name: "BMM", focus: "Media communication and mass media", outcome: "Media and content roles", duration: "3 years" },
      { id: "fashion-design", name: "Fashion Design", focus: "Apparel and styling", outcome: "Fashion and apparel roles", duration: "3-4 years" },
      { id: "fine-arts", name: "Fine Arts", focus: "Visual arts and illustration", outcome: "Creative studio roles", duration: "4 years" },
      { id: "b-design", name: "B.Design to M.Design", focus: "Design systems, branding, and product thinking", outcome: "Design career pathway", duration: "4-6 years" },
      { id: "content-writing", name: "Content Writing / Soft Skill Training", focus: "Writing, communication, and professional skills", outcome: "Content and training support roles", duration: "3-6 months" },
      { id: "interior-designing-diploma", name: "Interior Designing Diploma", focus: "Space, decor, and planning", outcome: "Interior design support roles", duration: "1-2 years" },
      { id: "foreign-language", name: "Foreign Language Diploma", focus: "Language proficiency and communication", outcome: "Translator and language support roles", duration: "1-2 years" },
      { id: "bjmc", name: "BJMC", focus: "Broadcast, journalism, and communication", outcome: "Journalism and media roles", duration: "3 years" },
      { id: "event-management", name: "Bachelor in Event Management", focus: "Events, production, and coordination", outcome: "Event management roles", duration: "3 years" },
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
      { id: "msw", name: "B.S.W to M.S.W", focus: "Advanced social work studies", outcome: "NGO and community leadership roles", duration: "5 years combined" },
      { id: "psychology", name: "Psychology", focus: "Behavior and mental health", outcome: "Counseling and HR support roles", duration: "3 years" },
      { id: "upsc-track", name: "Civil Services Foundation", focus: "UPSC and state PSC prep", outcome: "Government exam pathway", duration: "3 years + prep" },
      { id: "ba-bped", name: "B.A to B.P.Ed", focus: "Physical education and school sports", outcome: "P.T. Teacher pathway", duration: "4-5 years" },
      { id: "ma-arts", name: "M.A", focus: "Advanced humanities and arts studies", outcome: "Academics and teaching roles", duration: "2 years" },
      { id: "b-el-ed", name: "B.El.Ed", focus: "Elementary education and teaching", outcome: "Elementary teacher pathway", duration: "4 years" },
      { id: "bba-arts", name: "B.B.A to M.B.A", focus: "Business education from arts stream", outcome: "Manager and business roles", duration: "5 years combined" },
    ],
  },
  {
    id: "arts-advanced-options",
    levelId: "12th-arts",
    name: "Arts Higher Studies & Exams",
    description: "Higher-study, teaching, hospitality, humanities, and public-service progressions after arts.",
    icon: "ScrollText",
    specializations: [
      { id: "mass-communication-ma", name: "M.A in Mass Communication", focus: "Media theory, journalism, and communication", outcome: "Advanced media careers", duration: "2 years after degree" },
      { id: "bhm", name: "B.H.M Bachelor in Hotel Management", focus: "Hospitality operations and service leadership", outcome: "Hotel management careers", duration: "3-4 years" },
      { id: "mba-arts", name: "M.B.A", focus: "Management education after arts graduation", outcome: "Management and business roles", duration: "2 years after degree" },
      { id: "mpsc-upsc-arts", name: "MPSC / UPSC Exam", focus: "Administrative services preparation", outcome: "Government officer roles", duration: "Exam based" },
      { id: "bfa", name: "Bachelor in Fine Art", focus: "Visual arts, painting, and creative practice", outcome: "Fine arts and design careers", duration: "4 years" },
      { id: "humanities-social-sciences", name: "Bachelor in Humanities & Social Sciences", focus: "Policy, society, and human behavior", outcome: "Academia, policy, and NGO roles", duration: "3 years" },
      { id: "bed-med", name: "B.Ed to M.Ed", focus: "Teacher education and academic progression", outcome: "Teaching and education leadership careers", duration: "3-4 years" },
      { id: "advertising-commercial-management", name: "Advertising & Commercial Management Diploma", focus: "Advertising, brand communication, and commercial operations", outcome: "Advertising and media business roles", duration: "1 year" },
      { id: "sub-inspector-forces", name: "Sub Inspector Exam (BSF / CRPF / CISF)", focus: "Uniformed public-service exam preparation", outcome: "Security and paramilitary officer roles", duration: "Exam based" },
    ],
  },
  {
    id: "graduation-professional-routes",
    levelId: "graduate",
    name: "Graduation to Professional Routes",
    description: "Use your bachelor degree as a base for management, law, teaching, and specialist careers.",
    icon: "BriefcaseBusiness",
    specializations: [
      { id: "graduate-mba", name: "M.B.A", focus: "Management, operations, finance, and marketing", outcome: "Management and leadership careers", duration: "2 years" },
      { id: "graduate-bed", name: "B.Ed / M.Ed", focus: "Teacher training and academic progression", outcome: "School and college teaching careers", duration: "2-4 years" },
      { id: "graduate-llm", name: "L.L.M / Legal Specializations", focus: "Advanced legal studies", outcome: "Legal and policy careers", duration: "1-2 years" },
      { id: "graduate-mca", name: "M.C.A / M.C.S / M.C.M", focus: "Advanced computing and applications", outcome: "Software and IT specialist roles", duration: "2-3 years" },
      { id: "graduate-competitive", name: "MPSC / UPSC / Banking / SSC", focus: "Government and public-sector exam preparation", outcome: "Government service careers", duration: "Exam based" },
    ],
  },
  {
    id: "graduation-academic-routes",
    levelId: "graduate",
    name: "Graduation to Higher Studies",
    description: "Academic, research, and technical continuations after your bachelor degree.",
    icon: "GraduationCap",
    specializations: [
      { id: "graduate-msc", name: "M.Sc", focus: "Advanced science and subject specialization", outcome: "Research, lab, and teaching roles", duration: "2 years" },
      { id: "graduate-ma", name: "M.A", focus: "Advanced humanities and social sciences", outcome: "Academics, writing, and policy roles", duration: "2 years" },
      { id: "graduate-mtech", name: "M.Tech / M.E", focus: "Engineering specialization and research", outcome: "Senior technical and teaching careers", duration: "2 years" },
      { id: "graduate-phd", name: "PhD", focus: "Research and doctoral specialization", outcome: "Research scientist and professor careers", duration: "3-5 years" },
      { id: "graduate-foreign-ms", name: "M.S Abroad", focus: "International higher studies and specialization", outcome: "Global research and specialist careers", duration: "1-2 years" },
    ],
  },
  {
    id: "postgraduate-tech",
    levelId: "postgraduate",
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
    levelId: "postgraduate",
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
  {
    id: "postgraduate-research-teaching",
    levelId: "postgraduate",
    name: "Research, Teaching & Competitive Paths",
    description: "Doctoral, teaching, and senior public-service options after postgraduation.",
    icon: "Microscope",
    specializations: [
      { id: "pg-phd", name: "PhD / Research", focus: "Doctoral research and thesis work", outcome: "Research and academic careers", duration: "3-5 years" },
      { id: "pg-net-set", name: "NET / SET / Teaching Eligibility", focus: "Lectureship and teaching qualification", outcome: "College teaching careers", duration: "Exam based" },
      { id: "pg-upsc-mpsc", name: "UPSC / MPSC Advanced Prep", focus: "High-level administrative service preparation", outcome: "Civil service careers", duration: "Exam based" },
      { id: "pg-special-diploma", name: "Special Diplomas / Certifications", focus: "Focused industry specialization", outcome: "Niche specialist roles", duration: "6-18 months" },
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
