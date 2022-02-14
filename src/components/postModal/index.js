import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Formik } from "formik";
import ImageIcon from "@material-ui/icons/Image";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import GifIcon from "@material-ui/icons/Gif";
import { CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import "./styles.scss";
import GifUploadDialoge from "../gifUploadDialoge";
import EmojiPickerDialoge from "../emojiPickerDialoge";
import uploadImage from "../../services/uploadInage";
import { Database } from "../../services/firebase";
import { toast } from "react-toastify";

const PostModal = (props) => {
  const [isGifVisible, setGifVisible] = useState(false);
  const [isEmojiVisible, setEmojiVisible] = useState(false);
  const user = useSelector((state) => state.User.data);
  const initialValues = {
    image: "",
    description: "",
    createdBy: user.uid,
    gif: "",
    emoji: "",
  };
  const validation = (values) => {
    const errors = {};
    return errors;
  };
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
        setFieldValue("gif", "");
        setFieldValue("emoji", "");
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const handleSubmitPostModal = async (
    values,
    { setSubmitting, setValues }
  ) => {
    try {
      setSubmitting(true);
      const payload = {
        ...values,
        createdAt: new Date().toISOString(),
      };
      if (values.image) {
        payload.image = await uploadImage(values.image, "image");
        delete payload.imagePreview;
      }
      await Database.collection("posts").doc().set(payload, { merge: true });
      setSubmitting(false);
      toast.success("Successfully Submitted", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setValues({
        image: "",
        description: "",
        createdBy: user.uid,
        gif: "",
        emoji: "",
      });
    } catch (error) {
      alert(error.message);
      this.setState({ isLoading: false });
      console.log("RegisterContainer -> error", error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={validation}
      onSubmit={handleSubmitPostModal}
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
        <div className="post-modal-container p-2">
          <div className="d-flex">
            <div
              style={{ maxWidth: 100 }}
              className="align-items-center d-flex justify-content-center transition-3 delay-3"
            >
              <img
                src={
                  user.profile ||
                  "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                }
                alt=""
                className="img-fluid profile"
              />
            </div>
            <div className="flex-grow-1 ml-1">
              <textarea
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Whats happening?"
                rows={"3"}
                className="w-100 p-2"
                style={{
                  fontSize:
                    !!values.description.length &&
                    values.description.length < 50
                      ? 30
                      : 12,
                }}
              ></textarea>
            </div>
          </div>
          {(values.imagePreview || values.gif || values.emoji) && (
            <div className="d-flex">
              <div
                style={{ width: 40 }}
                className="align-items-center d-flex justify-content-center transition-3 delay-3"
              ></div>
              <div className="flex-grow-1 ml-1 justify-content-between d-flex">
                {values.emoji ? (
                  <h1>{values.emoji}</h1>
                ) : (
                  <img
                    src={values.imagePreview || values.gif}
                    className="img-fluid img-small"
                    alt="post"
                  />
                )}
              </div>
            </div>
          )}
          <div className="d-flex">
            <div
              style={{ width: 40 }}
              className="align-items-center d-flex justify-content-center transition-3 delay-3"
            ></div>
            <div className="flex-grow-1 ml-1 justify-content-between d-flex">
              <div className="d-flex">
                <div className="position-relative">
                  <ImageIcon color="primary" />
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
                <div onClick={(e) => setGifVisible(true)}>
                  {" "}
                  <GifIcon color="primary" />
                </div>
                <div onClick={(e) => setEmojiVisible(true)}>
                  {" "}
                  <SentimentVerySatisfiedIcon color="primary" />
                </div>
              </div>
              <Button
                variant={
                  !values.image &&
                  !values.gif &&
                  !values.emoji &&
                  !values.description
                    ? "contained"
                    : "outlined"
                }
                classes={{ root: "border-radius-20" }}
                color="primary"
                disabled={
                  !values.image &&
                  !values.gif &&
                  !values.emoji &&
                  !values.description
                }
                onClick={handleSubmit}
              >
                {isSubmitting ? <CircularProgress /> : "Post"}
              </Button>
            </div>
          </div>
          <GifUploadDialoge
            open={isGifVisible}
            handleClose={() => setGifVisible(false)}
            handleSubmit={(values) => {
              if (values.gif) {
                setFieldValue("image", "");
                setFieldValue("imagePreview", "");
                setFieldValue("gif", values?.gif?.media[0]?.gif?.url);
                setFieldValue("emoji", "");
              }
              setGifVisible(false);
            }}
          />
          <EmojiPickerDialoge
            open={isEmojiVisible}
            handleClose={() => setEmojiVisible(false)}
            handleSubmit={(value) => {
              if (value) {
                setFieldValue("image", "");
                setFieldValue("imagePreview", "");
                setFieldValue("gif", "");
                setFieldValue("emoji", value.native);
              }
              setEmojiVisible(false);
            }}
          />
        </div>
      )}
    </Formik>
  );
};

export default PostModal;
