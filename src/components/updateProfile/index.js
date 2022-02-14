import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik } from "formik";
import { TextField, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import "./style.scss";
const UpdateProfile = (props) => {
  const { open, handleClose } = props;
  const user = useSelector((state) => state.User.data);
  const initialValues = JSON.parse(JSON.stringify({ ...user }));
  const validation = (values) => {
    console.log("validation -> values", values);
    const errors = {};
    if (!values.fullname) errors.fullname = "Required";
    else if (String(values.fullname).length < 4)
      errors.fullname = "Minimum 5 Charters Required";
    if (!values.username) errors.username = "Required";
    else if (String(values.username).length < 4)
      errors.username = "Minimum 5 Charters Required";
    if (!values.info) errors.info = "Required";
    else if (String(values.info).length < 4)
      errors.info = "Minimum 5 Charters Required";
    return errors;
  };
  const handleImages = async (files, setFieldValue, fieldName) => {
    console.log("handleImages -> files", files);
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
  return (
    <Formik
      initialValues={initialValues}
      validate={validation}
      onSubmit={(values, { setSubmitting }) => {
        const payload = JSON.parse(JSON.stringify(values));
        console.log("UpdateProfile -> values", values);
        delete payload.profilePreview;
        delete payload.bannerPreview;
        payload.profile = values.profile;
        payload.banner = values.banner;
        if (user.profile === payload.profile) delete payload.profile;
        if (user.banner === payload.banner) delete payload.banner;
        console.log("UpdateProfile -> payload", payload);
        props.handleSubmit(payload, setSubmitting);
      }}
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
              Update Profile
            </DialogTitle>
            <DialogContent dividers={true}>
              <div className="row upload-image-container">
                <div className="col-12">
                  <div
                    className="col-12 top-profile-container add-plus"
                    style={{
                      backgroundImage:
                        values.bannerPreview || values.banner
                          ? `url('${values.bannerPreview || values.banner}')`
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
                          "banner"
                        )
                      }
                    />
                  </div>
                </div>

                <div className="col-12 profile-img-container">
                  <div
                    className="col-12 profile-img  add-plus"
                    style={{
                      backgroundImage:
                        values.profilePreview || values.profile
                          ? `url('${values.profilePreview || values.profile}')`
                          : `url("https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png")`,
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
                          "profile"
                        )
                      }
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <TextField
                    id="outlined-basic"
                    label="Full Name"
                    variant="filled"
                    className="mb-4  bg-light-theme"
                    // disabled={values.isPasswordShown}
                    required
                    error={
                      errors.fullname && touched.fullname && errors.fullname
                    }
                    fullWidth
                    helperText={
                      errors.fullname && touched.fullname && errors.fullname
                    }
                    onChange={(e) =>
                      setFieldValue("fullname", e.currentTarget.value)
                    }
                    onBlur={handleBlur}
                    value={values.fullname}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="filled"
                    className="mb-4  bg-light-theme"
                    // disabled={values.isPasswordShown}
                    required
                    error={
                      errors.username && touched.username && errors.username
                    }
                    fullWidth
                    helperText={
                      errors.username && touched.username && errors.username
                    }
                    onChange={(e) =>
                      setFieldValue("username", e.currentTarget.value)
                    }
                    onBlur={handleBlur}
                    value={values.username}
                  />
                </div>
                <div className="col-12 col-md-12">
                  <TextField
                    id="outlined-basic"
                    label="Info"
                    variant="filled"
                    className="mb-4  bg-light-theme"
                    // disabled={values.isPasswordShown}
                    required
                    error={errors.info && touched.info && errors.info}
                    fullWidth
                    helperText={errors.info && touched.info && errors.info}
                    onChange={(e) =>
                      setFieldValue("info", e.currentTarget.value)
                    }
                    onBlur={handleBlur}
                    value={values.info}
                  />
                </div>
                {/* <div className="col-12 col-md-12  dropzone-container">
                    <DropzoneArea
                      acceptedFiles={["image/*"]}
                      filesLimit={1}
                      //   maxFileSize={50000}
                      dropzoneText="Drag and drop an profile(max 5mb) file here or click"
                      //   showPreviewsInDropzone={false}
                      onChange={(e) => setFieldValue("profile", e[0])}
                    />
                  </div>
                  <div className="col-12 col-md-12  dropzone-container mt-4">
                    <DropzoneArea
                      acceptedFiles={["image/*"]}
                      filesLimit={1}
                      //   maxFileSize={50000}
                      dropzoneText="Drag and drop an banner(max 5mb) file here or click"
                      //   showPreviewsInDropzone={false}
                      onChange={(e) => setFieldValue("banner", e[0])}
                    />
                  </div> */}
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleSubmit} color="primary">
                {props.isLoading ? <CircularProgress /> : "Update"}
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Formik>
  );
};

export default UpdateProfile;
