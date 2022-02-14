import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  TextField,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Database } from "../../services/firebase";
import { useSelector } from "react-redux";

const FriendList = (props) => {
  console.log("FriendList -> props", props);
  const { open, handleClose, data = [] } = props;
  const [selected, setSelected] = useState("");
  const [loading, setSetLoading] = useState(false);
  const loginUser = useSelector((state) => state.User.data);

  const createdChatRoom = async () => {
    try {
      setSetLoading(true);
      await Database.collection("chatrooms")
        .doc()
        .set(
          {
            createdAt: new Date(),
            createdBy: loginUser.uid,
            members: [loginUser.uid, selected],
          },
          { merge: true }
        );
      setSetLoading(false);
      props.handleClose();
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
      PaperProps={{ style: { backgroundColor: "#1f1e2e" } }}
      fullWidth
    >
      <DialogTitle id="scroll-dialog-title" className="text-white">
        Friends List
      </DialogTitle>
      <DialogContent dividers={true}>
        <DialogContentText className="text-white">
          Chat With Your Friends
        </DialogContentText>
        <Autocomplete
          id="free-solo-demo"
          onChange={(e, value) => setSelected(value?.id)}
          options={data.filter((d) => d.fullname)}
          getOptionLabel={(option) => option.fullname}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              margin="normal"
              variant="filled"
              className="text-dark"
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={(e) => selected && createdChatRoom()}
          disabled={loading}
          color="primary"
        >
          {loading ? <CircularProgress /> : "Start  Chat"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FriendList;
