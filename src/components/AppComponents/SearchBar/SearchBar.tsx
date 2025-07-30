import React from "react";
import "./SearchBar.scss";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  backgroundColor?: string;
  borderColor?: string;
  iconColor?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search by make, model and keywords",
  value,
  onChange,
  backgroundColor = "rgba(255, 255, 255, 0.1)",
  borderColor = "#ccc",
  iconColor = "#fff",
  className = "",
}) => {
  return (
    <div
      className={`search-bar ${className}`}
      style={{ backgroundColor, borderColor }}
    >
      <SearchIcon className="search-icon" style={{ color: iconColor }} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
