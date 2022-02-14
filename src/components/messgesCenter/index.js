import React, { Component } from "react";
import { Database, TimeStampNow } from "../../services/firebase";
import { connect } from "react-redux";
import user from "../../store/actions/user";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import moment from "moment";
import { TextField, InputAdornment, withStyles } from "@material-ui/core";
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import { ImageUploadDialoge, GifUploadDialoge } from "..";
import uploadImage from "../../services/uploadInage";
import InviteGroup from "../inviteGroup";
import PersonIcon from "@material-ui/icons/Person";
import { Link, withRouter } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import AddStoryModal from "../addStory";

const styles = (theme) => ({
  searchInput: {
    background: '#353445',
    borderRadius: 17,
    width: '100%',
    outline: 0,
    marginLeft: 10,
    '& .MuiOutlinedInput-input': {
      padding: '6px 0 6px 14px'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'none'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '& .MuiOutlinedInput-adornedEnd': {
      paddingRight: 0
    }
  }
});

class MessagesCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageText: "",
      messageFile: null,
      messageGif: null,
      messageType: "text",
      messages: [],
      story: [],
      photoIndex: -1,
      isLightBoxShown: false,
      isDropZoneVisible: false,
      isGifVisible: false,
      showInvite: false,
      showList: false,
      showStoryModal: false,
    };
  }

  componentDidMount() {
    this.getAllmessages();
    this.getAllStories();
  }
  getAllmessages = async () => {
    const { selected, selectedChatRoom } = this.props;
    if (!selected) return;
    this.setState({ isLoading: true });
    try {
      this.messages = await Database.collection("chatrooms")
        .doc(selected)
        .collection("messages")
        .onSnapshot(async (snap) => {
          const data = [];
          snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
          this.setState({ messages: data, isLoading: false });
          const lastMessage = selectedChatRoom.lastMessage;
          if (lastMessage) {
            const lastMessageObj = lastMessage?.seenBy && {
              lastMessage: {
                ...lastMessage,
                seenBy: [...lastMessage.seenBy, this.props.user.uid],
              },
            };
            const flag = lastMessage.seenBy.find(
              (d) => d === this.props.user.uid
            );
            if (lastMessageObj && !flag)
              await Database.collection("chatrooms")
                .doc(selected)
                .set(lastMessageObj, { merge: true });
          }
        });
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };
  getAllStories = async () => {
    const { selected, otherUser, group, selectedChatRoom } = this.props;
    if (group) {
      const storiesFromProps = selectedChatRoom.stories;
      if (storiesFromProps && storiesFromProps.length)
        this.setState({ story: storiesFromProps });
      return;
    }
    try {
      const tsToMillis = TimeStampNow();
      const compareDate = new Date(tsToMillis - 24 * 60 * 60 * 1000);

      this.stories =
        selected &&
        (await Database.collection("story")
          .where("createdAt", ">", compareDate)
          .where("createdBy", "==", otherUser.id)
          .get()
          .then((snap) => {
            let data = [];
            snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
            const storiesFromProps = selectedChatRoom.stories;
            if (storiesFromProps && storiesFromProps.length)
              data = [...storiesFromProps, ...data];
            this.setState({ story: data });
          }));
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selected !== this.props.selected) {
      this.getAllmessages();
      this.getAllStories();
    }
    if (prevState.messages.length !== this.state.messages.length)
      this.scrollToBottom();
  }

  componentWillUnmount() {
    if (this.messages) this.messages();
    if (this.stories) this.stories();
  }
  addMessage = async () => {
    const { selected } = this.props;
    const { messageText, messageType, messageFile, messageGif } = this.state;
    const currentUserId = this.props.user.uid;
    try {
      let messageURL = null;
      if (messageType === "image" && messageFile) {
        messageURL = await uploadImage(messageFile.image, "message");
      }
      (messageText || messageFile || messageGif) &&
        (await Database.collection("chatrooms")
          .doc(selected)
          .collection("messages")
          .doc()
          .set(
            {
              createdAt: new Date().getTime(),
              createdBy: currentUserId,
              message: String(messageText).trim(),
              imageURL: messageURL || messageGif,
              type: messageType || "text",
            },
            { merge: true }
          ));
      (messageText || messageFile || messageGif) &&
        (await Database.collection("chatrooms")
          .doc(selected)
          .set(
            {
              lastMessage: {
                createdAt: new Date().getTime(),
                createdBy: currentUserId,
                message: String(messageText).trim(),
                imageURL: messageURL || messageGif,
                type: messageType || "text",
                seenBy: [currentUserId],
              },
            },
            { merge: true }
          ));

      this.setState({
        messageText: "",
        messageType: "text",
        messageFile: null,
        messageGif: null,
      });
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };
  handleUploadImage = (file) =>
    this.setState(
      { isDropZoneVisible: false, messageFile: file, messageType: "image" },
      () => this.addMessage()
    );
  handleUploadGif = (file) =>
    this.setState(
      {
        isGifVisible: false,
        messageGif: file?.gif?.media[0].gif?.url,
        messageType: "gif",
      },
      () => this.addMessage()
    );
  scrollToBottom = () => {
    if (this.messagesCenter) {
      setTimeout(() => {
        this.messagesCenter.scrollTop = this.messagesCenter.scrollHeight;
      }, 0);
    }
  };
  getUser = (id) => {
    const { allUsers } = this.props;
    return allUsers.find((d) => d.id === id);
  };
  getUniqueStories = (data = []) => {
    const next24Hours = new Date().getTime() - 24 * 60 * 60 * 1000;
    const filterData = data.filter((d) => d.createdAt > next24Hours);
    return filterData;
  };
  handleAddStory = async (values, { setValues, setSubmitting }) => {
    try {
      const payload = {
        createdBy: this.props.user.uid,
        createdAt: new Date().getTime(),
        seenBy: [],
      };
      const allStoriesWithInChatRoom =
        this.props.selectedChatRoom.stories || [];
      const uniqueStories = this.getUniqueStories(allStoriesWithInChatRoom);
      setSubmitting(true);
      payload.image = await uploadImage(values.image, "profile");
      uniqueStories.push(payload);
      await Database.collection("chatrooms")
        .doc(this.props.selected)
        .set({ stories: uniqueStories }, { merge: true });
      this.setState({ showStoryModal: false });
      setValues({
        image: "",
      });
      setSubmitting(false);
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };
  render() {
    const {
      allUsers,
      selected,
      otherUser,
      group,
      selectedChatRoom,
      classes
    } = this.props;
    console.log("render -> selectedChatRoom", selectedChatRoom);
    const {
      messages,
      messageText,
      story,
      photoIndex,
      isLightBoxShown,
      showInvite,
      showList,
      isLoading,
      showStoryModal,
    } = this.state;
    const currentUserId = this.props.user.uid;
    const images = story.map((d) => d.image);
    const allUsersWithOutInvite = allUsers;
    if (!selected || isLoading)
      return (
        <>
          <div className="top" style={{ opacity: 0 }}>
            <h3 className="heading">Messages</h3>
            <div className="stories">
              <div className="story"></div>
              <div className="story"></div>
              <div className="story"></div>
              <div className="story"></div>
              <div className="story"></div>
              <div className="story"></div>
              <div className="story"></div>
            </div>
          </div>
          {isLoading && (
            <div className="d-flex justify-content-center messages-container p-0">
              <CircularProgress />
            </div>
          )}
          <div className="messages-container" style={{ opacity: 0 }}>
            {[...Array(10)].map((d) => (
              <>
                <div className="left animated slideInLeft">
                  <div className="message first message">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Est optio nobis labore! Debitis iure quo magnam architecto
                      eos facilis laudantium labore eligendi sed modi cupiditate
                      delectus, reiciendis nam laboriosam maiores.
                    </p>
                    <p className="date">10 mins ago</p>
                  </div>
                </div>
                <div className="left animated slideInLeft">
                  <div className="message message center">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Est
                    </p>
                    <p className="date">10 mins ago</p>
                  </div>
                </div>
                <div className="right animated slideInRight">
                  <div className="message first message">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Est optio nobis labore! Debitis iure quo magnam architecto
                      eos facilis laudantium labore eligendi sed modi cupiditate
                      delectus, reiciendis nam laboriosam maiores.
                    </p>
                    <p className="date">10 mins ago</p>
                  </div>
                </div>
                <div className="right animated slideInRight">
                  <div className="message message center">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Est
                    </p>
                    <p className="date">10 mins ago</p>
                  </div>
                </div>{" "}
              </>
            ))}
          </div>
          <div className="control-container" style={{ opacity: 0 }}>
            <i class="fas fa-plus-circle"></i>
            <input type="text" className="form-control" />
            <button className="btn btn-custom">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
        </>
      );
    return (
      <>
        <div className="top">
          <h3 className="heading text-white text-capitalize">
            {/*  */}
            <span onClick={(e) => this.props.handleChangeShowPeople(false)}>
              <i class="fas fa-chevron-left mr-1 d-inline-block d-md-none d-lg-none"></i>
              {group ? (
                group.eventId ? (
                  <Link to={`/event/${group.eventId}`}>{group.name}</Link>
                ) : (
                  group.name
                )
              ) : (
                <Link to={`/u/${otherUser.id}`}>{otherUser.fullname}</Link>
              )}{" "}
            </span>
            {group && (
              <span
                onClick={(d) => this.setState({ showInvite: true })}
                style={{ fontSize: 12 }}
              >
                (Invite)
              </span>
            )}
            {group && (
              <span
                onClick={(d) => this.setState({ showList: true })}
                style={{ fontSize: 12 }}
              >
                (List)
              </span>
            )}
            <span
              onClick={(e) => this.setState({ showStoryModal: true })}
              style={{ fontSize: 12 }}
            >
              (Add Story)
            </span>
          </h3>
        </div>
        <div
          className="messages-container"
          ref={(ref) => (this.messagesCenter = ref)}
        >
          <div className="overflow-y-hidden-bar">
            <div
              className={`stories ${
                (!!group?.members?.length || !!story?.length) && "pt-4 pl-3"
              }`}
              style={{
                width: `${
                  (Number(group ? group.members.length : 0) +
                    Number(story.length)) *
                  80
                }px`,
              }}
            >
              {story.map((d, i) => (
                <div
                  className="story has-story"
                  style={{ backgroundImage: `url(${d.image})` }}
                  onClick={(e) =>
                    this.setState({ isLightBoxShown: true, photoIndex: i })
                  }
                ></div>
              ))}
              {group &&
                group.members.map((id) => {
                  const user = this.getUser(id);
                  return (
                    <div
                      className={`story ${user.isStory && "has-story"}`}
                      style={{
                        backgroundImage: user.profile && `url(${user.profile})`,
                      }}
                      onClick={(e) => this.props.history.push(`/u/${id}`)}
                    ></div>
                  );
                })}
            </div>
          </div>

          {group && (
            <div className="row upload-image-container">
              <div className="col-12 p-0 w-100">
                <div
                  className="col-12 top-profile-container w-100 p-0 invisible"
                  style={{ height: 80 }}
                  // style={{
                  //   backgroundImage: group.banner
                  //     ? `url('${group.banner}')`
                  //     : `url("https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg")`,
                  // }}
                ></div>
              </div>

              <div className="col-12 profile-img-container">
                <div
                  className="col-12 profile-img"
                  style={{
                    backgroundImage: group.profile
                      ? `url('${group.profile}')`
                      : `url("https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png")`,
                  }}
                ></div>
              </div>
            </div>
          )}
          {!messages.length ? (
            <div
              className="w-100 d-flex justify-content-center align-items-center"
              style={{ minHeight: "60vh" }}
            >
              <p>Start the conversation</p>
            </div>
          ) : (
            messages
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((d, i, arr) => {
                const isMine = d.createdBy === currentUserId;
                const isLastSequence =
                  i > 0 && arr[i - 1].createdBy === d.createdBy;

                return (
                  <>
                    <div
                      className={`${
                        !isMine ? "left" : "right"
                      } animated slideIn${!isMine ? "Left" : "Right"}`}
                    >
                      {!isMine && !isLastSequence && (
                        <Link to={`/i/${d.createdBy}`} className="date">
                          {String(this.getUser(d.createdBy)?.fullname).length >
                          15
                            ? String(this.getUser(d.createdBy)?.fullname)
                                .slice(0, 15)
                                .concat("...")
                            : this.getUser(d.createdBy)?.fullname}
                        </Link>
                      )}
                      <div
                        className={`message ${
                          isLastSequence ? "center" : "first"
                        } message`}
                      >
                        {d.type === "image" || d.type === "gif" ? (
                          <img
                            src={d.imageURL}
                            className="img-fluid"
                            style={{ maxWidth: 200 }}
                            alt="image"
                          />
                        ) : (
                          <p>{d.message} </p>
                        )}
                        {isMine && (
                          <p className="date float-date">
                            {moment(d.createdAt).format("ddd DD, YYYY,HH:mm A")}
                          </p>
                        )}
                      </div>
                      {!isMine && (
                        <p className="date">
                          {moment(d.createdAt).format("ddd DD, YYYY,HH:mm A")}
                        </p>
                      )}
                    </div>
                  </>
                );
              })
          )}
        </div>
        <div className="control-container">
          <form action="javascript:void(0)" onSubmit={this.addMessage}>
            <i
              class="fas fa-image"
              onClick={(e) => this.setState({ isDropZoneVisible: true })}
            ></i>
            <img
              src="/assets/images/gif.png"
              onClick={(e) => this.setState({ isGifVisible: true })}
              alt="git"
            />
            <TextField
              variant="outlined"
              className={classes.searchInput}
              onChange={(e) => this.setState({ messageText: e.currentTarget.value })}
              value={messageText}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SentimentSatisfiedIcon style={{ color: '#888cd0', fontSize: 24 }} />
                  </InputAdornment>
                ),
              }}
            />
            <button className="btn btn-custom" type="submit">
              Send
            </button>
          </form>
        </div>
        {isLightBoxShown && (
          <Lightbox
            mainSrc={images[photoIndex]}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() =>
              this.setState({ isLightBoxShown: false, photoIndex: -1 })
            }
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
        <ImageUploadDialoge
          open={this.state.isDropZoneVisible}
          handleClose={() => this.setState({ isDropZoneVisible: false })}
          handleSubmit={this.handleUploadImage}
        />
        <GifUploadDialoge
          open={this.state.isGifVisible}
          handleClose={() => this.setState({ isGifVisible: false })}
          handleSubmit={this.handleUploadGif}
        />
        <InviteGroup
          open={showInvite}
          handleClose={() => this.setState({ showInvite: false })}
          handleSubmit={() => null}
          data={allUsersWithOutInvite}
          selectedGroup={group}
        />
        <Dialog
          open={showList}
          onClose={(e) => this.setState({ showList: false })}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Members</DialogTitle>
          <DialogContent dividers={true} className="p-0">
            <List>
              {group &&
                group.members &&
                !!group.members.length &&
                group.members.map((id) => {
                  const user = this.getUser(id);
                  return (
                    <ListItem
                      button
                      onClick={() => {
                        this.setState({ showList: false });
                        this.props.history.push(`/u/${id}`);
                      }}
                      key={user.id}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={user.fullname} />
                    </ListItem>
                  );
                })}
            </List>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={(e) => this.setState({ showList: false })}
              color="primary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <AddStoryModal
          open={showStoryModal}
          onClose={(e) => this.setState({ showStoryModal: false })}
          onSubmit={this.handleAddStory}
        />
      </>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.User.data,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    storeUserUpdate: (props) => {
      dispatch(user.StoreUserUpdate(props));
    },
  };
};

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(MessagesCenter))
);
