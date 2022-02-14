import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik } from "formik";
import Tenor from "react-tenor";
import "react-tenor/dist/styles.css";

const GifUploadDialoge = (props) => {
  const { open, handleClose } = props;
  const initialValues = { gif: null };
  const validation = (values) => {
    const errors = {};
    if (!values.gif) errors.gif = "Required";
    return errors;
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={validation}
      onSubmit={props.handleSubmit}
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
            PaperProps={{ style: { backgroundColor: "#1f1e2e" } }}
          >
            <DialogTitle id="scroll-dialog-title" className="text-white">
              Upload Image
            </DialogTitle>
            <DialogContent dividers={true}>
              <Tenor
                token="RTIS1FJNO1VL"
                onSelect={(result) => setFieldValue("gif", result)}
                // limit={9}
                searchPlaceholder="Search Gif"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                Send
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Formik>
  );
};

export default GifUploadDialoge;
