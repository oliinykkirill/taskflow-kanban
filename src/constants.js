export const PRIORITIES = {
  urgent: {
    label: 'Urgent',
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.15)',
    border: 'rgba(239, 68, 68, 0.3)',
  },
  high: {
    label: 'High',
    color: '#f97316',
    bg: 'rgba(249, 115, 22, 0.15)',
    border: 'rgba(249, 115, 22, 0.3)',
  },
  medium: {
    label: 'Medium',
    color: '#eab308',
    bg: 'rgba(234, 179, 8, 0.15)',
    border: 'rgba(234, 179, 8, 0.3)',
  },
  low: {
    label: 'Low',
    color: '#64748b',
    bg: 'rgba(100, 116, 139, 0.15)',
    border: 'rgba(100, 116, 139, 0.3)',
  },
};

export const TAG_COLORS = {
  Backend: { text: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)' },
  Frontend: { text: '#a78bfa', bg: 'rgba(167, 139, 250, 0.12)' },
  Architecture: { text: '#f43f5e', bg: 'rgba(244, 63, 94, 0.12)' },
  Performance: { text: '#10b981', bg: 'rgba(16, 185, 129, 0.12)' },
  Security: { text: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)' },
  DevOps: { text: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)' },
  Testing: { text: '#06b6d4', bg: 'rgba(6, 182, 212, 0.12)' },
};

export const INITIAL_COLUMNS = [
  { id: 'backlog', title: 'Backlog', color: '#94a3b8' },
  { id: 'todo', title: 'To Do', color: '#38bdf8' },
  { id: 'in_progress', title: 'In Progress', color: '#f59e0b' },
  { id: 'review', title: 'In Review', color: '#a855f7' },
  { id: 'done', title: 'Done', color: '#10b981' },
];

export const INITIAL_TASKS = [
  {
    id: 'TASK-101',
    title: 'Migrate Rails API to Ruby 3.3 with YJIT enabled',
    description:
      'Benchmark performance improvements on JSON serialization and evaluate memory usage under Puma clustered mode with M:N threads.',
    columnId: 'done',
    priority: 'high',
    tags: ['Backend', 'Performance'],
    dueDate: '2025-03-10',
    assignee: { name: 'Kirill O.', avatar: 'KO', color: '#6366f1' },
    subtasks: [
      { id: 'st-1', text: 'Upgrade Docker image to ruby:3.3-alpine', completed: true },
      {
        id: 'st-2',
        text: 'Configure RUBY_YJIT_ENABLE=1 in production environment',
        completed: true,
      },
      { id: 'st-3', text: 'Run RSpec regression suite', completed: true },
    ],
  },
  {
    id: 'TASK-102',
    title: 'Implement JWT refresh token rotation with Redis blacklist',
    description:
      'Ensure token revocation on logout, automatic sliding expiration for active users, and write request specs covering replay attacks.',
    columnId: 'done',
    priority: 'urgent',
    tags: ['Backend', 'Security'],
    dueDate: '2025-03-12',
    assignee: { name: 'Alex M.', avatar: 'AM', color: '#06b6d4' },
    subtasks: [
      {
        id: 'st-4',
        text: 'Setup Redis connection pool in Rails initializer',
        completed: true,
      },
      { id: 'st-5', text: 'Create RevokeToken service object', completed: true },
      {
        id: 'st-6',
        text: 'Verify 401 response on expired refresh tokens',
        completed: true,
      },
    ],
  },
  {
    id: 'TASK-103',
    title: 'Design Linear-style Dark Mode design tokens for TaskFlow',
    description:
      'Define semantic CSS custom properties for neutral surfaces, border glows, typography scales, and keyboard focus rings.',
    columnId: 'in_progress',
    priority: 'high',
    tags: ['Frontend', 'Architecture'],
    dueDate: '2025-03-20',
    assignee: { name: 'Kirill O.', avatar: 'KO', color: '#6366f1' },
    subtasks: [
      {
        id: 'st-7',
        text: 'Establish surface hierarchy: canvas, panel, card, hover',
        completed: true,
      },
      {
        id: 'st-8',
        text: 'Refine contrast ratio for a11y compliance (WCAG AA)',
        completed: true,
      },
      {
        id: 'st-9',
        text: 'Add smooth theme transition without layout shifts',
        completed: false,
      },
    ],
  },
  {
    id: 'TASK-104',
    title: 'Implement drag-and-drop column reordering with visual ghost preview',
    description:
      'Ensure fluid native drag-and-drop between columns with smooth drop-indicator indicators and persistent order index.',
    columnId: 'in_progress',
    priority: 'medium',
    tags: ['Frontend'],
    dueDate: '2025-03-22',
    assignee: { name: 'Kirill O.', avatar: 'KO', color: '#6366f1' },
    subtasks: [
      {
        id: 'st-10',
        text: 'HTML5 Drag & Drop event handlers (dragStart, dragOver, drop)',
        completed: true,
      },
      {
        id: 'st-11',
        text: 'Highlight drop targets with glowing dashed indicator',
        completed: true,
      },
      {
        id: 'st-12',
        text: 'Persist ordered task lists into localStorage',
        completed: false,
      },
    ],
  },
  {
    id: 'TASK-105',
    title: 'Add composite indexes for marketplace order queries',
    description:
      'Analyze EXPLAIN query plans for user purchase history endpoint; add composite index on (user_id, status, created_at).',
    columnId: 'review',
    priority: 'high',
    tags: ['Backend', 'Performance'],
    dueDate: '2025-03-18',
    assignee: { name: 'Elena V.', avatar: 'EV', color: '#10b981' },
    subtasks: [
      {
        id: 'st-13',
        text: 'Generate database migration with algorithm: :concurrently',
        completed: true,
      },
      {
        id: 'st-14',
        text: 'Verify p95 response time drops below 30ms on 100k rows',
        completed: true,
      },
    ],
  },
  {
    id: 'TASK-106',
    title: 'Setup GitHub Actions CI pipeline with parallel RSpec & RuboCop',
    description:
      'Configure multi-stage matrix workflow with dependency caching, Postgres/Redis services, and automated SimpleCov coverage check.',
    columnId: 'todo',
    priority: 'medium',
    tags: ['DevOps', 'Testing'],
    dueDate: '2025-03-25',
    assignee: { name: 'Kirill O.', avatar: 'KO', color: '#6366f1' },
    subtasks: [
      {
        id: 'st-15',
        text: 'Cache bundle and npm dependencies with actions/cache',
        completed: false,
      },
      {
        id: 'st-16',
        text: 'Fail workflow if line coverage drops below 90%',
        completed: false,
      },
    ],
  },
  {
    id: 'TASK-107',
    title: 'Full OpenAPI / Swagger 3.0 documentation with rswag',
    description:
      'Generate interactive Swagger UI endpoint for all API v1 endpoints with complete request/response schemas and authentication headers.',
    columnId: 'backlog',
    priority: 'low',
    tags: ['Backend', 'Testing'],
    dueDate: '2025-03-30',
    assignee: { name: 'Alex M.', avatar: 'AM', color: '#06b6d4' },
    subtasks: [
      { id: 'st-17', text: 'Install rswag-specs and rswag-ui gems', completed: false },
      {
        id: 'st-18',
        text: 'Document Orders and Products controller endpoints',
        completed: false,
      },
    ],
  },
];
