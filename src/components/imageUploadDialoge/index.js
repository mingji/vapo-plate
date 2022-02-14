import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik } from "formik";
import { DropzoneArea } from "material-ui-dropzone";

const changeIconFromDOM = () => {
  const query = document.getElementsByClassName("change-icon-dropzone")[0];
  if (query) {
    query.querySelector(
      "svg"
    ).innerHTML = `<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>`;
  }
};

const ImageUploadDialoge = (props) => {
  const { open, handleClose } = props;

  useEffect(() => {
    setTimeout(() => {
      changeIconFromDOM();
    }, 100);
  }, [open]);

  const initialValues = { image: null };
  const validation = (values) => {
    const errors = {};
    if (!values.image) errors.image = "Required";
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
              <DialogContentText
                id="scroll-dialog-description"
                className="dropzone-container"
                tabIndex={-1}
              >
                <DropzoneArea
                  acceptedFiles={["image/*"]}
                  filesLimit={1}
                  dropzoneClass="change-icon-dropzone"
                  //   maxFileSize={50000}
                  dropzoneText="Drag and drop an image(max 5mb) file here or click"
                  //   showPreviewsInDropzone={false}
                  onChange={(e) => setFieldValue("image", e[0])}
                />
              </DialogContentText>
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

export default ImageUploadDialoge;
