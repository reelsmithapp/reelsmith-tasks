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
    <Card variant="glass" className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <FiFilter className="text-muted-foreground" size={20} />
          <h3 className="text-white font-medium">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="ml-auto text-xs text-muted-foreground hover:text-white"
            >
              <FiX size={14} className="mr-1" />
              Clear all
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground z-10" size={16} />
            <Input
              value={filter.search}
              onChange={(e) => onFilterChange('search', e.target.value)}
              placeholder="Search tasks..."
              className="pl-10"
            />
          </div>

          {/* Priority Filter */}
          <Select value={filter.priority} onValueChange={(value) => onFilterChange('priority', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={filter.category} onValueChange={(value) => onFilterChange('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="product">Product</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="automation">Automation</SelectItem>
            </SelectContent>
          </Select>

          {/* Assignee Filter - Hidden on mobile, shown on larger screens */}
          <div className="hidden md:block md:col-span-2 lg:col-span-1">
            <Select value={filter.assignee} onValueChange={(value) => onFilterChange('assignee', value)}>
              <SelectTrigger>
                <SelectValue placeholder="All Assignees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                <SelectItem value="Arun">Arun</SelectItem>
                <SelectItem value="Arc">Arc</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
