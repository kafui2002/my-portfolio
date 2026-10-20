// All the words on the site live here. Replace the placeholders with your own
// name, projects and links; the components read everything from this file.

export const profile = {
  name: "Your Name",
  handle: "your.name",
  city: "Your City",
  email: "hello@yourname.dev",
  roles: ["machine learning engineer", "software developer", "model debugger", "data pipeline plumber"],
  lede:
    "I build learning systems that hold up outside the notebook, from the first labelled sample to the API that serves predictions at 3am. Replace this line with a sentence about what you care about most.",
  status: "open to new roles",
  socials: [
    { label: "GitHub", href: "https://github.com/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/" },
    { label: "Scholar", href: "https://scholar.google.com/" },
  ],
};

export const about = {
  lead: "I like the whole arc of an ML problem: framing it, finding out what the data actually says, training something small that works, and then making it fast, observable and boring to run.",
  more: [
    "Swap this paragraph for your story. Two or three sentences on where you started, the kind of teams you have worked with, and the problems that keep you curious work best here.",
    "Outside of work you can find me sketching in the margins of papers, which is where this site got its look.",
  ],
  facts: [
    ["focus", "Applied ML, LLM systems"],
    ["stack", "Python, PyTorch, TypeScript"],
    ["years shipping", "5+"],
    ["currently", "Reading about evals"],
    ["timezone", "UTC+0"],
  ] as [string, string][],
};

export type Kind = "ml" | "dev" | "oss";
export type Project = {
  title: string;
  blurb: string;
  metrics: [string, string][]; // [label, value]
  tags: string[];
  kinds: Kind[];
  links: { label: string; href: string }[];
  art: "curve" | "boxes" | "services" | "chat" | "bars" | "wave";
};

export const filters: { id: "all" | Kind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ml", label: "Machine learning" },
  { id: "dev", label: "Software" },
  { id: "oss", label: "Open source" },
];

// Sample projects that show the layout. Keep the metrics on your own:
// numbers tell a reviewer what changed.
export const projects: Project[] = [
  {
    title: "Semantic search for support docs",
    blurb: "Retrieval pipeline with a fine-tuned embedding model and a reranker, replacing keyword search across 40k help articles.",
    metrics: [["recall@10", "+18%"], ["p95", "42 ms"]],
    tags: ["PyTorch", "FAISS", "FastAPI"],
    kinds: ["ml"],
    links: [{ label: "Case study", href: "#" }, { label: "Code", href: "#" }],
    art: "curve",
  },
  {
    title: "Defect detection on the line",
    blurb: "Object detector distilled to run on an edge GPU, with an active-learning loop that sends uncertain frames back for labelling.",
    metrics: [["mAP@0.5", "0.87"], ["on edge", "31 fps"]],
    tags: ["YOLO", "ONNX", "TensorRT"],
    kinds: ["ml", "oss"],
    links: [{ label: "Case study", href: "#" }, { label: "Code", href: "#" }],
    art: "boxes",
  },
  {
    title: "Feature store API",
    blurb: "Typed service that serves online features to six models, with backfills, versioning and a dashboard for freshness.",
    metrics: [["uptime", "99.95%"], ["req/s", "12k"]],
    tags: ["Go", "Redis", "Postgres"],
    kinds: ["dev"],
    links: [{ label: "Case study", href: "#" }],
    art: "services",
  },
  {
    title: "LLM evaluation harness",
    blurb: "Regression suite that scores prompts and model versions against golden sets, with human review for the cases that disagree.",
    metrics: [["test cases", "1,200"], ["judge agreement", "0.81 κ"]],
    tags: ["Python", "pytest", "DuckDB"],
    kinds: ["ml"],
    links: [{ label: "Write-up", href: "#" }, { label: "Code", href: "#" }],
    art: "chat",
  },
  {
    title: "Tiny experiment tracker",
    blurb: "Open-source CLI and web view for logging runs, comparing metrics and diffing configs, built for small teams without a platform.",
    metrics: [["stars", "1.4k"], ["contributors", "38"]],
    tags: ["TypeScript", "SQLite", "React"],
    kinds: ["dev", "oss"],
    links: [{ label: "Code", href: "#" }, { label: "Docs", href: "#" }],
    art: "bars",
  },
  {
    title: "Demand forecasting",
    blurb: "Gradient-boosted forecasts with calendar and weather features for 300 stores, plus alerts when the error drifts.",
    metrics: [["MAPE", "−22%"], ["stores", "300"]],
    tags: ["LightGBM", "Airflow", "dbt"],
    kinds: ["ml"],
    links: [{ label: "Case study", href: "#" }],
    art: "wave",
  },
];

export const skills = [
  {
    title: "Machine learning",
    code: "model.fit()",
    shade: "var(--mint)",
    items: ["PyTorch", "scikit-learn", "Transformers", "LightGBM", "Embeddings & RAG", "Evaluation", "Computer vision"],
    meters: [["Modelling", 90], ["Data work", 85]] as [string, number][],
  },
  {
    title: "Software",
    code: "git push",
    shade: "var(--butter)",
    items: ["Python", "TypeScript", "Go", "React", "FastAPI", "Postgres", "Testing"],
    meters: [["Backend", 88], ["Frontend", 70]] as [string, number][],
  },
  {
    title: "MLOps",
    code: "kubectl apply",
    shade: "var(--purple)",
    items: ["Docker", "Kubernetes", "Airflow", "MLflow", "ONNX", "AWS", "Monitoring"],
    meters: [["Serving", 80], ["Infra", 68]] as [string, number][],
  },
];

export const path = [
  { when: "2024 – now", role: "Senior ML Engineer", org: "Company", text: "Own the retrieval and ranking stack. Set up offline evals that the team now runs on every model change." },
  { when: "2022 – 2024", role: "ML Engineer", org: "Company", text: "Moved three models from notebooks to production services and cut inference cost by about a third." },
  { when: "2020 – 2022", role: "Software Developer", org: "Company", text: "Built backend APIs and data pipelines; got hooked on the data side and never looked back." },
  { when: "2016 – 2020", role: "BSc Computer Science", org: "University", text: "Thesis on something with a lot of matrices. Replace these entries with your own." },
];

export const sections = [
  { id: "about", label: "About", color: "var(--pink)" },
  { id: "work", label: "Work", color: "var(--lilac)" },
  { id: "skills", label: "Skills", color: "var(--mint)" },
  { id: "path", label: "Path", color: "var(--butter)" },
  { id: "contact", label: "Contact", color: "var(--blue)" },
];

// Scrapbook polaroids in the hero, up to five. To use a real photo, put the
// file in public/hobbies/ and set `image: "hobbies/your-photo.jpg"`; without
// an image the card shows the hand-drawn doodle named in `doodle`.
export type Hobby = {
  title: string;
  note: string;
  doodle: "camera" | "music" | "plant" | "book" | "game" | "bike" | "coffee" | "brush";
  image?: string;
};

export const hobbies: Hobby[] = [
  { title: "Photography", note: "film on weekends", doodle: "camera" },
  { title: "Music", note: "lo-fi + guitar", doodle: "music" },
  { title: "Gardening", note: "13 plants, 0 dead", doodle: "plant" },
  { title: "Reading", note: "sci-fi, mostly", doodle: "book" },
  { title: "Gaming", note: "co-op only", doodle: "game" },
];
