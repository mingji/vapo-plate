import React, { useState } from "react";
import { Formik } from "formik";
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import uploadImage from "../../services/uploadInage";
import { Database } from "../../services/firebase";
import { toast } from "react-toastify";
import UploadAndCrop from "../../components/uploadAndCrop";

const Form = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const fakeData = {
    image: "",
    description: "",
    link: "",
    title: "",
  };
  const initialValues = {
    title: "",
    values: [fakeData],
  };
  const validation = (values) => {
    console.log("validation -> values", values);
    const errors = { values: [] };
    if (!values.title) errors.title = "Required";

    values.values.forEach((element, i) => {
      if (!element.image) {
        if (!errors.values[i]) errors.values[i] = {};
        errors.values[i].image = "Required";
      }
      if (!element.description) {
        if (!errors.values[i]) errors.values[i] = {};
        errors.values[i].description = "Required";
      }
      if (!element.link) {
        if (!errors.values[i]) errors.values[i] = {};
        errors.values[i].link = "Required";
      }
      if (!element.title) {
        if (!errors.values[i]) errors.values[i] = {};
        errors.values[i].title = "Required";
      }
    });
    if (!errors.values.length) delete errors.values;
    return errors;
  };
  const handleSubmit = async (values, { setValues }) => {
    try {
      const payload = { ...values, createdAt: new Date() };
      setLoading(true);
      const tempValues = [];
      for (const iterator of payload.values) {
        const imageURL = await uploadImage(iterator.image, "announcement");

        tempValues.push({ ...iterator, image: imageURL });
      }
      payload.values = tempValues;
      await Database.collection("announcement").add(payload);
      setLoading(false);
      setValues(initialValues);
      toast.success("Successfully Created", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.log("handleSubmit -> error", error);
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
        <div>
          <div className="row p-3">
            <div className="col-12 col-md-6">
              <TextField
                label="Title"
                variant="filled"
                className="mb-4 bg-light-theme"
                required
                error={errors.title && touched.title && errors.title}
                fullWidth
                helperText={errors.title && touched.title && errors.title}
                onChange={(e) => setFieldValue("title", e.target.value)}
                onBlur={handleBlur}
                value={values.title}
              />
            </div>

            <div className="col-6" />
            <div className="align-items-center col-6 d-flex ">
              <Typography variant="p" component="p" className="text-secondary">
                Ads List (please add individual ads)
              </Typography>
            </div>
            <div className="col-6  text-right">
              <IconButton
                aria-label="delete"
                color="primary"
                onClick={(e) =>
                  setFieldValue("values", [...values.values, fakeData])
                }
              >
                <AddIcon />
              </IconButton>
            </div>
          </div>
          {values.values.map((item, index) => (
            <>
              <div className="row p-3">
                <div className="col-12 col-md-6 col-lg-3">
                  <TextField
                    label="Title"
                    variant="filled"
                    className="mb-4 bg-light-theme"
                    required
                    error={
                      errors?.values?.[index]?.title &&
                      touched?.values?.[index]?.title &&
                      errors?.values?.[index]?.title
                    }
                    fullWidth
                    helperText={
                      errors?.values?.[index]?.title &&
                      touched?.values?.[index]?.title &&
                      errors?.values?.[index]?.title
                    }
                    onChange={(e) =>
                      setFieldValue(`values.[${index}].title`, e.target.value)
                    }
                    onBlur={handleBlur}
                    value={values?.values?.[index]?.title}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <TextField
                    label="Description"
                    variant="filled"
                    className="mb-4 bg-light-theme"
                    required
                    multiline
                    error={
                      errors?.values?.[index]?.description &&
                      touched?.values?.[index]?.description &&
                      errors?.values?.[index]?.description
                    }
                    fullWidth
                    helperText={
                      errors?.values?.[index]?.description &&
                      touched?.values?.[index]?.description &&
                      errors?.values?.[index]?.description
                    }
                    onChange={(e) =>
                      setFieldValue(
                        `values.[${index}].description`,
                        e.target.value
                      )
                    }
                    onBlur={handleBlur}
                    value={values?.values?.[index]?.description}
                  />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                  <TextField
                    label="Link"
                    variant="filled"
                    className="mb-4 bg-light-theme"
                    error={
                      errors?.values?.[index]?.link &&
                      touched?.values?.[index]?.link &&
                      errors?.values?.[index]?.link
                    }
                    fullWidth
                    helperText={
                      errors?.values?.[index]?.link &&
                      touched?.values?.[index]?.link &&
                      errors?.values?.[index]?.link
                    }
                    onChange={(e) =>
                      setFieldValue(`values.[${index}].link`, e.target.value)
                    }
                    onBlur={handleBlur}
                    value={values?.values?.[index]?.link}
                  />
                </div>

                <div className="col-12 col-md-6 col-lg-2">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    onClick={(e) => setShowModal(true)}
                  >
                    {values?.values?.[index]?.image ? "Selected" : "Upload"}{" "}
                    {errors?.values?.[index]?.image &&
                      touched?.values?.[index]?.image && (
                        <>({errors?.values?.[index]?.image})</>
                      )}
                  </Button>
                </div>
                <div className="col-12 col-md-6 col-lg-1">
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={(e) =>
                      setFieldValue(
                        "values",
                        values.values.filter((d, i) => i !== index)
                      )
                    }
                  >
                    <CloseIcon />
                  </IconButton>
                </div>
                <Dialog
                  open={showModal}
                  onClose={(e) => setShowModal(false)}
                  scroll="paper"
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                  style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
                  PaperProps={{ style: { backgroundColor: "#1f1e2e" } }}
                  fullWidth
                >
                  <DialogTitle id="scroll-dialog-title" className="text-white">
                    Create Event
                  </DialogTitle>
                  <DialogContent dividers={true}>
                    <div className="row">
                      <div className="col-12 mb-2 ">
                        <UploadAndCrop
                          value={`values.[${index}].image`}
                          onChange={(e) =>
                            setFieldValue(`values.[${index}].image`, e)
                          }
                          onReset={(e) =>
                            setFieldValue(`values.[${index}].image`, "")
                          }
                        />
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={(e) => setShowModal(false)}
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={(e) => setShowModal(false)}
                      disabled={loading}
                      color="primary"
                    >
                      {loading ? <CircularProgress /> : "Create"}{" "}
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </>
          ))}
          <div className="row pr-3">
            <div className="col-12 text-right">
              <Button
                onClick={handleSubmit}
                disabled={loading}
                variant="outlined"
                color="primary"
              >
                {loading ? <CircularProgress /> : "Create"}{" "}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default Form;
