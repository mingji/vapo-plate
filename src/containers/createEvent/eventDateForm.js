import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { KeyboardTimePicker, KeyboardDatePicker } from "@material-ui/pickers";

const EventDateForm = props => {
  const [event, setEvent] = useState("single");
  return (
    <>
      {" "}
      <h3 className="mb-4">When is your event?</h3>
      <FormControl component="fieldset">
        <FormLabel component="legend">Event Type</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={false}
          onChange={e => setEvent(e.target.value)}
        >
          <FormControlLabel
            value="single"
            control={<Radio checked={event === "single"} />}
            label="Single event - Happens once and can last multiple days"
          />
          <FormControlLabel
            value="recurring"
            control={<Radio checked={event === "recurring"} />}
            label="Recurring event - Repeats or occurs more than once"
          />
        </RadioGroup>
      </FormControl>
      {event === "single" ? (
        <div className="row">
          <div className="col-6">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </div>
          <div className="col-6">
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </div>

          <div className="col-6">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </div>
          <div className="col-6">
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </div>
        </div>
      ) : (
        <div className="bg-light p-4">
          <p>
            If your event repeats or occurs more than once, you can schedule
            additional times and dates after previewing. All event details will
            be copied.
          </p>
        </div>
      )}
      <div className="action-container text-center mt-4">
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

export default EventDateForm;
