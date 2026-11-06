export const profile = {
  name: "Skyler Simpson",
  email: "skylerrsimpson@gmail.com",
  github: "https://github.com/SkylerrSimpson",
  linkedin: "https://www.linkedin.com/in/skyler-simpson1/",
  about: [
    "I graduated from Western Washington University in winter 2025 with a degree in computer science. Since then, I’ve worked at a local software company in Bellingham, Washington, while building personal projects on the side.",
    "I completed Western’s web development bootcamp in 2024, where I became a stronger programmer and got interested in full-stack development. In college, I also regularly competed in programming contests and served as vice president of the competitive coding club.",
    "I still enjoy algorithm problems and the process of making a working solution faster or simpler. I’ve applied those skills to my own applications, including a solver for a strategy game that searches and ranks item combinations directly in the browser.",
  ],
};

export type Project = {
  slug: string;
  name: string;
  category: "Web application" | "Excel add-in";
  headline: string;
  description: string;
  tags: string[];
  focus: string;
  overview: string;
  details: { title: string; description: string }[];
};

export const projects: Project[] = [
  {
    slug: "tftbis",
    name: "TFTBIS",
    category: "Web application",
    headline: "Teamfight Tactics analytics",
    description:
      "A Teamfight Tactics app for comparing champions, items, and builds using match data.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    focus:
      "I’m working on the full application, from collecting match data and calculating build statistics to the Next.js interface.",
    overview:
      "TFTBIS uses match results to compare item builds in Teamfight Tactics. Players can look up a champion, try an item combination, or compare two builds. I’m building both the data processing and the Next.js application.",
    details: [
      {
        title: "Data pipeline",
        description:
          "A worker processes match data into a PostgreSQL database. Shared packages keep the game data and statistical calculations consistent across the app.",
      },
      {
        title: "Champion and item pages",
        description:
          "Search for a champion to see its item builds, or start with an item set and look up the champions that use it.",
      },
      {
        title: "Statistical comparisons",
        description:
          "Each comparison includes sample sizes and a confidence interval for the difference between two builds.",
      },
    ],
  },
  {
    slug: "cigolflow",
    name: "CigolFlow",
    category: "Excel add-in",
    headline: "Audit evidence inside Excel",
    description:
      "An Excel add-in I’m developing for linking spreadsheet cells to the documents used in an audit.",
    tags: ["TypeScript", "React", "Office.js", "PDF"],
    focus:
      "I develop the PDF viewer and linking features in a browser, with a separate Office.js integration for Excel.",
    overview:
      "I’m developing CigolFlow to help with reviewing audit evidence in Excel. It links a spreadsheet cell to the relevant part of a PDF and records how different pieces of evidence relate to each other.",
    details: [
      {
        title: "PDF excerpts",
        description:
          "The React viewer connects selected PDF content to a spreadsheet cell. Selecting the cell brings up its evidence, with a shortcut back to the relevant part of the document.",
      },
      {
        title: "Evidence links",
        description:
          "Documents and excerpts can be linked to show where they support, contradict, or explain one another. The editor checks for duplicate links and conflicting relationships before saving.",
      },
      {
        title: "Testing outside Excel",
        description:
          "The Excel integration uses Office.js. I develop the React viewer against a simulated spreadsheet so I can test document selection, links, and saving in a browser.",
      },
    ],
  },
];

export function getProjectNumber(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return index === -1 ? undefined : String(index + 1).padStart(2, "0");
}

export function getNextProject(slug: string, orderedProjects: readonly Project[] = projects) {
  const index = orderedProjects.findIndex((project) => project.slug === slug);
  if (index === -1 || orderedProjects.length < 2) return undefined;
  return orderedProjects[(index + 1) % orderedProjects.length];
}

export const archive = [
  {
    name: "Dictionary",
    description: "A full-stack dictionary app built while exploring the web.",
    stack: "React · Node.js · MongoDB",
    href: "https://github.com/SkylerrSimpson/DictionaryApp",
    preview: "/archive/dictapplaptop.webp",
    originalDemo: "https://skylerdictionary.netlify.app/",
  },
  {
    name: "DevFinder",
    description: "A small tool to search and save GitHub profiles.",
    stack: "React · REST APIs · MongoDB",
    href: "https://github.com/SkylerrSimpson/Devfinder",
    preview: "/archive/devfinderlaptop.webp",
  },
  {
    name: "TodoList",
    description: "A to-do list with a React interface and an Express API backed by MongoDB.",
    stack: "React · Express · MongoDB",
    href: "https://github.com/SkylerrSimpson/TodoList",
  },
  {
    name: "TipApp",
    description: "A tip calculator that splits the bill and tip between a group of people.",
    stack: "React · JavaScript · CSS",
    href: "https://github.com/SkylerrSimpson/TipApp",
  },
];

export const experience = [
  {
    name: "DowsScripts",
    role: "Independent development",
    description:
      "An internal application I built for non-technical coworkers at my company. I developed the application independently.",
    tags: ["PHP", "Internal tools"],
  },
  {
    name: "Usurper",
    role: "Ongoing maintenance and contributions",
    description:
      "A Laravel inventory management system that I actively maintain and contribute to through pull requests.",
    tags: ["PHP", "Laravel", "Inventory management"],
  },
];

export const skills = [
  { label: "Backend", items: ["PHP", "Laravel", "Node.js", "PostgreSQL"] },
  { label: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { label: "Development", items: ["Git", "Playwright", "Python"] },
];
