import React, { useEffect } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import KanbanBoard from './components/KanbanBoard';
import TaskModal from './components/TaskModal';
import { useKanban } from './hooks/useKanban';
import './App.css';

export default function App() {
  const {
    columns,
    tasks,
    theme,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    selectedPriority,
    setSelectedPriority,
    selectedTag,
    setSelectedTag,
    editingTask,
    setEditingTask,
    creatingInColumn,
    setCreatingInColumn,
    draggedTaskId,
    setDraggedTaskId,
    dragOverColumnId,
    setDragOverColumnId,
    moveTask,
    addTask,
    updateTask,
    deleteTask,
    resetToDemo,
    stats,
  } = useKanban();

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input/textarea
      const targetTag = e.target.tagName.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') {
        return;
      }

      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setCreatingInColumn('todo');
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) searchInput.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setCreatingInColumn]);

  const isModalOpen = Boolean(editingTask || creatingInColumn);

  const handleSaveModal = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
    } else {
      addTask(taskData);
    }
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setCreatingInColumn(null);
  };

  return (
    <div className="app-layout">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPriority={selectedPriority}
        setSelectedPriority={setSelectedPriority}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        theme={theme}
        toggleTheme={toggleTheme}
        resetToDemo={resetToDemo}
        onOpenCreateModal={(colId) => setCreatingInColumn(colId || 'todo')}
      />

      <main className="main-content">
        <StatsBar stats={stats} />

        <KanbanBoard
          columns={columns}
          tasks={tasks}
          draggedTaskId={draggedTaskId}
          setDraggedTaskId={setDraggedTaskId}
          dragOverColumnId={dragOverColumnId}
          setDragOverColumnId={setDragOverColumnId}
          moveTask={moveTask}
          onEditTask={(task) => setEditingTask(task)}
          onDeleteTask={deleteTask}
          onAddTask={(colId) => setCreatingInColumn(colId)}
        />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <span>TaskFlow • Production React Kanban Board</span>
          <span className="footer-separator">•</span>
          <span>
            Keyboard shortcuts: <kbd>N</kbd> New Issue • <kbd>⌘K</kbd> Search •{' '}
            <kbd>Esc</kbd> Close
          </span>
        </div>
      </footer>

      <TaskModal
        isOpen={isModalOpen}
        task={editingTask}
        defaultColumnId={creatingInColumn}
        columns={columns}
        onClose={handleCloseModal}
        onSave={handleSaveModal}
        onDelete={deleteTask}
      />
    </div>
  );
}
