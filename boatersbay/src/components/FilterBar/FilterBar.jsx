import React, { useState, useEffect } from "react";
import "./FilterBar.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function FilterBar(props) {
  const { label, options, callback } = props;
  const [value, updateValue] = useState("");

  return (
    <div className="filterbar-container">
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 120 }}
        id="filterbar"
      >
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={(e) => {
              updateValue(e.target.value);
              callback(e.target.value);
          }}
          id="filterbar-option"
        >
          {options.map((option, idx) => (
            <MenuItem value={option} key={idx}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default FilterBar;
