import { useState, useEffect, useMemo, useCallback } from 'react';
import { INITIAL_COLUMNS, INITIAL_TASKS } from '../constants';

const STORAGE_KEY_TASKS = 'taskflow_kanban_tasks_v1';
const STORAGE_KEY_THEME = 'taskflow_kanban_theme_v1';

export function useKanban() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TASKS);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [columns] = useState(INITIAL_COLUMNS);

  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
    } catch {
      return 'dark';
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');

  const [editingTask, setEditingTask] = useState(null);
  const [creatingInColumn, setCreatingInColumn] = useState(null);
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumnId, setDragOverColumnId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks to localStorage', e);
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      console.error('Failed to save theme', e);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const moveTask = useCallback((taskId, targetColumnId) => {
    setTasks((prevTasks) => {
      const taskIndex = prevTasks.findIndex((t) => t.id === taskId);
      if (taskIndex === -1) return prevTasks;
      const task = prevTasks[taskIndex];
      if (task.columnId === targetColumnId) return prevTasks;

      const updated = [...prevTasks];
      updated[taskIndex] = { ...task, columnId: targetColumnId };
      return updated;
    });
  }, []);

  const addTask = useCallback((taskData) => {
    const nextNum = Math.floor(100 + Math.random() * 900);
    const newTask = {
      ...taskData,
      id: `TASK-${nextNum}`,
      createdAt: new Date().toISOString(),
      subtasks: taskData.subtasks || [],
    };
    setTasks((prev) => [newTask, ...prev]);
    setCreatingInColumn(null);
  }, []);

  const updateTask = useCallback((taskId, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updatedFields } : t))
    );
    setEditingTask(null);
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    setEditingTask(null);
  }, []);

  const toggleSubtask = useCallback((taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const updatedSubtasks = (t.subtasks || []).map((st) =>
          st.id === subtaskId ? { ...st, completed: !st.completed } : st
        );
        return { ...t, subtasks: updatedSubtasks };
      })
    );
  }, []);

  const resetToDemo = useCallback(() => {
    setTasks(INITIAL_TASKS);
    setSearchQuery('');
    setSelectedPriority('all');
    setSelectedTag('all');
  }, []);

  // Filter tasks based on search, priority, tag
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesPriority =
        selectedPriority === 'all' || t.priority === selectedPriority;

      const matchesTag =
        selectedTag === 'all' || (t.tags && t.tags.includes(selectedTag));

      return matchesSearch && matchesPriority && matchesTag;
    });
  }, [tasks, searchQuery, selectedPriority, selectedTag]);

  // Metrics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.columnId === 'done').length;
    const inProgress = tasks.filter((t) => t.columnId === 'in_progress').length;
    const review = tasks.filter((t) => t.columnId === 'review').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, inProgress, review, completionRate };
  }, [tasks]);

  return {
    columns,
    tasks: filteredTasks,
    allTasksCount: tasks.length,
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
    toggleSubtask,
    resetToDemo,
    stats,
  };
}
