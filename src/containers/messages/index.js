import React, { Component } from "react";
import { FriendList, MessagesCenter } from "../../components";
import "./style.scss";
import { Database, TimeStampNow } from "../../services/firebase";
import { connect } from "react-redux";
import user from "../../store/actions/user";
import getDay from "../../common/getDay";
import { CircularProgress, TextField, InputAdornment, withStyles } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import GetStory from "../../components/getStory";

const styles = (theme) => ({
  searchInput: {
    background: '#353445',
    borderRadius: 17,
    width: '100%',
    outline: 0,
    '& .MuiOutlinedInput-input': {
      padding: '8px 14px 8px 0'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'none'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    }
  }
});

class MessagesContainer extends Component {
  state = {
    createEventModal: false,
    users: [],
    chatrooms: [],
    selectedChatRooms: "",
    search: "",
    isShownPeople: false,
    isLoading: true,
  };

  componentDidMount() {
    this.getAllUsers();
  }

  getChatrooms = async (id) => {
    try {
      const chatrooms = await Database.collection("chatrooms").doc(id).get();
      this.setState({
        selectedChatRooms: { ...chatrooms.data(), id: chatrooms.id },
        isShownPeople: true,
      });
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };
  componentWillUnmount() {
    if (this.chatrooms) this.chatrooms();
  }
  getAllChatrooms = async () => {
    try {
      const { selectedChatRoom } = this.state;
      this.chatrooms = await Database.collection("chatrooms")
        .where("members", "array-contains", this.props.user.uid)
        .onSnapshot((snap) => {
          const data = [];
          snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
          this.setState({ chatrooms: data });
          if (selectedChatRoom) {
            this.setState({
              selectedChatRoom: data.find((d) => d.id === selectedChatRoom.id),
            });
          }
        });
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };

  getAllUsers = async () => {
    try {
      const allUser = await Database.collection("users").get();
      const data = [];

      const tsToMillis = TimeStampNow();

      const compareDate = new Date(tsToMillis - 24 * 60 * 60 * 1000);
      const last24Hour = compareDate.valueOf();
      console.log("MessagesContainer -> getAllUsers -> last24Hour", last24Hour);

      for (const iterator of allUser.docs) {
        const user = iterator.data();
        let isStory = false;
        if (user.recentStory) {
          const storyDate = new Date(
            user.recentStory.createdAt.toDate()
          ).valueOf();
          console.log(
            "MessagesContainer -> getAllUsers -> storyDate",
            storyDate
          );
          isStory = last24Hour <= storyDate;
          console.log(
            "MessagesContainer -> getAllUsers -> isStory",
            isStory,
            iterator.id
          );
        }
        data.push({
          ...iterator.data(),
          id: iterator.id,
          isStory,
        });
      }
      this.setState({ users: data, isLoading: false });
      this.getAllChatrooms();
      const {
        match: {
          params: { id },
        },
      } = this.props;
      if (id) this.getChatrooms(id);
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };
  getUser = (uid) => {
    const { users } = this.state;
    console.log("MessagesContainer -> users", users);
    return users.find((d) => d.id === uid);
  };
  setCreateEventModal = (createEventModal) =>
    this.setState({ createEventModal });

  render() {
    const {
      createEventModal,
      users: allUser,
      chatrooms,
      selectedChatRooms,
      search,
      isLoading,
      isShownPeople,
      storyOpen,
    } = this.state;
    const { classes } = this.props;
    const currentUserId = this.props.user.uid;
    const users = allUser.filter((d) => {
      let flag = d.id !== currentUserId;
      if (flag) {
        for (let i = 0; i < chatrooms.length; i++) {
          const element = chatrooms[i];
          const temp = !element.name && element.members.find((o) => o === d.id);
          if (temp) {
            flag = false;
            break;
          }
        }
      }
      return flag;
    });
    let selectedOtherUser = {};
    return (
      <div className="event-messages-container">
        <div>
          <div className="row p-0 m-0">
            <div
              className={`col-12 p-0 m-0 col-sm-12 col-md-5 col-lg-4 left-container d-block ${
                isShownPeople && "hide-sm"
              }`}
            >
              <div className="top pb-2 pl-3 pr-3 mb-1">
                <h4 className="heading  text-white">
                  Messages
                  <div className="d-flex">
                    <i
                      class="fas fa-plus-circle"
                      onClick={(e) => this.setState({ createEventModal: true })}
                    ></i>
                    {/* <i
                      class={`fas fa-arrow-${
                        isShownPeople ? "up" : "down"
                      } ml-1 more-aarow`}
                      onClick={(e) =>
                        this.setState({ isShownPeople: !isShownPeople })
                      }
                    ></i> */}
                  </div>
                </h4>
                <TextField
                  variant="outlined"
                  className={classes.searchInput}
                  onChange={(e) => this.setState({ search: e.currentTarget.value })}
                  value={search}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon style={{ color: '#888cd0', fontSize: 32 }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center mt-5">
                  <CircularProgress />
                </div>
              ) : (
                <div className={`friends-container`}>
                  {!chatrooms.length ? (
                    <div
                      className="w-100 d-flex justify-content-center align-items-center"
                      style={{ minHeight: "70vh" }}
                    >
                      <p>No chat Found</p>
                    </div>
                  ) : (
                    chatrooms
                      .sort(
                        (a, b) =>
                          (b.lastMessage ? b.lastMessage.createdAt : 0) -
                          (a.lastMessage ? a.lastMessage.createdAt : 0)
                      )
                      .map((d, i) => {
                        let isGroup = !!d.name;
                        let otherUserId = false;
                        d.members.map((o) => {
                          if (o !== currentUserId) {
                            otherUserId = o;
                          }
                        });
                        console.log(
                          "MessagesContainer -> render -> otherUserId",
                          d,
                          otherUserId
                        );
                        const getOtherUser = this.getUser(otherUserId);
                        if (d.id === selectedChatRooms.id)
                          selectedOtherUser = getOtherUser;
                        if (
                          !String(d.name || getOtherUser?.fullname).includes(
                            search.trim()
                          )
                        )
                          return false;

                        return (
                          <div
                            className={`message-item pl-3 pr-3 p-1 pt-2 pb-2 ${
                              d.id === selectedChatRooms.id && "active"
                            }`}
                          >
                            <img
                              src={
                                (isGroup ? d.profile : getOtherUser.profile) ||
                                "https://pixinvent.com/materialize-material-design-admin-template/app-assets/images/user/12.jpg"
                              }
                              alt=""
                              className={`img-fluid img-circle ${
                                !isGroup &&
                                getOtherUser?.isStory &&
                                "story-border"
                              }`}
                              onClick={(e) =>
                                !isGroup &&
                                getOtherUser?.isStory &&
                                this.setState({ storyOpen: getOtherUser })
                              }
                            />
                            <div
                              onClick={(e) =>
                                this.setState({
                                  selectedChatRooms: d,
                                  isShownPeople: true,
                                })
                              }
                            >
                              <div>
                                <h6 className="text-white">
                                  {String(
                                    isGroup ? d.name : getOtherUser.fullname
                                  ).length > 15
                                    ? String(
                                        isGroup ? d.name : getOtherUser.fullname
                                      )
                                        .slice(0, 15)
                                        .concat("...")
                                    : String(
                                        isGroup ? d.name : getOtherUser.fullname
                                      )}
                                </h6>
                                <p className="text-white">
                                  {d.lastMessage &&
                                    getDay(d.lastMessage.createdAt)}
                                </p>
                              </div>
                              <div>
                                <p className="text-white">
                                  {d.lastMessage?.type === "image"
                                    ? "(image)"
                                    : d.lastMessage?.type === "gif"
                                    ? "(gif)"
                                    : d.lastMessage &&
                                      (String(d.lastMessage.message).length > 15
                                        ? String(d.lastMessage.message)
                                            .slice(0, 15)
                                            .concat("...")
                                        : String(d.lastMessage.message))}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              )}
            </div>
            <div
              className={`col-12 col-sm-12 col-md-7 col-lg-8 m-0 right-container d-block ${
                !isShownPeople && "hide-sm"
              }`}
            >
              <MessagesCenter
                selected={selectedChatRooms.id}
                otherUser={selectedOtherUser}
                group={!!selectedChatRooms.name && selectedChatRooms}
                selectedChatRoom={selectedChatRooms}
                allUsers={allUser}
                handleChangeShowPeople={(value) =>
                  this.setState({ isShownPeople: value })
                }
              />
            </div>
          </div>
        </div>
        <FriendList
          open={createEventModal}
          handleClose={() => this.setCreateEventModal(false)}
          handleSubmit={() => null}
          data={users}
        />
        <GetStory
          open={storyOpen}
          setOpen={(e) => this.setState({ storyOpen: e })}
          userId={storyOpen?.id}
        />
      </div>
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
export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(MessagesContainer));
