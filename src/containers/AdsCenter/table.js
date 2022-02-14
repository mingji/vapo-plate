import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AccordionActions, Button, CircularProgress } from "@material-ui/core";
import { Database } from "../../services/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function Table(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isLoading, setLoading] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleDelete = async (param) => {
    try {
      setLoading(true);
      await Database.collection("announcement").doc(param.id).delete();
      const data = JSON.parse(JSON.stringify(props.data));
      const newData = data.filter((d) => d.id !== param.id);
      props.updateDada(newData);
      setLoading(false);
    } catch (error) {
      console.log("handleDelete -> error", error);
    }
  };
  const handleDeleteSingle = async (param, index) => {
    try {
      const values = param.values.filter((d, i) => i !== index);
      const payload = JSON.parse(JSON.stringify(param));
      delete payload.id;
      payload.values = values;
      setLoading(true);
      await Database.collection("announcement")
        .doc(param.id)
        .set(payload, { merge: true });
      const data = JSON.parse(JSON.stringify(props.data));
      const newData = data.map((d) =>
        d.id === param.id ? { ...d, values } : d
      );
      props.updateDada(newData);
      setLoading(false);
    } catch (error) {
      console.log("handleDelete -> error", error);
    }
  };
  return (
    <div className={classes.root}>
      {props.data.map((d) => (
        <Accordion
          expanded={expanded === d.title}
          onChange={handleChange(d.title)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}>{d.title}</Typography>
            <Typography className={classes.secondaryHeading}>
              Advertisement
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="d-block">
            {d.values.map((o, i) => (
              <div className=" row">
                <Typography className="mb-2 col-12 col-md-3">
                  <b>Title</b>
                  <br />
                  {o.title}
                </Typography>
                <Typography className="mb-2 col-12 col-md-3">
                  <b>Description</b>
                  <br />
                  {o.description}
                </Typography>
                <Typography className="mb-2 col-12 col-md-2">
                  <a href={o.link} className="text-primary">
                    Link (Click Here)
                  </a>
                </Typography>
                <Typography className="mb-2 col-12 col-md-2">
                  <b>Image</b>
                  <br />
                  <img
                    src={o.image}
                    className="img-fluid"
                    style={{ maxHeight: 100 }}
                    alt=""
                  />
                </Typography>
                <Typography className="mb-2 col-12 col-md-2">
                  <Button
                    size="small"
                    onClick={(e) => handleDeleteSingle(d, i)}
                  >
                    Delete
                  </Button>
                </Typography>
              </div>
            ))}{" "}
          </AccordionDetails>
          <AccordionActions>
            <Button size="small" onClick={(e) => handleDelete(d)}>
              {isLoading ? <CircularProgress /> : "Delete"}
            </Button>
          </AccordionActions>
        </Accordion>
      ))}
    </div>
  );
}
