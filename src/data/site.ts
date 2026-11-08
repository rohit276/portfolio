// ─────────────────────────────────────────────────────────────
//  All site content lives here. Edit this file to update the site.
//  Leave a link as "" to hide it.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Rohit Gupta",
  roles: ["AI/ML Engineer", "Backend Developer", "SDE"],
  intro:
    "I train vision models, wire LLMs into real products, and build the FastAPI backends that serve them.",
  status:
    "M.Tech in Artificial Intelligence at Jain University, Bengaluru. Open to full-time roles and freelance work, and happy to relocate.",
  email: "276rohitgupta@gmail.com",
  photo: "/rohit.webp",
  links: {
    github: "https://github.com/rohit276",
    linkedin: "https://www.linkedin.com/in/errohit",
    leetcode: "", // e.g. "https://leetcode.com/u/your-handle"
    fiverr: "",
    upwork: "",
  },
  resume: "", // put resume.pdf in /public and set this to "/resume.pdf"
};

export type Project = {
  title: string;
  context: string;
  status: "Completed" | "In use" | "Built" | "In progress" | "In design";
  summary: string;
  highlights: string[];
  stack: string[];
  metric?: { value: string; label: string };
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    title: "Skin Cancer Classification",
    context: "B.Tech final-year project, SOA University · 2025 · team of 3",
    status: "Completed",
    summary:
      "A deep learning model that sorts dermoscopic images into 7 types of skin lesion, built as a first-look tool to support early skin cancer diagnosis.",
    highlights: [
      "Fine-tuned EfficientNetB4 (ImageNet transfer learning) on HAM10000, 10,000+ images",
      "Handled class imbalance with class weighting; curbed overfitting with augmentation, dropout, L2 and learning-rate scheduling",
      "Grad-CAM heatmaps show which part of the lesion drove each prediction",
      "Flask web app: upload one image or a batch and get the lesion type with a confidence score",
    ],
    stack: ["Python", "TensorFlow / Keras", "EfficientNetB4", "Grad-CAM", "Flask"],
    metric: { value: "~85%", label: "test accuracy across 7 classes" },
    links: [],
  },
  {
    title: "WoundWatch",
    context: "Aavishkar hackathon, Jain University · 2026",
    status: "Built",
    summary:
      "Post-surgical infection monitoring. Patients photograph their wound at home; the system tracks colour change over time and tells the doctor who needs to come in now.",
    highlights: [
      "Wound scoring with OpenCV colour analysis in LAB space to catch drift between photos",
      "Mobile-first patient app (React PWA) for daily photo uploads",
      "Desktop doctor dashboard that ranks patients by risk and flags urgent visits",
      "Assistant bot that answers patients' medication questions",
    ],
    stack: ["React PWA", "FastAPI", "OpenCV", "SQLite"],
    links: [],
  },
  {
    title: "Retail POS & Billing System",
    context: "Full-stack app for a retail garments store",
    status: "In use",
    summary:
      "Point-of-sale and inventory software that runs the store's daily billing, stock and purchase records.",
    highlights: [
      "Sale and purchase billing with editing and bill reprint",
      "Barcode label printing for incoming stock",
      "AI invoice reader that turns supplier invoices into purchase entries (GPT-4o via OpenRouter)",
      "Automatic nightly backup to Google Drive",
    ],
    stack: ["FastAPI", "SQLite", "JavaScript", "LLM API", "Google Drive API"],
    links: [],
  },
  {
    title: "EG-CVR",
    context: "M.Tech research · Evidence-Grounded Claim Verification and Revision",
    status: "In progress",
    summary:
      "Research on making LLM answers more factual: check each claim in a response against retrieved evidence, then revise only the parts that don't hold up.",
    highlights: [
      "Splits a model's answer into individual factual claims",
      "Retrieves evidence for each claim and judges whether it is supported",
      "Rewrites unsupported claims while leaving correct content untouched",
    ],
    stack: ["Python", "LLMs", "Retrieval", "NLP"],
    links: [],
  },
  {
    title: "Anonymous Chat Platform",
    context: "Personal project",
    status: "In design",
    summary:
      "A talk-to-a-stranger web app: no sign-up, a random username, and instant matching with someone online.",
    highlights: [
      "Random one-to-one matching with no account needed",
      "Text chat, audio calls and media sharing",
      "Chat history kept private and visible only to admins for moderation",
    ],
    stack: ["WebSockets", "WebRTC", "FastAPI"],
    links: [],
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "Java", "SQL", "JavaScript"] },
  {
    group: "AI / ML",
    items: ["TensorFlow / Keras", "Transfer learning", "CNNs", "OpenCV", "LLM integration", "Ollama"],
  },
  { group: "Backend", items: ["FastAPI", "Flask", "REST APIs", "PostgreSQL", "SQLite"] },
  { group: "Frontend", items: ["React", "Next.js", "HTML / CSS"] },
  { group: "Cloud & tools", items: ["AWS & AWS CLI", "Ubuntu / Linux", "Git", "VS Code + AI tools"] },
  { group: "Core CS", items: ["Data structures & algorithms (Java)"] },
];

export const education = [
  {
    years: "2026 – 2028",
    degree: "M.Tech, Artificial Intelligence",
    school: "Jain (Deemed-to-be University), Bengaluru",
    note: "Pursuing",
  },
  {
    years: "2021 – 2025",
    degree: "B.Tech, Computer Science and Engineering",
    school: "ITER, Siksha 'O' Anusandhan University, Bhubaneswar",
    note: "",
  },
  {
    years: "2018 – 2020",
    degree: "Class XII, Science (CHSE Odisha)",
    school: "Khaira Higher Secondary School, Balasore",
    note: "",
  },
  {
    years: "2018",
    degree: "Class X (BSE Odisha)",
    school: "Khaira Government High School, Balasore",
    note: "",
  },
];

export const services = [
  {
    title: "AI features for your product",
    text: "Chatbots, document and invoice readers, and LLM-powered tools connected to your data.",
  },
  {
    title: "Backends and APIs",
    text: "FastAPI services with a clean database design, authentication and deployment on AWS.",
  },
  {
    title: "Computer vision models",
    text: "Image classification and analysis, from dataset preparation to a working web demo.",
  },
  {
    title: "Business web apps",
    text: "Billing, inventory and dashboard software for small businesses that runs every day.",
  },
];