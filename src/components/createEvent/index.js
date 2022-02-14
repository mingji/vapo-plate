import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik } from "formik";
import {
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  CircularProgress,
  makeStyles
} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import { useSelector } from "react-redux";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import uploadImage from "../../services/uploadInage";
import { Database } from "../../services/firebase";
import moment from "moment";
import { toast } from "react-toastify";
import { AllHoursInDays } from "../../common/getAllHoursInday";
import { generateKeywords } from "../../common/generateKeywords";
import UploadAndCrop from "../uploadAndCrop";

const useStyles = makeStyles({
	titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& .closeWrapper': {
      display: 'flex',
      alignItems: 'center',
      '& .title': {
        marginLeft: 10,
        fontSize: '1.25rem'
      }
    }
  },
  submitBtn: {
    padding: '10px 35px',
    fontSize: '0.95rem',
    outline: 0,
    '&:hover': {
      outline: 0
    }
  },
  btnYes: {
    background: '#484c92',
    padding: '4px 16px',
    minWidth: 'unset',
    borderRadius: '8px',
    outline: 0,
    color: 'white',
    marginRight: '1.5rem',
    '&:hover': {
      background: '#484c92',
      outline: 0
    }
  },
  btnNo: {
    background: 'transparent',
    color: '#484c92',
    padding: '4px 16px',
    minWidth: 'unset',
    border: '1px solid #484c92',
    borderRadius: '8px',
    outline: 0,
    '&:hover': {
      outline: 0
    }
  },
  actionWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 0'
  }
});

const changeIconFromDOM = () => {
  const query = document.getElementsByClassName("change-icon-dropzone")[0];
  if (query) {
    query.querySelector(
      "svg"
    ).innerHTML = `<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>`;
  }
};

const CreateEvent = (props) => {
  const classes = useStyles();
  const { open, handleClose } = props;
  const user = useSelector((state) => state.User.data);
  const [loading, setSetLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      changeIconFromDOM();
    }, 100);
  }, [open]);

  const initialValues = {
    image: "",
    name: "",
    noOfParticipants: "not specific",
    details: "",
    location: "",
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    category: "",
    isPublic: true,
  };
  const validation = (values) => {
    console.log("validation -> values", values);
    const errors = {};
    if (!values.image) errors.image = "Required";
    if (!values.name) errors.name = "Required";
    if (!values.noOfParticipants) errors.noOfParticipants = "Required";
    if (!values.details) errors.details = "Required";
    if (!values.location) errors.location = "Required";
    // if (!values.location.lan) errors.location.lan = "Required";
    // if (!values.location.lat) errors.location.lat = "Required";
    if (!values.startDate) errors.startDate = "Required";
    if (!values.startTime) errors.startTime = "Required";
    // if (!values.endDate) errors.endDate = "Required";
    // if (!values.endTime) errors.endTime = "Required";
    if (!values.category) errors.category = "Required";
    return errors;
  };
  const handleSubmit = async (values) => {
    try {
      setSetLoading(true);

      const imageURL = await uploadImage(values.image);
      const payload = {
        ...values,
        imageURL,
        createdBy: user.uid,
        startDate: moment(values.startDate).format("MM/DD/YYYYY"),
        startTime: values.startTime,
        // endDate: moment(values.endDate).format("MM/DD/YYYYY"),
        // endTime: moment(values.endTime).format("HH:mm"),
      };
      delete payload.image;
      console.log("payload", payload);
      const valuesForGroup = {
        banner: "",
        profile: imageURL,
        description: "",
        name: values.name,
        isPublic: values.isPublic,
        members: [user.uid],
      };
      const chatroom = await Database.collection("chatrooms").add(
        valuesForGroup
      );
      const event = await Database.collection("events").add({
        ...payload,
        chatroom: chatroom.id,
        keywords: generateKeywords(String(values.name).toLowerCase()),
      });
      await Database.collection("chatrooms")
        .doc(chatroom.id)
        .set({ eventId: event.id }, { merge: true });
      setSetLoading(true);

      toast.success("Successfully Created", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={validation}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValidating,
        setFieldValue,
        /* and other goodies */
      }) => (
        <>
          <Dialog
            open={open}
            onClose={handleClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
            PaperProps={{ style: { backgroundColor: "#1f1e2e", margin: 16 } }}
          >
            <DialogTitle id="scroll-dialog-title" className="text-white">
              <div className={classes.titleWrapper}>
                <div className="closeWrapper">
                  <CloseIcon style={{ fontSize: 50, color: 'dc1c59', cursor: 'pointer' }} onClick={handleClose} />
                  <span className="title">Create a event</span>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submitBtn}
                >
                  Submit
                </Button>
              </div>
            </DialogTitle>
            <DialogContent dividers={true}>
              <div className="row">
                <div className="col-12 mb-2">
                  <UploadAndCrop
                    value={values.image}
                    onChange={(e) => setFieldValue("image", e)}
                    onReset={(e) => setFieldValue("image", "")}
                  />
                </div>
                <div className="col-12 mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Event Name"
                    variant="filled"
                    className="bg-light-theme"
                    required
                    error={errors.name && touched.name && errors.name}
                    fullWidth
                    helperText={errors.name && touched.name && errors.name}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                </div>
                <div className="col-12 mb-3 col-md-6">
                  <FormControl
                    variant="filled"
                    className="w-100  bg-light-theme"
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      #no of Participants
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      error={
                        errors.noOfParticipants &&
                        touched.noOfParticipants &&
                        errors.noOfParticipants
                      }
                      fullWidth
                      helperText={
                        errors.noOfParticipants &&
                        touched.noOfParticipants &&
                        errors.noOfParticipants
                      }
                      onChange={(e) =>
                        setFieldValue("noOfParticipants", e.target.value)
                      }
                      onBlur={handleBlur}
                      value={values.noOfParticipants}
                    >
                      <MenuItem value="not specific">
                        <em>Not Specific</em>
                      </MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-12 mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Event Details"
                    variant="filled"
                    className="bg-light-theme"
                    multiline
                    required
                    error={errors.details && touched.details && errors.details}
                    fullWidth
                    helperText={
                      errors.details && touched.details && errors.details
                    }
                    onChange={(e) => setFieldValue("details", e.target.value)}
                    onBlur={handleBlur}
                    value={values.details}
                  />
                </div>
                <div className="col-12 mb-3">
                  <TextField
                    id="outlined-basic"
                    label="Location"
                    variant="filled"
                    className="bg-light-theme"
                    required
                    error={
                      errors.location && touched.location && errors.location
                    }
                    fullWidth
                    helperText={
                      errors.location && touched.location && errors.location
                    }
                    onChange={(e) => setFieldValue("location", e.target.value)}
                    onBlur={handleBlur}
                    value={values.location}
                  />
                </div>
                <div className="col-12 mb-3">
                  <KeyboardDatePicker
                    style={{ width: '100%' }}
                    id="date-picker-dialog"
                    label="Start Date"
                    format="MM/DD/YYYY"
                    value={values.startDate}
                    onChange={(e) => setFieldValue("startDate", e)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    inputProps={{ className: "bg-light-theme" }}
                    error={
                      errors.startDate && touched.startDate && errors.startDate
                    }
                  />
                </div>
                <div className="col-12 mb-3">
                  {/* <KeyboardTimePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Start Time"
                    value={values.startTime}
                    onChange={(e) => setFieldValue("startTime", e)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    inputProps={{ className: "bg-light-theme" }}
                    error={
                      errors.startTime && touched.startTime && errors.startTime
                    }
                  /> */}
                  <FormControl
                    variant="filled"
                    className="w-100  bg-light-theme"
                    style={{ borderRadius: 5 }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Start Time
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      error={
                        errors.startTime &&
                        touched.startTime &&
                        errors.startTime
                      }
                      fullWidth
                      helperText={
                        errors.startTime &&
                        touched.startTime &&
                        errors.startTime
                      }
                      onChange={(e) =>
                        setFieldValue("startTime", e.target.value)
                      }
                      onBlur={handleBlur}
                      value={values.startTime}
                    >
                      {AllHoursInDays.map((d) => (
                        <MenuItem value={d}>{d}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col-12 mb-3">
                  <FormControl
                    variant="filled"
                    className="w-100 p-0 bg-light-theme"
                    style={{ borderRadius: 5 }}
                  >
                    <InputLabel id="demo-simple-select-filled-label">
                      Which Group
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-filled-label"
                      id="demo-simple-select-filled"
                      error={
                        errors.category && touched.category && errors.category
                      }
                      fullWidth
                      helperText={
                        errors.category && touched.category && errors.category
                      }
                      onChange={(e) =>
                        setFieldValue("category", e.target.value)
                      }
                      onBlur={handleBlur}
                      value={values.category}
                    >
                      <MenuItem value="not specific">
                        <em>Not Specific</em>
                      </MenuItem>
                      <MenuItem value={"sports"}>Sports</MenuItem>
                      <MenuItem value={"lifestyle"}>LifeStyle</MenuItem>
                      <MenuItem value={"others"}>Others</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-12 mt-2 mb-2 col-md-6">
                  <p className="m-0 text-white" style={{ fontWeight: 500 }}>Is this the public event ?</p>
                </div>
                <div className="col-12 mb-2 col-md-6">
                  <Button
                    onClick={(e) => setFieldValue("isPublic", true)}
                    variant={values.isPublic ? "contained" : "text"}
                    className={classes.btnYes}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={!values.isPublic ? "contained" : "text"}
                    onClick={(e) => setFieldValue("isPublic", false)}
                    className={classes.btnNo}
                  >
                    No
                  </Button>
                </div>
              </div>
              <div className={classes.actionWrapper}>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  color="primary"
                  className={classes.submitBtn}
                  style={{ width: 250 }}
                  variant="contained"
                >
                  {loading ? <CircularProgress /> : "Submit"}{" "}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </Formik>
  );
};

export default CreateEvent;
