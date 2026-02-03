import React from 'react';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import { FilterState } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    <Card variant="glass" className="mb-4 sm:mb-6">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center gap-2 sm:gap-3 mb-3">
          <FiFilter className="text-muted-foreground flex-shrink-0" size={18} />
          <h3 className="text-white font-medium text-sm sm:text-base">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="ml-auto text-xs text-muted-foreground hover:text-white p-1 sm:p-2 h-auto"
            >
              <FiX size={14} className="sm:mr-1" />
              <span className="hidden sm:inline">Clear all</span>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {/* Search - Full width on mobile */}
          <div className="relative col-span-2 lg:col-span-2">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10" size={16} />
            <Input
              value={filter.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search tasks..."
              className="pl-10 h-9 sm:h-10 text-sm"
            />
          </div>

          {/* Priority Filter */}
          <Select value={filter.priority} onValueChange={(value) => onFilterChange('priority', value)}>
            <SelectTrigger className="h-9 sm:h-10 text-sm">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={filter.category} onValueChange={(value) => onFilterChange('category', value)}>
            <SelectTrigger className="h-9 sm:h-10 text-sm">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="automation">Automation</SelectItem>
            </SelectContent>
          </Select>

          {/* Assignee Filter - shown on all screens now */}
          <Select value={filter.assignee} onValueChange={(value) => onFilterChange('assignee', value)}>
            <SelectTrigger className="h-9 sm:h-10 text-sm col-span-2 sm:col-span-1">
              <SelectValue placeholder="Assignee" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Assignees</SelectItem>
              <SelectItem value="Arun">Arun</SelectItem>
              <SelectItem value="Arc">Arc</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
