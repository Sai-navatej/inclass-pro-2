import React from 'react';
import { MdSearch } from 'react-icons/md';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <MdSearch className="search-icon" size={20} />
      <input
        type="text"
        className="form-control"
        placeholder="Search transactions..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
