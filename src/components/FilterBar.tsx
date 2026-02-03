import React from 'react';
import { Filters, Priority, Category, Assignee } from '../types';
import { FiSearch, FiDownload, FiUpload, FiArchive } from 'react-icons/fi';

interface FilterBarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onExportJSON: () => void;
  onExportMarkdown: () => void;
  onImport: (file: File) => void;
  onArchiveCompleted: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onExportJSON,
  onExportMarkdown,
  onImport,
  onArchiveCompleted,
}) => {
  const handleImportClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) onImport(file);
    };
    input.click();
  };

  return (
    <div className="bg-dark-300 rounded-lg p-4 mb-6 space-y-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
              placeholder="Search tasks..."
              className="input w-full pl-10"
            />
          </div>
        </div>

        <select
          value={filters.priority}
          onChange={(e) => onFilterChange({ ...filters, priority: e.target.value as Priority | 'all' })}
          className="select"
        >
          <option value="all">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value as Category | 'all' })}
          className="select"
        >
          <option value="all">All Categories</option>
          <option value="Marketing">Marketing</option>
          <option value="Product">Product</option>
          <option value="Research">Research</option>
          <option value="Automation">Automation</option>
        </select>

        <select
          value={filters.assignee}
          onChange={(e) => onFilterChange({ ...filters, assignee: e.target.value as Assignee | 'all' })}
          className="select"
        >
          <option value="all">All Assignees</option>
          <option value="Arun">Arun</option>
          <option value="Arc">Arc</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={onExportJSON}
          className="btn-secondary text-sm flex items-center gap-2"
          title="Export to JSON"
        >
          <FiDownload size={16} />
          Export JSON
        </button>
        <button
          onClick={onExportMarkdown}
          className="btn-secondary text-sm flex items-center gap-2"
          title="Export to Markdown"
        >
          <FiDownload size={16} />
          Export MD
        </button>
        <button
          onClick={handleImportClick}
          className="btn-secondary text-sm flex items-center gap-2"
          title="Import from JSON"
        >
          <FiUpload size={16} />
          Import
        </button>
        <button
          onClick={onArchiveCompleted}
          className="btn-secondary text-sm flex items-center gap-2"
          title="Archive completed tasks"
        >
          <FiArchive size={16} />
          Archive Done
        </button>
      </div>
    </div>
  );
};
