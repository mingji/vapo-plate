import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  TextField,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Database } from "../../services/firebase";
import { useSelector } from "react-redux";

const InviteGroup = (props) => {
  const { open, handleClose, data = [], selectedGroup } = props;
  console.log("InviteGroup -> selectedGroup", selectedGroup);
  const [selected, setSelected] = useState([]);
  const allUsers = data.filter((d) =>
    selectedGroup ? !selectedGroup.members.find((o) => o === d.id) : d
  );
  console.log("InviteGroup -> selected", selected);
  const [loading, setSetLoading] = useState(false);
  const loginUser = useSelector((state) => state.User.data);

  const createdChatRoom = async () => {
    try {
      setSetLoading(true);
      await Database.collection("chatrooms")
        .doc(selectedGroup.id)
        .set(
          {
            members: [...selectedGroup.members, ...selected],
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
    >
      <DialogTitle id="scroll-dialog-title">Invite Friends</DialogTitle>
      <DialogContent dividers={true}>
        <Autocomplete
          filterSelectedOptions
          multiple
          onChange={(e, value) => setSelected(value.map((d) => d.id))}
          getOptionLabel={(option) => option.fullname}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Friends"
              margin="normal"
              variant="filled"
            />
          )}
          options={allUsers.filter((d) => d.fullname)}
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
          {loading ? <CircularProgress /> : "Add to Group"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InviteGroup;
