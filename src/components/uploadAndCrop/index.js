import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import getCroppedImg from "../../common/cropImage";
import Cropper from "react-easy-crop";
import { Button } from "@material-ui/core";
const dogImg =
  "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000";

const convetFileToURLBlob = async (files, callback) => {
  console.log("handleImages -> files", files);
  return Promise.all(
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
      callback(images);
    },
    (error) => {
      console.error(error);
    }
  );
};
const blobToFile = (theBlob, fileName) => {
  //A Blob() is almost a File() - it's just missing the two properties below which we will add
  theBlob.lastModifiedDate = new Date();
  theBlob.name = fileName;
  return theBlob;
};
const UploadAndCrop = (props) => {
  const [showCrop, setShowCrop] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [image, setImage] = useState();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
    // showCroppedImage();
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      const fileImage = blobToFile(croppedImage, "IMG");
      props.onChange(fileImage);
      setShowCrop(false);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onChange = async (image) => {
    const onCallBack = (imageURL) => {
      console.log("onCallBack -> imageURL", imageURL);
      setImage(imageURL);
      setShowCrop(true);
    };
    convetFileToURLBlob(image, onCallBack);
  };

  if (showCrop)
    return (
      <div style={{ width: "100%", height: 200 }}>
        <Cropper
          image={image}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
        <Button
          onClick={showCroppedImage}
          variant="contained"
          color="primary"
          //   classes={{ root: classes.cropButton }}
        >
          Done Crop
        </Button>
      </div>
    );

  return (
    <div
      className="col-12  top-profile-container add-plus"
      style={{
        backgroundImage: image
          ? `url('${image}')`
          : `url("https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg")`,
      }}
    >
      <input
        type="file"
        accept="image/x-png,image/jpeg"
        className="upload-image"
        onChange={(e) => onChange(e.currentTarget.files)}
      />
    </div>
  );
};

UploadAndCrop.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default UploadAndCrop;
