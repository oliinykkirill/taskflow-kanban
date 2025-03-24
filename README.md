# TaskFlow

A minimalist Kanban task board built with React and Vite, inspired by Linear's interface.

## Features

- Native drag-and-drop to reorder and move tasks across columns
- Task creation and editing (priority, tags, due date, assignee, subtasks)
- Checklist progress indicator on cards
- Search by keyword and filter by priority or domain tag
- Sprint statistics summary (total, in progress, in review, completed)
- Keyboard shortcuts (`N` for new issue, `Cmd+K` for search, `Esc` to close modals)
- Dark and light theme support
- State persistence via `localStorage` with a reset to demo data option

## Tech Stack

- React 18
- Vite
- Lucide React (icons)
- Vanilla CSS with CSS custom properties

## Getting Started

### Prerequisites

Node.js 18+ and npm.

### Installation

```bash
npm install
```

### Running Locally

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

Built assets are generated in the `dist/` directory.

## License

MIT
