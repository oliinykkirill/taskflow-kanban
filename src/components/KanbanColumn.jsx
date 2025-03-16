import React from 'react';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

export default function KanbanColumn({
  column,
  tasks,
  onEditTask,
  onDeleteTask,
  onAddTask,
  draggedTaskId,
  isDragOver,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDrop,
}) {
  return (
    <div
      className={`kanban-column ${isDragOver ? 'is-drag-over' : ''}`}
      onDragOver={(e) => onDragOver(e, column.id)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div className="column-header">
        <div className="column-title-group">
          <span className="column-dot" style={{ backgroundColor: column.color }} />
          <h3 className="column-title">{column.title}</h3>
          <span className="column-count">{tasks.length}</span>
        </div>

        <button
          className="column-add-btn"
          onClick={() => onAddTask(column.id)}
          title={`Add issue to ${column.title}`}
        >
          <Plus size={15} />
        </button>
      </div>

      <div className="column-cards">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            isDragging={draggedTaskId === task.id}
          />
        ))}

        {tasks.length === 0 && (
          <div className="column-empty-state">
            <span className="empty-text">No issues</span>
            <button className="empty-add-btn" onClick={() => onAddTask(column.id)}>
              + Add issue
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
