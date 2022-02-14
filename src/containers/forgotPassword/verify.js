import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import { Firebase } from "../../services/firebase";
import "./style.scss";

function ForgotPasswordVerifyContainer(props)  {
  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const initialValues = {
    password: "",
  };

  useEffect(() => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var code = url.searchParams.get("oobCode");
    Firebase.auth().verifyPasswordResetCode(code)
    .then(function(email) {
      setIsInvalidCode(false);
    })
    .catch(function(e) {
      // Invalid code
      setIsInvalidCode(true);
    })
  }, []);

  const handleSavePassword = (values) => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var code = url.searchParams.get("oobCode");
    Firebase.auth().confirmPasswordReset(code, values.password)
    .then(function() {
      toast.success("Reset Password Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      props.history.push('/login');
    })
    .catch(function(e) {
    })
  }

  const validation = (values) => {
    const errors = {};
    if (!values.password) errors.password = "Required";
    else if (String(values.password).length < 7)
      errors.password = "Minimum 8 Charters Required";
    return errors;
  };

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
            <h4 className="mb-4 text-white">Forgot Password</h4>
            {isInvalidCode
            ?
            <div className="invalid-code">
              <p>Try resetting your password again</p>
              <p>Your request to reset your password has expired or the link has already been used</p>
            </div>
            :
            <React.Fragment>
              <h6 className="mb-4">Forgot Password ? let us help you out!!!</h6>
              <Formik
                initialValues={initialValues}
                validate={validation}
                onSubmit={handleSavePassword}
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
                }) => (
                  <>
                    <TextField
                      id="outlined-basic"
                      label="New Password"
                      variant="filled"
                      className="mb-4"
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
                    <button className="btn btn-custom mb-4" onClick={handleSubmit}>
                      Save 
                    </button>
                  </>
                )}
                </Formik>
              </React.Fragment>
              }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordVerifyContainer;
