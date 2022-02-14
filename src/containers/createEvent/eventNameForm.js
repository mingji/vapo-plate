import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  FormControl
} from "@material-ui/core";

const EventNameForm = (props) => {
  return (
    <>
      {" "}
      <h3 className="mb-4">What is the name of your event?</h3>
      <FormControl variant="filled" className="mb-4">
        <TextField
          id="outlined-basic"
          label="Event Name"
          variant="filled"
          className="mb-4"
          placeholder="Name your event"
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

export default EventNameForm;
