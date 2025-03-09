import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = ({ selected, onChange, className }) => {
  return (
    <DatePicker 
      selected={selected} 
      onChange={onChange} 
      className={className} 
    />
  );
};

export default CustomDatePicker;
