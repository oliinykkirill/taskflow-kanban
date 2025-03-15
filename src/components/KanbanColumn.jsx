import React from 'react';
import { Plus } from 'lucide-react';

export default function KanbanColumn({ column, tasks, onAddTask }) {
  return (
    <div className="kanban-column">
      <div className="column-header">
        <div className="column-title-group">
          <span className="column-dot" style={{ backgroundColor: column.color }} />
          <h3 className="column-title">{column.title}</h3>
          <span className="column-count">{tasks.length}</span>
        </div>
        <button className="column-add-btn" onClick={() => onAddTask && onAddTask(column.id)}>
          <Plus size={15} />
        </button>
      </div>
      <div className="column-cards">
        {tasks.map((task) => (
          <div key={task.id} className="task-card-placeholder">
            {task.title}
          </div>
        ))}
      </div>
    </div>
  );
}
