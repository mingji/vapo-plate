import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const TypeForm = props => {
  return (
    <>
      {" "}
      <h3 className="mb-4">What type of event do you want to create?</h3>
      <FormControl variant="filled" className="mb-4">
        <InputLabel id="demo-simple-select-filled-label">
          Select Categories
        </InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          // value={age}
          // onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Sports</MenuItem>
          <MenuItem value={20}>Medical</MenuItem>
          <MenuItem value={30}>Education</MenuItem>
        </Select>
      </FormControl>
      <div className="action-container text-center">
        <button className="btn btn-outline mr-1 pl-4 pr-4" onClick={props.skip}>
          Skips
        </button>
        <button className="btn btn-custom ml-1 pl-4 pr-4" onClick={props.next}>
          Next
        </button>
      </div>
    </>
  );
};

export default TypeForm;
