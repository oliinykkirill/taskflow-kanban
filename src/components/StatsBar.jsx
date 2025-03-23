import React from 'react';
import { CheckCircle2, Clock, PlayCircle, Eye, BarChart3 } from 'lucide-react';

export default function StatsBar({ stats }) {
  const { total, completed, inProgress, review, completionRate } = stats;

  return (
    <div className="stats-bar">
      <div className="stats-items">
        <div className="stat-card">
          <div className="stat-icon-wrapper stat-total">
            <BarChart3 size={15} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Issues</span>
            <span className="stat-value">{total}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-progress">
            <PlayCircle size={15} />
          </div>
          <div className="stat-content">
            <span className="stat-label">In Progress</span>
            <span className="stat-value">{inProgress}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-review">
            <Eye size={15} />
          </div>
          <div className="stat-content">
            <span className="stat-label">In Review</span>
            <span className="stat-value">{review}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrapper stat-completed">
            <CheckCircle2 size={15} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{completed}</span>
          </div>
        </div>
      </div>

      <div className="stat-progress-section">
        <div className="progress-header">
          <span className="progress-title">Sprint Progress</span>
          <span className="progress-percentage">{completionRate}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${completionRate}%` }} />
        </div>
      </div>
    </div>
  );
}
