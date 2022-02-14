import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const emojiPickerDialoge = (props) => {
  const { open, handleClose } = props;
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
      PaperProps={{ style: { backgroundColor: "transparent" } }}
    >
      <DialogContent dividers={true}>
        <Picker onSelect={(e) => props.handleSubmit(e)} />
      </DialogContent>
    </Dialog>
  );
};

export default emojiPickerDialoge;
