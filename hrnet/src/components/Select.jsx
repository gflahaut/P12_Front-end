import React from "react";

const CustomSelect = ({ value, onChange, options, className }) => {
  return (
    <select value={value} onChange={onChange} className={className}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
