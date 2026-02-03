import React, { useRef } from 'react';
import { FiPlus, FiDownload, FiUpload, FiArchive, FiFilm } from 'react-icons/fi';
import { exportToJSON, exportToMarkdown, importFromJSON } from '../utils/storage';
import { Task } from '../types';

interface HeaderProps {
  onAddTask: () => void;
  onArchiveCompleted: () => void;
  onImport: (tasks: Task[]) => void;
  tasks: Task[];
}

export const Header: React.FC<HeaderProps> = ({ onAddTask, onArchiveCompleted, onImport, tasks }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const importedTasks = await importFromJSON(file);
      onImport(importedTasks);
      alert(`Successfully imported ${importedTasks.length} tasks!`);
    } catch (error) {
      alert('Failed to import tasks. Please check the file format.');
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExportJSON = () => {
    exportToJSON(tasks);
  };

  const handleExportMarkdown = () => {
    exportToMarkdown(tasks);
  };

  return (
    <header className="bg-reel-gray-light border-b border-reel-gray">
      <div className="max-w-[1800px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="bg-reel-blue-light p-2 rounded-lg">
              <FiFilm className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">ReelSmith Kanban</h1>
              <p className="text-sm text-gray-400">Task Management Board</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Add Task */}
            <button
              onClick={onAddTask}
              className="flex items-center gap-2 bg-reel-blue-light hover:bg-reel-blue-bright text-white font-medium px-4 py-2 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              title="Add new task (N)"
            >
              <FiPlus size={18} />
              <span className="hidden sm:inline">New Task</span>
            </button>

            {/* Archive */}
            <button
              onClick={onArchiveCompleted}
              className="flex items-center gap-2 bg-reel-gray hover:bg-reel-gray-light text-gray-300 px-4 py-2 rounded-lg transition-colors"
              title="Archive completed tasks (A)"
            >
              <FiArchive size={18} />
              <span className="hidden md:inline">Archive</span>
            </button>

            {/* Export Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center gap-2 bg-reel-gray hover:bg-reel-gray-light text-gray-300 px-4 py-2 rounded-lg transition-colors"
                title="Export tasks"
              >
                <FiDownload size={18} />
                <span className="hidden md:inline">Export</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-reel-gray-light rounded-lg shadow-xl border border-reel-gray opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <button
                  onClick={handleExportJSON}
                  className="w-full text-left px-4 py-2 text-white hover:bg-reel-gray rounded-t-lg transition-colors"
                >
                  Export as JSON
                </button>
                <button
                  onClick={handleExportMarkdown}
                  className="w-full text-left px-4 py-2 text-white hover:bg-reel-gray rounded-b-lg transition-colors"
                >
                  Export as Markdown
                </button>
              </div>
            </div>

            {/* Import */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-reel-gray hover:bg-reel-gray-light text-gray-300 px-4 py-2 rounded-lg transition-colors"
              title="Import tasks from JSON"
            >
              <FiUpload size={18} />
              <span className="hidden md:inline">Import</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
