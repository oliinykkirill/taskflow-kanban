import React from 'react';
import {
  Layers,
  Search,
  Filter,
  Plus,
  Sun,
  Moon,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { PRIORITIES, TAG_COLORS } from '../constants';

export default function Header({
  searchQuery,
  setSearchQuery,
  selectedPriority,
  setSelectedPriority,
  selectedTag,
  setSelectedTag,
  theme,
  toggleTheme,
  resetToDemo,
  onOpenCreateModal,
}) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="brand">
          <div className="brand-icon">
            <Layers size={20} className="icon-pulse" />
          </div>
          <div className="brand-text">
            <span className="brand-name">TaskFlow</span>
            <span className="brand-badge">Linear UI</span>
          </div>
        </div>

        <div className="workspace-pill">
          <span className="workspace-dot"></span>
          <span className="workspace-name">Core Platform Sprint v2.4</span>
        </div>
      </div>

      <div className="header-center">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search issues (title, ID, description)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={() => setSearchQuery('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
          <span className="kbd-shortcut">⌘K</span>
        </div>

        <div className="filter-group">
          <div className="filter-item">
            <Filter size={14} className="filter-icon" />
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Priorities</option>
              {Object.entries(PRIORITIES).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Tags</option>
              {Object.keys(TAG_COLORS).map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="header-right">
        <button
          className="btn-icon"
          onClick={resetToDemo}
          title="Reset to default demo data"
        >
          <RotateCcw size={16} />
        </button>

        <button
          className="btn-icon"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <button className="btn-primary" onClick={() => onOpenCreateModal('todo')}>
          <Plus size={16} />
          <span>New Issue</span>
          <span className="btn-shortcut">N</span>
        </button>
      </div>
    </header>
  );
}
