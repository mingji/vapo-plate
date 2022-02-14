import React from "react";
import Button from "@material-ui/core/Button";
import "./style.scss";
const Promotion = props => {
  return (
    <div className="promotion-container">
      <p className="heading">Tell us What you love</p>
      <p className="description">
        We'll find event recomendations just for you
      </p>
      <Button variant="contained" color="secondary" disableElevation>
        Get Started
      </Button>
    </div>
  );
};

export default Promotion;
