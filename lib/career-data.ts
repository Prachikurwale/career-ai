export interface CareerNode {
  id: string;
  title: string;
  duration?: string;
  children?: CareerNode[];
}

export const careerPaths: CareerNode[] = [
  {
    id: "10th",
    title: "10th (S.S.C.)",
    children: [
      {
        id: "eng-diploma",
        title: "Engineering Diploma",
        duration: "3 yrs.",
        children: [
          {
            id: "deg-eng",
            title: "Degree Engineering (B.E.)",
            duration: "3 yrs.",
            children: [
              { id: "govt-contractor", title: "Government Contractor (Civil / Electrical)" },
              { id: "amie-iete", title: "Associate Membership Of Institute Of Engineers (A.M.I.E.) / Institution of Electronics & Telecommunication Engineers (I.E.T.E.)", children: [{id: "upsc-exam-be", title: "UPSC (EXAM)"}] },
              { id: "merchant-navy", title: "Merchant Navy" }
            ]
          },
          { id: "rto", title: "R.T.O. Inspector Exam", duration: "3 1/2 yrs." },
          { id: "merchant-navy-dip", title: "Merchant Navy", duration: "3 yrs." }
        ]
      },
      { id: "police-constable", title: "Police Constable / Airmen / Navy / Soldier" },
      { id: "art-teacher", title: "Art Teacher Diploma", duration: "2 yrs.", children: [{id: "fine-art", title: "Fine Art / Commercial Art Diploma", duration: "5 yrs."}] },
      { id: "iti", title: "ITI (Fitter, Welder, Machinist, DTP, Diesel Mechanic Etc.)", duration: "2 yrs." },
      { id: "data-mining", title: "Data Mining", duration: "4-5 months." },
      { id: "fire-safety", title: "Fire & Safety", duration: "1-2 yrs." },
      { id: "mscit", title: "MSCIT Course / Data Entry Operator" },
      { id: "personal-fitness", title: "Personal Fitness Trainer", duration: "3-5 months." },
      { id: "digital-mktg", title: "Digital Marketing", duration: "3-5 months." },
      { id: "agriculture-dip", title: "Diploma in Agriculture Management (Animal Husbandry)", duration: "6 mths. or 1 yrs." },
      { id: "med-lab-tech", title: "Medical Laboratory Technician Certificate Course (MLT/DMLT/BMLT/MMLT)", duration: "2 yrs." },
      { id: "various-dip", title: "Various Diploma Courses", duration: "2/3 yrs.", children: [
        { id: "int-des", title: "Interior Design" },
        { id: "dtp", title: "DeskTop Publishing" },
        { id: "sec-prac", title: "Private Secretary Practice" },
        { id: "beauty-hair", title: "Beauty Culture & Hair Dressing" },
        { id: "garment-tech", title: "Garment Technology" }
      ]}
    ]
  },
  {
    id: "12th-commerce",
    title: "12th Commerce",
    children: [
      { id: "bcom", title: "B.Com", duration: "3 yrs.", children: [
        { id: "mba-com", title: "M.B.A. (Marketing, Finance, Materials etc.)", duration: "2 yrs." },
        { id: "bank-po", title: "Bank/Insurance Probationary / Development Officer Exam" }
      ]},
      { id: "bba", title: "B.B.A.", duration: "3 yrs.", children: [{ id: "mba-bba", title: "M.B.A.", duration: "2 yrs."}] },
      { id: "bca-com", title: "B.C.A. (12th with Maths, English)", duration: "3 yrs." },
      { id: "icwa", title: "ICWA", duration: "3 yrs." },
      { id: "ca", title: "C.A.", duration: "2 yrs." },
      { id: "cs", title: "C.S.", duration: "2 yrs." },
      { id: "ug-dip", title: "U.G. Diploma courses", duration: "1-2 yrs." },
      { id: "baf", title: "BAF", duration: "3 yrs." },
      { id: "bbi", title: "BBI", duration: "3 yrs." },
      { id: "bms", title: "BMS", duration: "3 yrs." },
      { id: "stock-mkt", title: "Stock Market (NSE/BSE) / Financial Analyst", duration: "1-3 yrs." },
      { id: "iata", title: "IATA", duration: "3 yrs." },
      { id: "dip-travel", title: "Diploma in Travel & Tourism", duration: "2 yrs." },
      { id: "dmlt-com", title: "Laboratory Technician Diploma (D.M.L.T.)", duration: "3 yrs." },
      { id: "lic", title: "L.I.C. Agent", duration: "1-2 yrs." },
      { id: "cabin-crew", title: "Air Hostess/ Flight Steward / Cabin Crew / Ground Staff Handling", duration: "1-2 yrs." },
      { id: "indian-military", title: "Indian Military Academy (IAS Class-1 Officer)" }
    ]
  },
  {
    id: "12th-science",
    title: "12th Science",
    children: [
      {
        id: "pcmb",
        title: "With PCMB (Physics, Chemistry, Maths, Biology)",
        children: [
          { id: "d-pharm", title: "D. Pharm", duration: "2 yrs." },
          { id: "b-pharm", title: "B. Pharm", duration: "4 yrs.", children: [{id: "m-pharm", title: "M. Pharm", duration: "2 yrs.", children: [{id: "pharm-d", title: "Pharm. D", duration: "6 yrs."}]}] },
          { id: "bca-bcs", title: "B.C.A/B.C.S", duration: "3 yrs.", children: [{id: "mca-bca", title: "M.C.A", duration: "2 yrs."}] },
          { id: "b-arch", title: "B. Arch", duration: "3 yrs.", children: [{id: "m-arch", title: "M. Arch", duration: "2 yrs."}] },
          { id: "bio-tech", title: "Bio-Technology", duration: "3 yrs.", children: [{id: "msc-mba-bio", title: "M.Sc. Bio-Technology / M.B.A.", duration: "2 yrs."}] },
          { id: "bsc-elec", title: "B.Sc. Electronics", duration: "3 yrs.", children: [{id: "msc-phd-elec", title: "M.Sc Electronics / PhD Electronics", duration: "2 yrs."}] }
        ]
      },
      {
        id: "pcm",
        title: "With PCM (Physics, Chemistry, Maths)",
        children: [
          { id: "nda", title: "N.D.A.", duration: "3 yrs.", children: [{id: "army-navy-airforce", title: "Army, Navy, Airforce"}] },
          { id: "b-arch-pcm", title: "B.Arch.", duration: "5 yrs.", children: [{id: "dip-interior", title: "Diploma In Interior / Landscape Design"}] },
          { id: "be-btech", title: "B.E. / B.Tech (Indian Institute of Technology) IIT", duration: "4 yrs.", children: [
            { id: "ies-exam", title: "I.E.S. EXAM", duration: "1 yr.", children: [{id: "job-pub", title: "Job in Public Sector Company" }, {id: "job-rly", title: "Job In Railway"}] },
            { id: "merchant-navy-be", title: "Merchant Navy", duration: "2 yrs.", children: [{id: "marine-eng", title: "Marine Engineer"}] },
            { id: "me", title: "M.E.", duration: "2 yrs.", children: [{id: "teacher-eng", title: "Teacher / Engineer"}] },
            { id: "mpsc-be", title: "MPSC UPSC Exam (I.A.S. Officer)" },
            { id: "def-dir", title: "Defence Direct Entry", children: [{id: "navy-airforce", title: "Indian Navy / Indian Airforce"}] },
            { id: "mba-be", title: "M.B.A.", duration: "2 yrs." },
            { id: "ms-be", title: "M.S. (Foreign University)", duration: "2 yrs." },
            { id: "mtech", title: "M.Tech (Indian Institute of Technology IIT)", duration: "2 yrs." }
          ]},
          { id: "bsc-stats", title: "B.Sc (Statistics) to become Acurist", duration: "3 yrs." },
          { id: "bplan", title: "Bachelor of Planning & Design", duration: "5 yrs." },
          { id: "army-tech", title: "Technical entry in Indian Army", duration: "3 yrs." },
          { id: "dir-second", title: "Direct 2nd year Engineering Diploma", children: [{id: "eng-deg-dir", title: "Engineering Degree", duration: "3 yrs."}] },
          { id: "bsc-it", title: "B.Sc IT", duration: "3 yrs.", children: [{id: "msc-it", title: "M.Sc. IT", duration: "2 yrs."}] },
          { id: "bcs-bca-phy", title: "B.C.S. / B.C.A. / B.S.C.(Phy.)", duration: "3 yrs.", children: [{id: "mcs-mcm-mba", title: "M.C.S. / M.C.M. / M.B.A.", duration: "2 yrs."}, {id: "mca-pcm", title: "M.C.A.", duration: "3 yrs."}] }
        ]
      },
      {
        id: "pcb",
        title: "With PCB (Physics, Chemistry, Biology)",
        children: [
          { id: "b-physio", title: "B. Physiotherapy", duration: "4 1/2 yrs." },
          { id: "bams-bhms", title: "B.H.M.S. / B.V.Sc. / B.U.M.S. / B.A.M.S.", duration: "5 1/2 yrs.", children: [{id: "md-ayur", title: "M.D.", duration: "3 yrs."}] },
          { id: "mbbs", title: "M.B.B.S.", duration: "5 1/2 yrs.", children: [
            {id: "md", title: "M.D.", duration: "3 yrs."}, 
            {id: "ms", title: "M.S.", duration: "3 yrs."}, 
            {id: "spec-dip", title: "Special Diploma", duration: "2 yrs."}
          ]},
          { id: "bds", title: "B.D.S.", duration: "5 yrs.", children: [{id: "mds", title: "M.D.S.", duration: "3 yrs."}] },
          { id: "paramedical", title: "Paramedical Courses", duration: "3-4 1/2 yrs." },
          { id: "bsc-nurs", title: "B.Sc. Nursing", duration: "4 yrs.", children: [{id: "msc-nursing", title: "M.Sc. Nursing / PhD Nursing", duration: "2 yrs."}] },
          { id: "bmlt-pcb", title: "B.M.L.T. / B.M.I.T. / B.R.I.T.", duration: "3 yrs." },
          { id: "bsc-home", title: "B.Sc. Home Science", duration: "3 yrs." },
          { id: "bsc-bio", title: "B.Sc. (Botany, Micro Biology, Zoology, Chemistry Etc.)", duration: "3 yrs.", children: [
            {id: "msc-bio", title: "M.Sc. M.Sc. (Bio-Tech.)", duration: "2 yrs.", children: [
              {id: "mphil-bio", title: "M.Phil.", duration: "1 yr.", children: [{id: "phd-bio", title: "Ph.D. (Bio-Tech.)"}]}
            ]}
          ]}
        ]
      }
    ]
  },
  {
    id: "12th-arts",
    title: "12th Arts",
    children: [
      { id: "bmm", title: "BMM", duration: "3 yrs." },
      { id: "bsw", title: "B.S.W.", duration: "3 yrs.", children: [{ id: "msw", title: "M.S.W.", duration: "2 yrs." }] },
      { id: "pilot", title: "Student Pilot Licence / Professional Pilot Licence / Commercial Pilot Licence" },
      { id: "bped", title: "B. P.Ed.", duration: "1 yr.", children: [{ id: "pt-teacher", title: "P.T.Teacher" }] },
      { id: "ma", title: "M.A.", duration: "2 yrs.", children: [{ id: "ma-mass", title: "M.A. in Mass Communication" }] },
      { id: "bdes", title: "B. Design", duration: "3 yrs.", children: [{ id: "mdes", title: "M. Design", duration: "2 yrs." }] },
      { id: "hotel-dip", title: "Hotel Mgmt Diploma", duration: "3 yrs.", children: [{ id: "hotel-deg", title: "Hotel Mgmt Degree", duration: "3 yrs." }] },
      { id: "interior-dip", title: "Interior Designing Diploma", duration: "2 yrs.", children: [{ id: "content-writ", title: "Content writing or Soft Skill training", duration: "1 month" }] },
      { id: "llb", title: "L.L.B. Foundation", duration: "5 yrs.", children: [{ id: "dtl-dll", title: "D.T.L. / D.L.L.", duration: "1 yr.", children: [{ id: "llm", title: "L.L.M.", duration: "2 yrs." }] }] },
      { id: "bba-arts", title: "B.B.A.", duration: "3 yrs.", children: [{ id: "mba-arts", title: "M.B.A.", duration: "2 yrs.", children: [{ id: "mpsc-arts", title: "MPSC UPSC Exam (IAS Officer)" }] }] },
      { id: "mgr-business", title: "Manager / Businessman" },
      { id: "bfa", title: "Bachelor in Fine Arts", duration: "3 yrs." },
      { id: "b-hum", title: "Bachelor in Humanities & Social Sciences", duration: "3 yrs." },
      { id: "bpa", title: "B.P.A", duration: "3 yrs.", children: [{ id: "mpa", title: "MPA", duration: "5 yrs." }] },
      { id: "ba", title: "B.A.", duration: "3 yrs.", children: [{ id: "bed-arts", title: "B.Ed.", duration: "1 yr.", children: [{ id: "med-arts", title: "M.Ed." }] }] },
      { id: "bjmc", title: "BJMC", duration: "3 yrs." },
      { id: "foreign-lang", title: "Foreign Language Diploma", duration: "1 yr." },
      { id: "govt-cler", title: "Other Govt. Clerical grade exam", duration: "1 yr." },
      { id: "ad-com-dip", title: "Advertising & Commerical Management Diploma" },
      { id: "ded-arts", title: "D.Ed.", duration: "2 yrs." },
      { id: "event-mgmt", title: "Bachelor in Event Mgmt", duration: "3 yrs.", children: [{ id: "beled", title: "B.EI.Ed." }] },
      { id: "sub-insp", title: "Sub Inspector Exam for BSF/CRPF/CISF" }
    ]
  }
];

export const shortforms = {
  "B.Sc.": "Bachelor of Science",
  "M.Sc.": "Master of Science",
  "B.Com.": "Bachelor of Commerce",
  "M.Com.": "Master of Commerce",
  "B.A.": "Bachelor of Arts",
  "M.A.": "Master of Arts",
  "Ph.D.": "Doctors of Philosophy",
  "D.Ed.": "Diploma in Education",
  "B.Ed.": "Bachelor of Education",
  "M. Ed.": "Master of Education",
  "B.P.Ed.": "Bachelor of Physical Education",
  "B.E.": "Bachelor of Engineering",
  "M.E.": "Master of Engineering",
  "B.Tech.": "Bachelor of Technology",
  "M.Tech.": "Master of Technology",
  "M.S.": "Master of Science",
  "I.E.S.": "Indian Engineering Service Exam",
  "I.I.T.": "Indian Institute of Technology",
  "M.B.B.S.": "Bachelor of Medicine & Surgery",
  "B.H.M.S.": "Bachelor of Homeopathy Medicine & Surgery",
  "BAMS": "Bachelor of Ayurvedic Medicine & Surgery",
  "BUMS": "Bachelor of Unani Medicine & Surgery",
  "BDS.": "Bachelor of Dental Surgery",
  "M.S": "Masters in Surgery",
  "M.D": "Doctor of Medicine",
  "MDS": "Doctor of Dental Surgery",
  "BMLT": "Bachelor of Medical Lab Technology",
  "BVSC": "Bachelor of Veterinary Science",
  "BBA": "Bachelor of Business Administration",
  "BCA": "Bachelor of Computer Application",
  "MCM": "Master of Computer Management",
  "MCA": "Master of Computer Applications",
  "MBA": "Master of Business administration",
  "NDA": "National Defence Academy",
  "B. Arch": "Bachelor of Architecture",
  "LLB": "Bachelor of Law",
  "DLL": "Diploma in Labour Law",
  "DTL": "Diploma in Taxation Law",
  "LLM": "Master in Law",
  "CS": "Company Secretary",
  "CA": "Chartered Accountant",
  "ICWA": "Institute of Cost & Work Accountant",
  "BSW": "Bachelor of Social Work",
  "MSW": "Master of Social Work",
  "BAF": "Bachelor in Accounting & Finance",
  "BBI": "Bachelor in Banking & Insurance",
  "BMS": "Bachelor in Management Studies",
  "BJMC": "Bachelor in Journalism and Mass Communications",
  "B.EI.Ed": "Bachelor in Elementary Education",
  "B.Ev.Mt": "Bachelor in Event Mgmt",
  "B.H.M.C.T": "Bachelor Hotel Management & Catering Technology",
  "B.Design": "Fashion / Interior",
  "BPA": "Bachelor of Performing Arts",
  "MPA": "Master of Performing Arts",
  "BMIT/BRIT/BMLT": "Medical imaging technology / Radiation imaging technology"
};
