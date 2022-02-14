import React from "react";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import { Firebase } from "../../services/firebase";
import "./style.scss";

function ForgotPasswordContainer(props) {
  const initialValues = {
    email: "",
  };

  const handleSendVerificationEmail = (values) => {
    Firebase.auth().sendPasswordResetEmail(values.email)
      .then(function() {
        toast.success("Reset Password Email Sent", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        props.history.push('/login');
      })
      .catch(function(error) {
        console.log(error)
      });
  }

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
    return errors;
  };

  return (
    <div className="login-container">
      <div className="container">
        <div className="row ">
          <div className="col-12  animated zoomIn">
		    <Link to="/" className="logo">
			  <img
				src="/assets/images/logo.png"
				className="img-fluid m-2"
				alt=""
				style={{ maxWidth: 200 }}
			  />
			</Link>
            {/*<div className="logo mb-3">
              <Link to="/">
                {" "}
                <svg viewBox="0 0 100 98" data-reactid="105">
                  <path
                    d="M44.053 23.401c10.985-2.481 21.946 2.016 28.049 10.52L23.556 44.89C25.23 34.627 33.068 25.882 44.053 23.4zm28.32 40.35c-3.67 5.322-9.329 9.35-16.227 10.908-11.057 2.498-22.09-2.076-28.169-10.69l48.698-11.002 7.931-1.792 15.165-3.426a47.9 47.9 0 0 0-1.263-9.656C92.336 11.931 65.658-4.382 38.923 1.658 12.188 7.698-4.482 33.804 1.691 59.967c6.172 26.162 32.85 42.475 59.585 36.435 15.753-3.559 28.007-14.085 34.156-27.484l-23.059-5.167z"
                    fillRule="evenodd"
                    data-reactid="106"
                  ></path>
                </svg>
              </Link>
            </div>*/}
			{/*<h4 className="mb-4">Forgot Password</h4>*/}
            <h6 className="mb-4">Forgot Password ? let us help you out!!!</h6>
            <Formik
              initialValues={initialValues}
              validate={validation}
              onSubmit={handleSendVerificationEmail}
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
                    label="Email address"
                    variant="filled"
                    className="mb-4"
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
                  <button className="btn btn-custom mb-4" onClick={handleSubmit}>
                    Send Verification Email
                  </button>
                  <p className="mb-2">
                    {" "}
                    community guidelines and have read the{" "}
                    <a href="#">privacy policy</a>.
                  </p>
                </>
              )}
              </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordContainer;
