import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import { Firebase, Database } from "../../services/firebase";
import { toast } from "react-toastify";

import "./style.scss";
import { connect } from "react-redux";
import user from "../../store/actions/user";
import { CircularProgress } from "@material-ui/core";
import { generateKeywords } from "../../common/generateKeywords";

class RegisterContainer extends Component {
  state = { isLoading: false };
  handleLoading = (isLoading) => this.setState({ isLoading });

  handleSubmit = async (values, { setSubmitting, setValues }) => {
    try {
      this.handleLoading(true);
      const newUser = await Firebase.auth().createUserWithEmailAndPassword(
        String(values.email).trim(),
        String(values.password).trim()
      );
      const userUID = newUser.user.uid;
      await Database.collection("users")
        .doc(userUID)
        .set(
          {
            email: String(values.email).trim(),
            fullname: String(values.fullname).trim(),
            info: "",
            keywords: generateKeywords(String(values.fullname).toLowerCase()),
            username: "",
            profile: "/assets/images/default.jpg",
          },
          { merge: true }
        );
      this.handleLoading(false);

      toast.success("User Created", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      this.props.history.push("/login");
    } catch (error) {
      toast.error(error.message || "Something Went Wrong", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      this.setState({ isLoading: false });
      setValues({ ...values });
      console.log("RegisterContainer -> error", error);
    }
  };
  handleGoogleLogin = () => this.props.loginWithGoogle(this.handleLoading);

  render() {
    const { isLoading } = this.state;
    const { isLogin } = this.props;
    const initialValues = {
      fullname: "",
      email: "",
      password: "",
    };
    const validation = (values) => {
      const errors = {};
      if (!values.fullname) errors.fullname = "Required";
      else if (String(values.fullname).length < 4)
        errors.fullname = "Minimum 5 Charters Required";
      const isValidEmail = (email) =>
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
          String(email).toLocaleLowerCase()
        );

      if (!isValidEmail(values.email)) {
        errors.email = "invalid Email";
      } else if (!values.email) {
        errors.email = "required";
      }
      if (!values.password) errors.password = "Required";
      else if (String(values.password).length < 7)
        errors.password = "Minimum 8 Charters Required";
      return errors;
    };
    if (isLogin) return <Redirect to="/" />;

    return (
      <div className="login-container">
        <div className="container">
          <div className="row ">
            <div className="col-12  animated zoomIn">
              <div className="logo mb-3">
                <Link to="/">
                  {" "}
                  <img
                    src="/assets/images/logo.png"
                    className="img-fluid"
                    style={{ maxWidth: 150 }}
                  />
                </Link>
              </div>
              <h4 className="mb-4 text-white">Get Registered On Find Fun</h4>
              <h6 className="mb-4">
                Use Facebook,Google or email to get started.
              </h6>
              {isLoading ? (
                <CircularProgress color="secondary" className={"w-0 h-0"} />
              ) : (
                <>
                  <Formik
                    initialValues={initialValues}
                    validate={validation}
                    onSubmit={this.handleSubmit}
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
                        <TextField
                          id="outlined-basic"
                          label="Full Name"
                          variant="filled"
                          className="mb-2   bg-light-theme"
                          required
                          error={
                            errors.fullname &&
                            touched.fullname &&
                            errors.fullname
                          }
                          fullWidth
                          helperText={
                            errors.fullname &&
                            touched.fullname &&
                            errors.fullname
                          }
                          onChange={(e) =>
                            setFieldValue("fullname", e.currentTarget.value)
                          }
                          onBlur={handleBlur}
                          value={values.fullname}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Email address"
                          variant="filled"
                          className="mb-2 bg-light-theme"
                          required
                          error={errors.email && touched.email && errors.email}
                          fullWidth
                          helperText={
                            errors.email && touched.email && errors.email
                          }
                          onChange={(e) =>
                            setFieldValue("email", e.currentTarget.value)
                          }
                          onBlur={handleBlur}
                          value={values.email}
                        />
                        <TextField
                          id="outlined-basic"
                          label="Password"
                          variant="filled"
                          className="mb-4 animated slideInRight animate-fast   bg-light-theme"
                          type="password"
                          required
                          error={
                            errors.password &&
                            touched.password &&
                            errors.password
                          }
                          fullWidth
                          helperText={
                            errors.password &&
                            touched.password &&
                            errors.password
                          }
                          onChange={(e) =>
                            setFieldValue("password", e.currentTarget.value)
                          }
                          onBlur={handleBlur}
                          value={values.password}
                        />
                        <button
                          className="btn btn-custom mb-4 text-white"
                          onClick={handleSubmit}
                          type="button"
                        >
                          Register
                        </button>
                      </>
                    )}
                  </Formik>
                  <p className="or mb-4">or</p>
                  <button className="btn btn-custom mb-4 facebook">
                    <i class="fab fa-facebook-f"></i>
                    <span>Continue with Facebook</span>
                  </button>
                  <button
                    className="btn btn-custom mb-4 google"
                    onClick={this.handleGoogleLogin}
                  >
                    <i class="fab fa-google"></i>
                    <span>Continue with Google</span>
                  </button>
                  <Link to="/login" className="btn btn-custom mb-4">
                    {/* <i class="fab fa-google"></i> */}
                    <span className="text-white">Login</span>
                  </Link>
                  <p className="mb-2">
                    By continuing, I accept the <a href="">FindFun</a> terms of
                    service,
                  </p>
                  <p className="mb-2">
                    {" "}
                    community guidelines and have read the{" "}
                    <a href="#">privacy policy</a>.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ isLogin: state.User.isLogin });
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loginWithGoogle: (props) => {
      dispatch(user.LoginGoogle(props));
    },
    loginWithEmail: (props) => dispatch(user.LoginWithEmail(props)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
