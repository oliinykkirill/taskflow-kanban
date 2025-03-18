import React from 'react';
import KanbanColumn from './KanbanColumn';

export default function KanbanBoard({
  columns,
  tasks,
  draggedTaskId,
  setDraggedTaskId,
  dragOverColumnId,
  setDragOverColumnId,
  moveTask,
  onEditTask,
  onDeleteTask,
  onAddTask,
}) {
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggedTaskId(taskId);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverColumnId(null);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumnId !== columnId) {
      setDragOverColumnId(columnId);
    }
  };

  const handleDragLeave = (e) => {
    // Only clear if leaving the column element completely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumnId(null);
    }
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    if (taskId) {
      moveTask(taskId, targetColumnId);
    }
    setDraggedTaskId(null);
    setDragOverColumnId(null);
  };

  return (
    <div className="kanban-board">
      {columns.map((column) => {
        const columnTasks = tasks.filter((t) => t.columnId === column.id);
        return (
          <KanbanColumn
            key={column.id}
            column={column}
            tasks={columnTasks}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
            onAddTask={onAddTask}
            draggedTaskId={draggedTaskId}
            isDragOver={dragOverColumnId === column.id}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
        );
      })}
    </div>
  );
}
