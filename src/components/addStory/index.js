import React from "react";
import { Formik } from "formik";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@material-ui/core";

const handleImages = async (files, setFieldValue, fieldName) => {
  Promise.all(
    [files[0]].map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("load", (ev) => {
          resolve(ev.target.result);
        });
        reader.addEventListener("error", reject);
        reader.readAsDataURL(file);
      });
    })
  ).then(
    (images) => {
      setFieldValue(fieldName, files[0]);
      setFieldValue(fieldName + "Preview", images);
    },
    (error) => {
      console.error(error);
    }
  );
};
const AddStoryModal = (props) => {
  return (
    <Formik
      initialValues={{ image: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.image) return "Required";
        return errors;
      }}
      onSubmit={props.onSubmit}
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
            open={props.open}
            onClose={props.onClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
            PaperProps={{ style: { backgroundColor: "#1f1e2e" } }}
            fullWidth
          >
            <DialogTitle id="scroll-dialog-title" className="text-white">
              Add Story
            </DialogTitle>
            <DialogContent dividers={true}>
              <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                <div className="row">
                  <div
                    className="col-12 top-profile-container add-plus"
                    style={{
                      backgroundImage:
                        values.imagePreview || values.banner
                          ? `url('${values.imagePreview || values.image}')`
                          : `url("https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg")`,
                    }}
                  >
                    <input
                      type="file"
                      accept="image/x-png,image/jpeg"
                      className="upload-image"
                      onChange={(e) =>
                        handleImages(
                          e.currentTarget.files,
                          setFieldValue,
                          "image"
                        )
                      }
                    />
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={props.onClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                {isSubmitting ? <CircularProgress /> : "Submit"}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Formik>
  );
};

export default AddStoryModal;
