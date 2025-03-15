import React from 'react';
import KanbanColumn from './KanbanColumn';

export default function KanbanBoard({ columns, tasks, onAddTask }) {
  return (
    <div className="kanban-board">
      {columns.map((col) => (
        <KanbanColumn
          key={col.id}
          column={col}
          tasks={tasks.filter((t) => t.columnId === col.id)}
          onAddTask={onAddTask}
        />
      ))}
    </div>
  );
}
