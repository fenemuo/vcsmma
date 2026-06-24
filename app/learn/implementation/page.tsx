import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Implementation Documentation — VCSMMA",
  description: "Chapter 4: Complete implementation documentation of the VCSMMA platform.",
};

export default function ImplementationPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Chapter 4: Implementation Documentation
        </h1>
        <p className="text-slate-300 text-lg">
          Complete technical documentation of the VCSMMA platform architecture, components, and algorithms.
        </p>
        <div className="mt-4 text-sm text-slate-400">
          <p>Platform: Web-Based Interactive Learning Platform for OS Concepts</p>
          <p>Technology Stack: Next.js 16 • React 19 • TypeScript • Tailwind CSS • Recharts</p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="mb-12 bg-slate-800/30 rounded-lg p-6 border border-slate-700/30">
        <h2 className="text-2xl font-bold text-white mb-6">Table of Contents</h2>
        <div className="space-y-2 text-slate-300">
          <p><a href="#arch" className="text-blue-400 hover:underline">4.1 System Architecture</a></p>
          <p><a href="#tech-stack" className="text-blue-400 hover:underline">4.2 Technology Stack and Dependencies</a></p>
          <p><a href="#project-structure" className="text-blue-400 hover:underline">4.3 Project Structure</a></p>
          <p><a href="#core-algorithms" className="text-blue-400 hover:underline">4.4 Core Algorithm Implementations</a></p>
          <p><a href="#frontend-components" className="text-blue-400 hover:underline">4.5 Frontend Components</a></p>
          <p><a href="#ui-design" className="text-blue-400 hover:underline">4.6 User Interface Design</a></p>
          <p><a href="#data-flow" className="text-blue-400 hover:underline">4.7 Data Flow and State Management</a></p>
          <p><a href="#visualization" className="text-blue-400 hover:underline">4.8 Visualization Techniques</a></p>
          <p><a href="#pages" className="text-blue-400 hover:underline">4.9 Page Implementations</a></p>
          <p><a href="#challenges" className="text-blue-400 hover:underline">4.10 Implementation Challenges & Solutions</a></p>
        </div>
      </section>

      {/* 4.1 System Architecture */}
      <section id="arch" className="mb-8 space-y-6 bg-slate-900/50 rounded-lg p-8 border border-slate-800/50">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">4.1 System Architecture</h2>
          <p className="text-slate-300 mb-4">
            VCSMMA employs a modern three-tier web architecture consisting of client-side frontend, server-side rendering, and algorithm processing layers.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="text-lg font-semibold text-white mb-2">Architecture Layers</h3>
            <ul className="space-y-2 text-slate-300">
              <li><strong className="text-blue-300">Presentation Layer:</strong> React components with Tailwind CSS styling</li>
              <li><strong className="text-blue-300">Logic Layer:</strong> TypeScript-based algorithm implementations</li>
              <li><strong className="text-blue-300">Data Layer:</strong> State management using React hooks (useState, useCallback)</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="text-lg font-semibold text-white mb-2">Application Flow</h3>
            <div className="text-slate-300 text-sm space-y-1">
              <p>1. User configures process parameters in simulator page</p>
              <p>2. Algorithm execution triggered via &quot;Run&quot; button</p>
              <p>3. Algorithm processes input and returns scheduling results</p>
              <p>4. Results rendered as Gantt chart and detailed results table</p>
              <p>5. Links to learning resources provide conceptual context</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4.2 Technology Stack */}
      <section id="tech-stack" className="mb-8 space-y-6 bg-slate-900/50 rounded-lg p-8 border border-slate-800/50">
        <h2 className="text-2xl font-bold text-white mb-4">4.2 Technology Stack and Dependencies</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-3">Frontend Framework</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• <strong>Next.js 16.2.9</strong> - React metaframework for production</li>
              <li>• <strong>React 19.2.4</strong> - UI component library</li>
              <li>• <strong>React DOM 19.2.4</strong> - DOM rendering</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-3">Styling & UI</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• <strong>Tailwind CSS 4</strong> - Utility-first CSS framework</li>
              <li>• <strong>React Icons 5.6.0</strong> - Icon library</li>
              <li>• <strong>PostCSS 4</strong> - CSS transformation</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-3">Visualization</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• <strong>Recharts 3.8.1</strong> - React charting library</li>
              <li>• <strong>SVG</strong> - Gantt chart rendering</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-3">Language & Type Safety</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• <strong>TypeScript 5</strong> - Type-safe JavaScript</li>
              <li>• <strong>ESLint 9</strong> - Code linting</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-3">Database & ORM</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• <strong>Prisma 7.8.0</strong> - ORM</li>
              <li>• <strong>PostgreSQL</strong> - Database (via pg 8.22.0)</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-3">Development Tools</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• <strong>Node.js</strong> - Runtime environment</li>
              <li>• <strong>npm</strong> - Package manager</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4.3 Project Structure */}
      <section id="project-structure" className="mb-8 space-y-6 bg-slate-900/50 rounded-lg p-8 border border-slate-800/50">
        <h2 className="text-2xl font-bold text-white mb-4">4.3 Project Structure</h2>

        <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30 font-mono text-sm text-slate-300 overflow-x-auto">
          <pre>{`vcsmma/
├── app/                           # Next.js app directory
│   ├── components/
│   │   ├── gantt-chart/           # Gantt chart visualization
│   │   ├── memory-chart/          # Memory allocation charts
│   │   ├── quiz/                  # Quiz components
│   │   ├── ui/                    # Reusable UI components
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── Logo.tsx
│   ├── dashboard/                 # Dashboard page
│   ├── learn/                     # Learning resources
│   │   └── implementation/        # This documentation
│   ├── profile/                   # User profile page
│   ├── quiz/                      # Quiz module
│   ├── simulator/                 # CPU scheduling simulator
│   ├── simulators/                # Simulator index
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── globals.css                # Global styles
├── lib/
│   ├── algorithms/                # Core algorithm implementations
│   │   ├── fcfs.ts               # First Come First Served
│   │   ├── sjf.ts                # Shortest Job First
│   │   ├── roundRobin.ts         # Round Robin scheduling
│   │   ├── priority.ts           # Priority scheduling
│   │   ├── srtf.ts               # Shortest Remaining Time First
│   │   ├── firstFit.ts           # Memory allocation
│   │   ├── bestFit.ts            # Memory allocation
│   │   ├── fifoPaging.ts         # Page replacement
│   │   ├── lruPaging.ts          # Page replacement
│   │   └── README.md
│   ├── prisma.ts                  # Database client
├── prisma/
│   ├── schema.prisma              # Database schema
│   └── seed.ts                    # Database seeding
├── public/                        # Static assets
├── types/                         # TypeScript type definitions
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── eslint.config.mjs`}</pre>
        </div>
      </section>

      {/* 4.4 Core Algorithms */}
      <section id="core-algorithms" className="mb-8 space-y-6 bg-slate-900/50 rounded-lg p-8 border border-slate-800/50">
        <h2 className="text-2xl font-bold text-white mb-4">4.4 Core Algorithm Implementations</h2>

        <div className="space-y-4">
          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">CPU Scheduling Algorithms</h3>
            <p className="text-sm text-slate-300 mb-3">
              All CPU scheduling algorithms follow a consistent interface pattern with input validation and output standardization.
            </p>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><strong>FCFS (fcfs.ts):</strong> Non-preemptive, processes executed in arrival order. Time Complexity: O(n log n)</li>
              <li><strong>SJF (sjf.ts):</strong> Non-preemptive, shortest burst time selected. Time Complexity: O(n²)</li>
              <li><strong>Round Robin (roundRobin.ts):</strong> Preemptive, fixed time quantum allocation. Time Complexity: O(n·k) where k is queue iterations</li>
              <li><strong>Priority (priority.ts):</strong> Non-preemptive, lowest priority number executes first. Time Complexity: O(n²)</li>
              <li><strong>SRTF (srtf.ts):</strong> Preemptive, shortest remaining time selected. Time Complexity: O(n²)</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Memory Management Algorithms</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><strong>First Fit:</strong> Allocates first available block of sufficient size</li>
              <li><strong>Best Fit:</strong> Allocates smallest block that fits, minimizing wasted space</li>
              <li><strong>Worst Fit:</strong> Allocates largest available block</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Page Replacement Algorithms</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><strong>FIFO:</strong> Replaces oldest page in memory</li>
              <li><strong>LRU:</strong> Replaces least recently used page</li>
              <li><strong>Optimal:</strong> Replaces page needed furthest in future</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Common Interface Pattern</h3>
            <div className="bg-slate-900 p-3 rounded text-xs text-slate-200 font-mono">
              <pre>{`interface Process {
  id: string;
  arrival: number;
  burst: number;
  priority?: number;
}

interface Result extends Process {
  start: number;
  finish: number;
  waiting: number;
  turnaround: number;
}`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5 Frontend Components */}
      <section id="frontend-components" className="mb-8 space-y-6 bg-slate-900/50 rounded-lg p-8 border border-slate-800/50">
        <h2 className="text-2xl font-bold text-white mb-4">4.5 Frontend Components</h2>

        <div className="space-y-4">
          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">GanttChart Component</h3>
            <p className="text-sm text-slate-300 mb-2">
              SVG-based visualization component rendering process execution timelines with color-coded task bars.
            </p>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Supports single and multiple time segments (Round Robin)</li>
              <li>• Dynamic scaling based on maximum completion time</li>
              <li>• Configurable pixel-per-unit ratio for responsiveness</li>
              <li>• Color-coded process identification</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Navbar Component</h3>
            <p className="text-sm text-slate-300">Navigation bar with links to main sections: Simulator, Learn, Quiz, Dashboard, and Profile.</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">MainHero Component</h3>
            <p className="text-sm text-slate-300">Landing page hero section with feature showcase and algorithm category cards.</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">ExploreCard & ExploreGrid</h3>
            <p className="text-sm text-slate-300">Responsive grid layout showcasing platform features with interactive card components.</p>
          </div>
        </div>
      </section>

      {/* 4.6 UI Design */}
      <section id="ui-design" className="mb-8 space-y-6 bg-slate-900/50 rounded-lg p-8 border border-slate-800/50">
        <h2 className="text-2xl font-bold text-white mb-4">4.6 User Interface Design</h2>

        <div className="space-y-4">
          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Design System</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><strong>Color Palette:</strong> Dark theme using slate colors (50-950) with accent blues</li>
              <li><strong>Typography:</strong> Responsive font sizing from sm (12px) to 4xl (36px)</li>
              <li><strong>Spacing:</strong> Consistent 4px base unit (mt-4 = 16px, p-6 = 24px)</li>
              <li><strong>Borders & Shadows:</strong> Subtle depth with slate-800 borders and shadows</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Responsive Layout</h3>
            <p className="text-sm text-slate-300 mb-2">Responsive design using Tailwind breakpoints:</p>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Mobile-first approach</li>
              <li>• sm: 640px, md: 768px, lg: 1024px, xl: 1280px</li>
              <li>• Grid layouts adapt from 1 to multi-column</li>
              <li>• Overflow handling for tables and charts</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Accessibility Considerations</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• Semantic HTML structure</li>
              <li>• Proper heading hierarchy (h1-h6)</li>
              <li>• Color contrast ratios &gt; 4.5:1</li>
              <li>• Focus states for interactive elements</li>
              <li>• Form labels properly associated with inputs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4.7 Data Flow */}
      <section id="data-flow" className="mb-8 space-y-6 bg-slate-900/50 rounded-lg p-8 border border-slate-800/50">
        <h2 className="text-2xl font-bold text-white mb-4">4.7 Data Flow and State Management</h2>

        <div className="space-y-4">
          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">State Management Strategy</h3>
            <p className="text-sm text-slate-300 mb-3">
              VCSMMA uses React hooks for state management with a component-level state approach.
            </p>
            <div className="bg-slate-900 p-3 rounded text-xs text-slate-200 font-mono">
              <pre>{`// Simulator Page State
const [algo, setAlgo] = useState&lt;Algo&gt;("fcfs");
const [quantum, setQuantum] = useState(4);
const [processes, setProcesses] = useState&lt;Proc[]&gt;([...]);
const [results, setResults] = useState&lt;any[] | null&gt;(null);`}</pre>
            </div>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Data Flow Diagram (Simulator)</h3>
            <div className="text-sm text-slate-300 space-y-2">
              <p>1. <strong>Input:</strong> User configures processes (id, arrival, burst, priority)</p>
              <p>2. <strong>Algorithm Selection:</strong> User selects CPU scheduling algorithm</p>
              <p>3. <strong>Execution:</strong> Run button triggers algorithm with processes array</p>
              <p>4. <strong>Processing:</strong> Algorithm calculates start, finish, waiting, turnaround times</p>
              <p>5. <strong>Rendering:</strong> Results displayed in Gantt chart and table format</p>
              <p>6. <strong>Analysis:</strong> Average metrics calculated and displayed</p>
            </div>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">User Interactions</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><strong>Add Process:</strong> Appends new process to array, rerenders form</li>
              <li><strong>Update Process:</strong> Updates specific field in process object</li>
              <li><strong>Remove Process:</strong> Filters process from array</li>
              <li><strong>Algorithm Selection:</strong> Updates state and shows/hides relevant inputs</li>
              <li><strong>Run Simulation:</strong> Executes algorithm and displays results</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4.8 Visualization */}
      <section id="visualization" className="mb-8 space-y-6 bg-slate-900/50 rounded-lg p-8 border border-slate-800/50">
        <h2 className="text-2xl font-bold text-white mb-4">4.8 Visualization Techniques</h2>

        <div className="space-y-4">
          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Gantt Chart Implementation</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><strong>Technology:</strong> SVG (Scalable Vector Graphics)</li>
              <li><strong>Rendering:</strong> Dynamic dimension calculation based on data</li>
              <li><strong>Features:</strong> Task bars, time axis labels, color coding</li>
              <li><strong>Responsive:</strong> Overflow scrolling for wide timelines</li>
              <li><strong>Special Handling:</strong> Round Robin displays multiple segments per process</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Table Visualization</h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><strong>HTML Table:</strong> Semantic &lt;table&gt; elements</li>
              <li><strong>Conditional Columns:</strong> Priority column shows only for Priority scheduling</li>
              <li><strong>Data Formatting:</strong> Start times joined for Round Robin</li>
              <li><strong>Summary Row:</strong> Average waiting time calculation and display</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Recharts Integration</h3>
            <p className="text-sm text-slate-300">
              Recharts library available for future memory allocation and paging visualizations with bar charts, line graphs, and pie charts.
            </p>
          </div>
        </div>
      </section>

      {/* 4.9 Pages */}
      <section id="pages" className="mb-8 space-y-6 bg-slate-900/50 rounded-lg p-8 border border-slate-800/50">
        <h2 className="text-2xl font-bold text-white mb-4">4.9 Page Implementations</h2>

        <div className="space-y-4">
          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Home Page (app/page.tsx)</h3>
            <p className="text-sm text-slate-300">Hero section with platform overview and navigation to main features.</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Simulator Page (app/simulator/page.tsx)</h3>
            <p className="text-sm text-slate-300 mb-2">Interactive CPU scheduling simulator with:</p>
            <ul className="space-y-1 text-sm text-slate-300 ml-4">
              <li>• Algorithm selection (FCFS, SJF, Round Robin, Priority)</li>
              <li>• Process configuration form</li>
              <li>• Quantum input for Round Robin</li>
              <li>• Priority input conditional display</li>
              <li>• Gantt chart visualization</li>
              <li>• Results table with metrics</li>
              <li>• Link to learning resources</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Learn Page (app/learn/page.tsx)</h3>
            <p className="text-sm text-slate-300 mb-2">Educational content covering:</p>
            <ul className="space-y-1 text-sm text-slate-300 ml-4">
              <li>• Key scheduling metrics with formulas</li>
              <li>• Algorithm explanations</li>
              <li>• Worked examples for each algorithm</li>
              <li>• Links to simulator</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Dashboard Page (app/dashboard/page.tsx)</h3>
            <p className="text-sm text-slate-300">Overview of user progress and recent activity (placeholder for expansion).</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Quiz Page (app/quiz/page.tsx)</h3>
            <p className="text-sm text-slate-300">Assessment module for testing algorithm understanding (foundation for expansion).</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Profile Page (app/profile/page.tsx)</h3>
            <p className="text-sm text-slate-300">User account and learning progress tracking (placeholder for expansion).</p>
          </div>
        </div>
      </section>

      {/* 4.10 Implementation Challenges */}
      <section id="challenges" className="mb-8 space-y-6 bg-slate-900/50 rounded-lg p-8 border border-slate-800/50">
        <h2 className="text-2xl font-bold text-white mb-4">4.10 Implementation Challenges & Solutions</h2>

        <div className="space-y-4">
          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Challenge 1: Round Robin Time Segmentation</h3>
            <p className="text-sm text-slate-300 mb-2"><strong>Problem:</strong> Round Robin processes execute in multiple quantum segments across time.</p>
            <p className="text-sm text-slate-300"><strong>Solution:</strong> Implemented startTimes array tracking all execution segments, displayed as comma-separated values and multi-segment Gantt bars.</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Challenge 2: Conditional Algorithm Parameters</h3>
            <p className="text-sm text-slate-300 mb-2"><strong>Problem:</strong> Priority and Quantum are only relevant for specific algorithms.</p>
            <p className="text-sm text-slate-300"><strong>Solution:</strong> Conditional rendering using algorithm state; Priority field only shows for Priority scheduling, Quantum only for Round Robin.</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Challenge 3: Gantt Chart Scaling</h3>
            <p className="text-sm text-slate-300 mb-2"><strong>Problem:</strong> Different process sets have vastly different completion times.</p>
            <p className="text-sm text-slate-300"><strong>Solution:</strong> Dynamic SVG sizing based on max completion time; configurable pixels-per-unit scaling.</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Challenge 4: Algorithm Interface Consistency</h3>
            <p className="text-sm text-slate-300 mb-2"><strong>Problem:</strong> Different algorithms have varying result structures.</p>
            <p className="text-sm text-slate-300"><strong>Solution:</strong> Established common interface pattern with optional fields; table rendering handles missing fields gracefully.</p>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Challenge 5: Type Safety with Algorithm Flexibility</h3>
            <p className="text-sm text-slate-300 mb-2"><strong>Problem:</strong> TypeScript requires strict types but algorithms have different signatures.</p>
            <p className="text-sm text-slate-300"><strong>Solution:</strong> Used &quot;as any&quot; casting in run function with clear type definitions for each algorithm&apos;s input/output.</p>
          </div>
        </div>
      </section>

      {/* Summary & Future Work */}
      <section className="mb-8 space-y-6 bg-linear-to-r from-blue-900/30 to-slate-900/50 rounded-lg p-8 border border-blue-800/50">
        <h2 className="text-2xl font-bold text-white mb-4">Implementation Summary</h2>

        <div className="space-y-4">
          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Current Implementation Status</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>✅ CPU Scheduling Simulator (FCFS, SJF, RR, Priority, SRTF)</li>
              <li>✅ Gantt Chart Visualization</li>
              <li>✅ Educational Content & Formulas</li>
              <li>✅ Responsive UI Design</li>
              <li>✅ Type-Safe Implementation</li>
              <li>🔄 Memory Management Simulators (Planned)</li>
              <li>🔄 Paging Simulation Module (Planned)</li>
              <li>🔄 Quiz & Assessment (Scaffolding Complete)</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Future Enhancements</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• User authentication and data persistence</li>
              <li>• Step-by-step algorithm animation</li>
              <li>• Performance comparison analytics</li>
              <li>• Export results to PDF/CSV</li>
              <li>• Collaborative learning features</li>
              <li>• Mobile app version</li>
            </ul>
          </div>

          <div className="bg-slate-800/30 p-4 rounded border border-slate-700/30">
            <h3 className="font-semibold text-blue-300 mb-2">Performance Metrics</h3>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• FCFS: O(n log n) sorting + O(n) processing</li>
              <li>• SJF: O(n²) iterative selection</li>
              <li>• Round Robin: O(n·k) where k is queue iterations</li>
              <li>• Priority: O(n²) iterative selection</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-700">
          <p className="text-sm text-slate-400 mb-4">
            This documentation provides a comprehensive overview of the VCSMMA platform implementation. For more information, refer to individual component files or contact the development team.
          </p>
          <div className="flex gap-4">
            <Link
              href="/learn#cpu-scheduling-breakdown"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
            >
              View Learning Resources →
            </Link>
            <Link
              href="/simulator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition"
            >
              Try the Simulator →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
