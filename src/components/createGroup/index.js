import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Formik } from "formik";
import {
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { connect } from "react-redux";
import uploadImage from "../../services/uploadInage";
import { Database } from "../../services/firebase";
import { toast } from "react-toastify";
import Autocomplete from "@material-ui/lab/Autocomplete";
import user from "../../store/actions/user";

class CreateGroup extends Component {
  state = { loading: false, users: [] };
  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = async () => {
    try {
      const allUser = await Database.collection("users").get();
      const data = [];
      const currentUserId = this.props.user.uid;

      allUser.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      const users = data.filter((d) => d.id !== currentUserId);
      this.setState({ users });
    } catch (error) {
      console.log(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };
  handleSubmit = async (values) => {
    try {
      this.setState({ loading: true });

      if (values.profile) {
        values.profile = await uploadImage(values.profile, "profile");
      }

      if (values.banner) {
        values.banner = await uploadImage(values.banner, "banner");
      }
      const userId = this.props.user.uid;
      values.members.push(userId);
      const payload = {
        ...values,
        createdBy: userId,
        createdAt: new Date(),
      };
      console.log("CreateGroup -> handleSubmit -> payload", payload);
      // delete payload.image;
      console.log("payload", payload);
      await Database.collection("chatrooms").add(payload);
      this.setState({ loading: false });

      toast.success("Successfully Created", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      this.props.handleClose();
    } catch (error) {
      this.setState({ loading: false });
      console.log("error", error);
      toast.error(error, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  handleImages = async (files, setFieldValue, fieldName) => {
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
  render() {
    const { open, handleClose, data, user } = this.props;
    const { loading, users } = this.state;
    const initialValues = {
      banner: "",
      profile: "",
      description: "",
      name: "",
      isPublic: false,
      members: [],
    };
    const validation = (values) => {
      const errors = {};
      // if (!values.banner) errors.banner = "Required";
      if (!values.profile) errors.profile = "Required";
      if (!values.description) errors.description = "Required";
      if (!values.name) errors.name = "Required";
      return errors;
    };

    return (
      <Formik
        initialValues={initialValues}
        validate={validation}
        onSubmit={(values) => {
          const payload = JSON.parse(JSON.stringify(values));
          console.log("UpdateProfile -> values", values);
          delete payload.profilePreview;
          delete payload.bannerPreview;
          payload.profile = values.profile;
          payload.banner = values.banner;
          console.log("UpdateProfile -> payload", payload);
          this.handleSubmit(payload);
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
                Create Group
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
                          this.handleImages(
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
                      className="col-12 profile-img add-plus"
                      style={{
                        backgroundImage:
                          values.profilePreview || values.profile
                            ? `url('${
                                values.profilePreview || values.profile
                              }')`
                            : `url("https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png")`,
                      }}
                    >
                      <input
                        type="file"
                        accept="image/x-png,image/jpeg"
                        className="upload-image"
                        onChange={(e) =>
                          this.handleImages(
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
                      label="Group Name"
                      variant="filled"
                      className="mb-4  bg-light-theme"
                      // disabled={values.isPasswordShown}
                      required
                      error={errors.name && touched.name && errors.name}
                      fullWidth
                      helperText={errors.name && touched.name && errors.name}
                      onChange={(e) =>
                        setFieldValue("name", e.currentTarget.value)
                      }
                      onBlur={handleBlur}
                      value={values.name}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <TextField
                      id="outlined-basic"
                      label="Description"
                      variant="filled"
                      className="mb-4  bg-light-theme"
                      // disabled={values.isPasswordShown}
                      required
                      multiline
                      error={
                        errors.description &&
                        touched.description &&
                        errors.description
                      }
                      fullWidth
                      helperText={
                        errors.description &&
                        touched.description &&
                        errors.description
                      }
                      onChange={(e) =>
                        setFieldValue("description", e.currentTarget.value)
                      }
                      onBlur={handleBlur}
                      value={values.description}
                    />
                  </div>
                  <div className="col-12">
                    <Autocomplete
                      filterSelectedOptions
                      multiple
                      onChange={(e, value) =>
                        setFieldValue(
                          "members",
                          value.map((d) => d.id)
                        )
                      }
                      options={users.filter((d) => d.fullname)}
                      getOptionLabel={(option) => option.fullname}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Share"
                          margin="normal"
                          variant="filled"
                        />
                      )}
                    />
                  </div>
                  <div className="col-12 mb-2 col-md-6">
                    <p className="m-0 text-white">Is this is public event ?</p>
                  </div>
                  <div className="col-12 mb-2 col-md-6">
                    <Button
                      variant={!values.isPublic ? "contained" : "text"}
                      onClick={(e) => setFieldValue("isPublic", false)}
                      color="primary"
                    >
                      No
                    </Button>
                    <Button
                      onClick={(e) => setFieldValue("isPublic", true)}
                      variant={values.isPublic ? "contained" : "text"}
                      color="primary"
                    >
                      Yes
                    </Button>
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  color="primary"
                >
                  {loading ? <CircularProgress /> : "Create"}
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.User.data,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    storeUserUpdate: (props) => {
      dispatch(user.StoreUserUpdate(props));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CreateGroup);
