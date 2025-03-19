import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  CheckSquare,
  Square,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { PRIORITIES, TAG_COLORS } from '../constants';

const ASSIGNEES = [
  { name: 'Kirill O.', avatar: 'KO', color: '#6366f1' },
  { name: 'Alex M.', avatar: 'AM', color: '#06b6d4' },
  { name: 'Elena V.', avatar: 'EV', color: '#10b981' },
  { name: 'Dmitry K.', avatar: 'DK', color: '#f59e0b' },
];

export default function TaskModal({
  isOpen,
  task,
  defaultColumnId,
  columns,
  onClose,
  onSave,
  onDelete,
}) {
  const isEditing = Boolean(task);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [columnId, setColumnId] = useState(defaultColumnId || 'todo');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState([]);
  const [assignee, setAssignee] = useState(ASSIGNEES[0]);
  const [subtasks, setSubtasks] = useState([]);
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setColumnId(task.columnId || 'todo');
      setPriority(task.priority || 'medium');
      setDueDate(task.dueDate || '');
      setTags(task.tags || []);
      setAssignee(task.assignee || ASSIGNEES[0]);
      setSubtasks(task.subtasks || []);
    } else {
      setTitle('');
      setDescription('');
      setColumnId(defaultColumnId || 'todo');
      setPriority('medium');
      setDueDate(new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]);
      setTags(['Backend']);
      setAssignee(ASSIGNEES[0]);
      setSubtasks([]);
    }
    setNewSubtaskText('');
    setError('');
  }, [task, defaultColumnId, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleToggleTag = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handleAddSubtask = () => {
    if (!newSubtaskText.trim()) return;
    const newSt = {
      id: `st-${Date.now()}`,
      text: newSubtaskText.trim(),
      completed: false,
    };
    setSubtasks([...subtasks, newSt]);
    setNewSubtaskText('');
  };

  const handleToggleSubtask = (stId) => {
    setSubtasks(
      subtasks.map((st) => (st.id === stId ? { ...st, completed: !st.completed } : st))
    );
  };

  const handleDeleteSubtask = (stId) => {
    setSubtasks(subtasks.filter((st) => st.id !== stId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide an issue title.');
      return;
    }

    const payload = {
      title: title.trim(),
      description: description.trim(),
      columnId,
      priority,
      dueDate,
      tags,
      assignee,
      subtasks,
    };

    onSave(payload);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-badge">{isEditing ? task.id : 'New Issue'}</span>
            <h2 className="modal-title">
              {isEditing ? 'Edit Issue' : 'Create New Issue'}
            </h2>
          </div>

          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          {error && (
            <div className="modal-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Issue Title</label>
            <input
              type="text"
              className="form-input form-input-title"
              placeholder="e.g. Implement Redis token revocation service"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-row-3">
            <div className="form-group">
              <label className="form-label">Status Column</label>
              <select
                className="form-select"
                value={columnId}
                onChange={(e) => setColumnId(e.target.value)}
              >
                {columns.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                {Object.entries(PRIORITIES).map(([key, val]) => (
                  <option key={key} value={key}>
                    {val.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Describe requirements, context, or acceptance criteria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tags / Domains</label>
            <div className="tag-chips">
              {Object.keys(TAG_COLORS).map((tag) => {
                const isSelected = tags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    className={`tag-chip ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => handleToggleTag(tag)}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Assignee</label>
            <div className="assignee-selector">
              {ASSIGNEES.map((user) => {
                const isSelected = assignee?.name === user.name;
                return (
                  <button
                    key={user.name}
                    type="button"
                    className={`assignee-btn ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => setAssignee(user)}
                  >
                    <span
                      className="assignee-avatar"
                      style={{ backgroundColor: user.color }}
                    >
                      {user.avatar}
                    </span>
                    <span>{user.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          

          <div className="modal-footer">
            {isEditing && (
              <button
                type="button"
                className="btn-danger"
                onClick={() => {
                  if (window.confirm(`Delete issue ${task.id}?`)) {
                    onDelete(task.id);
                  }
                }}
              >
                <Trash2 size={15} />
                <span>Delete</span>
              </button>
            )}

            <div className="modal-footer-right">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                {isEditing ? 'Save Changes' : 'Create Issue'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
