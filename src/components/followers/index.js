import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import "react-owl-carousel2/lib/styles.css";
import "./styles.scss";
import { withRouter } from "react-router-dom";
const FollowersModal = (props) => {
  console.log("FollowersModal -> props", props);
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      scroll="paper"
      style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
      PaperProps={{ style: { backgroundColor: "#1f1e2e" } }}
      fullWidth
    >
      <DialogTitle
        id="scroll-dialog-title"
        className="text-white text-capitalize"
      >
        {props.title}
      </DialogTitle>
      <DialogContent dividers={true} className="p-0">
        {props.data.length === 0 || !props.open ? (
          <h4 className="text-white text-center text-capitalize">
            No {props.title}
          </h4>
        ) : (
          <List
            subheader={
              <ListSubheader
                component="div"
                id="nested-list-subheader"
                className="text-white"
              >
                Total : {props.data.length}
              </ListSubheader>
            }
          >
            {props.data?.map((user) => (
              <ListItem
                button
                key={user.id}
                onClick={(e) => props.history.push(`/u/${user.id}`)}
              >
                <ListItemAvatar>
                  <Avatar src={user.profile} />
                </ListItemAvatar>
                <ListItemText className="text-white" primary={user.fullname} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withRouter(FollowersModal);
