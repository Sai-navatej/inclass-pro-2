import React from 'react';

const CATEGORIES = ['All', 'Food', 'Travel', 'Rent', 'Shopping', 'Entertainment', 'Health', 'Utilities', 'Subscriptions'];
const TYPES = ['All', 'income', 'expense'];
const SORT_OPTIONS = [
  { value: 'date', label: 'Date (Newest)' },
  { value: 'amount', label: 'Amount (Highest)' },
  { value: 'category', label: 'Category (A-Z)' },
];

const Filters = ({ filters, onFilterChange, sortOption, onSortChange }) => {
  return (
    <div className="filters">
      <select 
        className="form-control filter-select"
        value={filters.type || 'All'}
        onChange={(e) => onFilterChange({ ...filters, type: e.target.value })}
      >
        {TYPES.map(type => (
          <option key={type} value={type}>
            {type === 'All' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>

      <select 
        className="form-control filter-select"
        value={filters.category || 'All'}
        onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
      >
        {CATEGORIES.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      <select 
        className="form-control filter-select"
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {SORT_OPTIONS.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
