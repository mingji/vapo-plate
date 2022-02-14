import { Storage } from "./firebase";
import uniqid from "uniqid";

export default (imageAsFile, startWith = "event") =>
  new Promise((res, rej) => {
    console.log("start of upload");
    const imageName = uniqid(startWith);
    // async magic goes here...
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }
    const uploadTask = Storage.ref(`/images/${imageName}`).put(imageAsFile);
    //initiates the firebase side uploading
    uploadTask.on(
      "state_changed",
      snapShot => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      err => {
        //catches the errors
        console.log(err);
        rej(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        Storage.ref("images")
          .child(imageName)
          .getDownloadURL()
          .then(fireBaseUrl => {
            res(fireBaseUrl);
          })
          .catch(e => rej(e));
      }
    );
  });
