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
  CircularProgress,
} from "@material-ui/core";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/lib/styles.css";
import "./styles.scss";
import { Database } from "../../services/firebase";
import { withRouter } from "react-router-dom";
const StoryModal = (props) => {
  console.log("props.data", props.data);
  let carouse;
  const handleForward = () => carouse.next();
  const handleBack = () => carouse.prev();
  const onChange = async ({ item }) => {
    console.log("change fire");
    if (props.isMine) return;
    const activeStory = props.data[item.index];
    console.log("onChange -> activeStory", activeStory);
    if (!activeStory) return;
    const isSeen = activeStory.seenBy?.find(
      (d) => d.id === props.currentUser.uid
    );
    console.log("onChange -> isSeen", isSeen);
    if (isSeen) return;
    const payload = {
      seenBy: [
        ...activeStory.seenBy,
        {
          id: props.currentUser.uid,
          profile: props.currentUser.profile,
          fullname: props.currentUser.fullname,
        },
      ],
    };
    console.log("updating");

    console.log("onChange -> activeStory.id", payload);
    await Database.collection("story")
      .doc(activeStory.id)
      .set(payload, { merge: true });
  };
  const renderItmes = () => {
    const data = props.data.map((d) => (
      <div className="story-item">
        <img src={d.image} alt="" srcset="" className="img-fluid mb-3" />
        {props.isMine && (
          <div className="align-self-baseline">
            <List
              subheader={
                <ListSubheader
                  component="div"
                  id="nested-list-subheader"
                  className="text-white"
                >
                  Seen By
                </ListSubheader>
              }
            >
              {(!d.seenBy || !d.seenBy.length) && (
                <ListItem button>
                  <ListItemText
                    className="text-white"
                    primary={"No one seen so far"}
                  />
                </ListItem>
              )}
              {d.seenBy?.map((user) => (
                <ListItem
                  button
                  key={user.id}
                  onClick={(e) => props.history.push(`/u/${user.id}`)}
                >
                  <ListItemAvatar>
                    <Avatar src={user.profile} />
                  </ListItemAvatar>
                  <ListItemText
                    className="text-white"
                    primary={user.fullname}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    ));
    return data;
  };
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      scroll="paper"
      style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
      PaperProps={{ style: { backgroundColor: "#1f1e2e" } }}
      fullWidth
    >
      <DialogTitle id="scroll-dialog-title" className="text-white">
        {props.title || "My Stories"}
      </DialogTitle>
      <DialogContent dividers={true} className="p-0">
        {props.isLoading ? (
          <div className="d-flex justify-content-center messages-container p-0">
            <CircularProgress />
          </div>
        ) : props.data.length === 0 || !props.open ? (
          <h4 className="text-white text-center">No Stories</h4>
        ) : (
          <OwlCarousel
            ref={(ref) => (carouse = ref)}
            events={{
              onChanged: onChange,
              initialize: onChange({ item: { index: 0 } }),
            }}
            options={{
              items: 1,
              nav: false,
              rewind: true,
              autoplay: true,
              dots: false,
              mergeFit: true,
              margin: 10,
            }}
          >
            {renderItmes()}
          </OwlCarousel>
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

export default withRouter(StoryModal);
