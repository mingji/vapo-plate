import React, { Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import {
  withStyles,
} from "@material-ui/core";
import "./style.scss";
import TypeForm from "./typeForm";
import EventNameForm from "./eventNameForm";
import EventPlaceForm from "./eventPlaceForm";
import EventDateForm from "./eventDateForm";

class CreateEvent extends Component {
  state = {
    step: 0,
  };
  handleChangeStep = (step) => this.setState({ step });
  render() {
    const { step } = this.state;
    const { classes } = this.props;
    return (
      <div className="create-new-container">
        <div className="container">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-12 col-sm-12 col-md-6 animated zoomIn">
              {step === 0 && (
                <h4 className="mb-4">
                  We'll ask you a few questions to start building your event.
                </h4>
              )}
              <div className="mb-4 progress-bar-container">
                <p>Step {step + 1} out of 4</p>
                <LinearProgress
                  variant="determinate"
                  value={
                    step === 0 ? 25 : step === 1 ? 50 : step === 2 ? 75 : 100
                  }
                  // color="secondary"
                  classes={{
                    colorPrimary: classes.colorPrimary,
                    barColorPrimary: classes.barColorPrimary,
                  }}
                />
              </div>
              {step === 0 ? (
                <TypeForm
                  next={() => this.handleChangeStep(1)}
                  skip={() => this.handleChangeStep(1)}
                />
              ) : step === 1 ? (
                <EventNameForm
                  next={() => this.handleChangeStep(2)}
                  back={() => this.handleChangeStep(0)}
                />
              ) : step === 2 ? (
                <EventPlaceForm
                  next={() => this.handleChangeStep(3)}
                  back={() => this.handleChangeStep(2)}
                />
              ) : step === 3 ? (
                <EventDateForm
                  next={() => this.handleChangeStep(3)}
                  back={() => this.handleChangeStep(4)}
                />
              ) : (
                <h4>Thanks Your Event has been created</h4>
              )}
            </div>

            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    );
  }
}
const styles = (props) => ({
  colorPrimary: {
    backgroundColor: "#eeedf2",
  },
  barColorPrimary: {
    backgroundColor: "#DC1C59",
  },
});
export default withStyles(styles)(CreateEvent);
