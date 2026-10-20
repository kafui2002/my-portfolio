// All the words on the site live here; the components read everything from
// this file. Edit freely: no other file needs to change for new text.

export const profile = {
  name: "Kafui Christon-Quao",
  handle: "kafui",
  city: "Accra, Ghana",
  email: "kafuisotonye@gmail.com",
  roles: ["machine learning engineer", "software developer", "web developer", "data detective"],
  lede:
    "I'm a Computer Science grad who builds things for the web and teaches computers to spot patterns. Give me a messy dataset or a website that doesn't feel quite right yet, and I'll happily lose an afternoon making it better.",
  status: "open to new roles",
  socials: [
    { label: "GitHub", href: "https://github.com/kafui2002" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/kafui-quao" },
  ],
};

export const about = {
  headline: { before: "Half data nerd, half", mark: "builder" },
  lead: "I got into tech by building websites, and somewhere along the way I fell for the data behind them. These days I'm happiest when a project needs both: clean code people actually enjoy using, and a model that's honest about what it knows.",
  more: [
    "I studied Computer Science with a focus on software engineering, which means I've built for the web, for phones, and even turned a West African board game into a browser game. Lately I've been going deep on machine learning: cleaning data, training models, and learning how the big language models really work under the hood.",
    "I also love explaining things. I've taught beginners their first lines of HTML, and I'd much rather leave a project easier for the next person than cleverer than it needs to be.",
  ],
  facts: [
    ["based in", "Accra, Ghana"],
    ["studied", "BSc Computer Science, American University of Nigeria"],
    ["into", "Machine learning and web development"],
    ["currently", "Learning how transformers and LLMs work"],
    ["fun fact", "Once helped welcome 5,000+ new students as orientation lead"],
  ] as [string, string][],
};

export type Kind = "ml" | "dev";
export type Project = {
  title: string;
  blurb: string;
  metrics: [string, string][]; // [label, value]
  tags: string[];
  kinds: Kind[];
  links: { label: string; href: string }[];
  art: "curve" | "boxes" | "services" | "chat" | "bars" | "wave" | "board" | "phone";
};

export const filters: { id: "all" | Kind; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ml", label: "Machine learning" },
  { id: "dev", label: "Web & apps" },
];

export const projects: Project[] = [
  {
    title: "Which crop should I plant?",
    blurb: "A model that looks at soil nitrogen, phosphorus, potassium and pH and suggests the crop most likely to thrive. Turns out potassium tells you the most on its own.",
    metrics: [["log loss", "0.23"], ["top feature", "potassium"]],
    tags: ["Python", "pandas", "scikit-learn", "Matplotlib"],
    kinds: ["ml"],
    links: [],
    art: "bars",
  },
  {
    title: "How long will that DVD be out?",
    blurb: "I cleaned up years of rental history and compared regression models to predict how many days a customer keeps a DVD, then tuned them until they hit the target.",
    metrics: [["MSE", "≤ 3"], ["goal", "hit"]],
    tags: ["Python", "pandas", "NumPy", "scikit-learn"],
    kinds: ["ml"],
    links: [],
    art: "curve",
  },
  {
    title: "Beach cleanup data, sorted",
    blurb: "A web app that takes citizen science data from beach cleanups and writes up summary reports automatically, so researchers spend less time in spreadsheets.",
    metrics: [["reports", "auto-generated"], ["used for", "research"]],
    tags: ["Python", "Data analysis", "Web app"],
    kinds: ["ml", "dev"],
    links: [],
    art: "wave",
  },
  {
    title: "Faculty Course Evaluation 2.0",
    blurb: "We rebuilt our university's course feedback system so students could speak honestly: anonymous feedback, secure logins, and it finally works off campus Wi-Fi too.",
    metrics: [["feedback", "anonymous"], ["works on", "any network"]],
    tags: ["Python", "Django", "Team project"],
    kinds: ["dev"],
    links: [{ label: "Code", href: "https://github.com/kafui2002/Faculty-Course-Evaluation" }],
    art: "chat",
  },
  {
    title: "Bubble Gum Ayo",
    blurb: "Ayo is a West African strategy board game I grew up with, so I made a bright, bubbly version you can play in the browser, with scores tracked on the server.",
    metrics: [["built", "solo"], ["genre", "board game"]],
    tags: ["React", "Node.js", "Express"],
    kinds: ["dev"],
    links: [],
    art: "board",
  },
  {
    title: "Studyio",
    blurb: "A study buddy app for students: find people in your course, join study groups and keep track of how much you're actually learning. Works on iOS and Android.",
    metrics: [["built", "solo"], ["platforms", "iOS + Android"]],
    tags: ["React Native", "Node.js", "Firebase"],
    kinds: ["dev"],
    links: [],
    art: "phone",
  },
];

export const skills = [
  {
    title: "Machine learning & data",
    code: "model.fit()",
    shade: "var(--mint)",
    items: ["Python", "pandas", "NumPy", "scikit-learn", "Matplotlib", "Classification", "Regression", "Data cleaning"],
    meters: [["Python", 90], ["Data analysis", 90]] as [string, number][],
  },
  {
    title: "Web & app development",
    code: "git push",
    shade: "var(--butter)",
    items: ["JavaScript", "React", "React Native", "Node.js", "Express", "Django", "Java", "Kotlin", "SQL", "HTML/CSS"],
    meters: [["Software engineering", 90], ["Front-end", 85]] as [string, number][],
  },
  {
    title: "How I work",
    code: "git commit -m",
    shade: "var(--purple)",
    items: ["Git & GitHub", "VS Code", "PyCharm", "UI/UX design", "Graphic design", "Teaching", "Teamwork"],
    meters: [["Collaboration", 90], ["Project planning", 90]] as [string, number][],
  },
];

export const path = [
  { when: "2026 – now", role: "Going deep on machine learning", org: "self-driven", text: "Building prediction models end to end and reading up on how transformers and large language models actually work." },
  { when: "2019 – 2025", role: "BSc Computer Science", org: "American University of Nigeria", text: "Concentrated in software engineering. Favourite rabbit holes: data structures, databases, statistics, UI/UX and game development." },
  { when: "2019 – 2022", role: "Orientation Team Lead", org: "American University of Nigeria", text: "Started as a volunteer and ended up leading 100+ volunteers to welcome over 5,000 new students. Taught me a lot about calm planning." },
];

export const sections = [
  { id: "about", label: "About", color: "var(--pink)" },
  { id: "work", label: "Work", color: "var(--lilac)" },
  { id: "skills", label: "Skills", color: "var(--mint)" },
  { id: "path", label: "Path", color: "var(--butter)" },
  { id: "contact", label: "Contact", color: "var(--blue)" },
];

// Scrapbook polaroids in the hero, up to six. To use a real photo, put the
// file in public/hobbies/ and set `image: "hobbies/your-photo.jpg"`; without
// an image the card shows the hand-drawn doodle named in `doodle`.
export type Hobby = {
  title: string;
  note: string;
  doodle: "game" | "pencil" | "yarn" | "needle" | "swim" | "bike";
  image?: string;
};

export const hobbies: Hobby[] = [
  { title: "Gaming", note: "one more round, promise", doodle: "game" },
  { title: "Drawing", note: "hence all the doodles", doodle: "pencil" },
  { title: "Crocheting", note: "always mid-project", doodle: "yarn" },
  { title: "Sewing", note: "I fix it myself", doodle: "needle" },
  { title: "Swimming", note: "best place to think", doodle: "swim" },
  { title: "Cycling", note: "wind in my face", doodle: "bike" },
];
