import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const EventPlaceForm = (props) => {
  return (
    <>
      {" "}
      <h3 className="mb-4">Where will your event take place?</h3>
      <FormControl variant="filled" className="mb-4">
        <InputLabel id="demo-simple-select-filled-label">Venue</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          // value={age}
          // onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="filled" className="mb-4">
        <TextField
          id="outlined-basic"
          label="Search"
          variant="filled"
          className="mb-4"
          placeholder="Search for venue address"
          // disabled={isPasswordShown}
        />
      </FormControl>
      <div className="action-container text-center">
        <button className="btn btn-outline mr-1 pl-4 pr-4" onClick={props.back}>
          Back
        </button>
        <button className="btn btn-custom ml-1 pl-4 pr-4" onClick={props.next}>
          Next
        </button>
      </div>
    </>
  );
};

export default EventPlaceForm;
