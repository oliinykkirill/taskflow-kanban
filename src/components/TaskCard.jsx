import React from 'react';
import {
  Calendar,
  CheckSquare,
  AlertCircle,
  Flame,
  ArrowUp,
  Minus,
  ArrowDown,
  Trash2,
} from 'lucide-react';
import { PRIORITIES, TAG_COLORS } from '../constants';

const PriorityIcons = {
  urgent: Flame,
  high: ArrowUp,
  medium: Minus,
  low: ArrowDown,
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
  isDragging,
}) {
  const priorityConfig = PRIORITIES[task.priority] || PRIORITIES.medium;
  const PriorityIcon = PriorityIcons[task.priority] || Minus;

  const totalSubtasks = (task.subtasks || []).length;
  const completedSubtasks = (task.subtasks || []).filter((s) => s.completed).length;
  const subtasksPercent =
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && task.columnId !== 'done';

  return (
    <div
      className={`task-card ${isDragging ? 'is-dragging' : ''}`}
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      onClick={() => onEdit(task)}
    >
      <div className="card-header">
        <div className="card-id-wrapper">
          <span className="card-id">{task.id}</span>
          <div
            className="priority-badge"
            style={{
              color: priorityConfig.color,
              backgroundColor: priorityConfig.bg,
              borderColor: priorityConfig.border,
            }}
            title={`Priority: ${priorityConfig.label}`}
          >
            <PriorityIcon size={12} strokeWidth={2.5} />
            <span>{priorityConfig.label}</span>
          </div>
        </div>

        <button
          className="card-delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm(`Delete issue ${task.id}?`)) {
              onDelete(task.id);
            }
          }}
          title="Delete issue"
        >
          <Trash2 size={13} />
        </button>
      </div>

      <h4 className="card-title">{task.title}</h4>

      {task.description && <p className="card-description">{task.description}</p>}

      {task.tags && task.tags.length > 0 && (
        <div className="card-tags">
          {task.tags.map((tag) => {
            const tagStyle = TAG_COLORS[tag] || {
              text: '#94a3b8',
              bg: 'rgba(148, 163, 184, 0.12)',
            };
            return (
              <span
                key={tag}
                className="tag-badge"
                style={{ color: tagStyle.text, backgroundColor: tagStyle.bg }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}

      {/* Subtasks will be added in next iteration */}

      <div className="card-footer">
        <div className={`due-date ${isOverdue ? 'overdue' : ''}`}>
          <Calendar size={13} />
          <span>{task.dueDate || 'No date'}</span>
        </div>

        {task.assignee && (
          <div
            className="avatar"
            style={{ backgroundColor: task.assignee.color || '#6366f1' }}
            title={`Assignee: ${task.assignee.name}`}
          >
            {task.assignee.avatar}
          </div>
        )}
      </div>
    </div>
  );
}
