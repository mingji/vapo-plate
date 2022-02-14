import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import "./style.scss";
import { Formik } from "formik";
import { connect } from "react-redux";
import user from "../../store/actions/user";
import { CircularProgress } from "@material-ui/core";

class LoginContainer extends Component {
  state = { isLoading: false };
  handleGoogleLogin = () => this.props.loginWithGoogle(this.handleLoading);
  handleSubmit = (values) => {
    const payload = {
      email: String(values.email).trim(),
      password: String(values.password).trim(),
    };
    this.props.loginWithEmail({ payload, handleLoading: this.handleLoading });
  };
  handleLoading = (isLoading) => this.setState({ isLoading });
  render() {
    const { isLoading } = this.state;
    const { isLogin } = this.props;
    const initialValues = {
      email: "",
      password: "",
    };
    const validation = (values) => {
      const errors = {};
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
              <h4 className="mb-4 text-white">Log in to Find fun</h4>
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
                          label="Email address"
                          variant="filled"
                          className="mb-4  bg-light-theme"
                          // disabled={values.isPasswordShown}
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
                        {/* {values.isPasswordShown && ( */}
                        <TextField
                          id="outlined-basic"
                          label="Password"
                          variant="filled"
                          className="mb-4 animated slideInRight animate-fast  bg-light-theme"
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
                        {/* )} */}
                        <button
                          className="btn btn-custom mb-4"
                          onClick={(e) =>
                            // !values.isPasswordShown
                            //   ? this.handlePasswordShown(values,setFieldValue)
                            // :
                            handleSubmit(e)
                          }
                        >
                          Login
                        </button>
                      </>
                    )}
                  </Formik>
				  <Link to="/forgot" className="btn btn-custom mb-4">
                    <span className=" text-white">Forgot password?</span>
                  </Link>
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
                  {/* <Link to="/register"> */}
                  <Link to="/register" className="btn btn-custom mb-4">
                    {/* <i class="fab fa-google"></i> */}
                    <span className=" text-white">Register</span>
                  </Link>
                  {/* </Link> */}
                  <p className="mb-2">
                    By continuing, I accept the <a href="">FindFun</a> terms of
                    service,
                  </p>
                  <p className="mb-2">
                    {" "}
                    community guidelines and have read the{" "}
                    <a href="#">privacy policy</a>
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
