import React from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { FilterState } from '../types';

interface FilterBarProps {
  filter: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onClearFilters: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filter, onFilterChange, onClearFilters }) => {
  const hasActiveFilters =
    filter.priority !== 'all' ||
    filter.category !== 'all' ||
    filter.assignee !== 'all' ||
    filter.search !== '';

  return (
    <div className="bg-reel-gray rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <FiFilter className="text-gray-400" size={20} />
        <h3 className="text-white font-medium">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="ml-auto text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
          >
            <FiX size={14} />
            Clear all
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={filter.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Search tasks..."
            className="w-full bg-reel-gray-light border border-reel-gray-light rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-reel-blue-light transition-colors"
          />
        </div>

        {/* Priority Filter */}
        <div>
          <select
            value={filter.priority}
            onChange={(e) => onFilterChange('priority', e.target.value)}
            className="w-full bg-reel-gray-light border border-reel-gray-light rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-reel-blue-light transition-colors"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        {/* Category Filter */}
        <div>
          <select
            value={filter.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
            className="w-full bg-reel-gray-light border border-reel-gray-light rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-reel-blue-light transition-colors"
          >
            <option value="all">All Categories</option>
            <option value="marketing">Marketing</option>
            <option value="product">Product</option>
            <option value="research">Research</option>
            <option value="automation">Automation</option>
          </select>
        </div>

        {/* Assignee Filter - Hidden on mobile, shown on larger screens */}
        <div className="hidden md:block md:col-span-2 lg:col-span-1">
          <select
            value={filter.assignee}
            onChange={(e) => onFilterChange('assignee', e.target.value)}
            className="w-full bg-reel-gray-light border border-reel-gray-light rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-reel-blue-light transition-colors"
          >
            <option value="all">All Assignees</option>
            <option value="Arun">Arun</option>
            <option value="Arc">Arc</option>
          </select>
        </div>
      </div>
    </div>
  );
};
