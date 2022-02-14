import React, { Component } from "react";
import "./style.scss";
import {
  Event,
  UpdateProfile,
  PostModal,
  Post,
  Group,
} from "../../components";
import { Database, TimeStamp, TimeStampNow } from "../../services/firebase";
import { connect } from "react-redux";
import user from "../../store/actions/user";
import uploadImage from "../../services/uploadInage";
import {
  CircularProgress,
  Tabs,
  Tab,
} from "@material-ui/core";
import { toast } from "react-toastify";
import StoryModal from "../../components/storiesModal";
import FollowersModal from "../../components/followers";
import { generateKeywords } from "../../common/generateKeywords";
import AddStoryModal from "../../components/addStory";

class ProfileContainer extends Component {
  state = {
    showUpdateModal: false,
    data: {},
    events: [],
    followers: [],
    users: [],
    showStoryModal: false,
    showPostModal: false,
    isLoading: false,
    storyLoading: false,
    chatrooms: [],
    showStoriesModal: false,
    stories: [],
    followersModal: false,
    followersModalType: "",
    posts: [],
    activeTab: "events",
    otherChatrooms: [],
  };
  componentDidMount() {
    const {
      user,
      match: {
        params: { username },
      },
    } = this.props;
    if (username === user.uid) this.props.history.push("/profile");
    if (username) this.getData(username);
    this.getDataEvents(username || user.uid);
    this.getDataPost(username || user.uid);
    this.getAllFollowers(username || user.uid);
    this.getAllStories(username || user.uid);
    this.getAllUsers();
    this.getAllCurrentChatrooms(username || user.uid);
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      user,
      match: {
        params: { username },
      },
    } = this.props;
    const {
      match: {
        params: { username: usernamePrev },
      },
    } = prevProps;
    if (username !== usernamePrev) {
      if (username === user.uid) this.props.history.push("/profile");
      if (username) this.getData(username);
      this.getDataEvents(username || user.uid);
      this.getDataPost(username || user.uid);
      this.getAllFollowers(username || user.uid);
      this.getAllStories(username || user.uid);
      this.getAllUsers();
      this.getAllCurrentChatrooms(username || user.uid);
    }
  }
  componentWillUnmount() {
    if (this.lister) this.lister();
    if (this.listerPosts) this.listerPosts();
    if (this.stories) this.stories();
  }
  _handleShowUpdateModal = () => this.setState({ showUpdateModal: true });
  getAllChatrooms = async () => {
    try {
      console.log(
        "ProfileContainer -> getAllChatrooms -> this.props.user.uid",
        this.props.user.uid
      );
      if (!this.props.user.uid) return;
      this.chatrooms = await Database.collection("chatrooms")
        .where("members", "array-contains", this.props.user.uid)
        .get()
        .then((snap) => {
          const data = [];
          snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
          console.log("ProfileContainer -> getAllChatrooms -> chatrooms", data);
          this.setState({ chatrooms: data });
        });
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };
  getAllCurrentChatrooms = async (id) => {
    try {
      this.chatrooms = await Database.collection("chatrooms")
        .where("members", "array-contains", id)
        .get()
        .then((snap) => {
          const data = [];
          snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
          this.setState({ otherChatrooms: data.filter((d) => d.name) });
        });
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };
  handleSubmit = async (values, setSubmitting) => {
    try {
      this.setState({ isLoading: true });
      let flag = false;
      const userWithUsername = await Database.collection("users")
        .where("username", "==", String(values.username).trim())
        .get();
      userWithUsername.forEach((doc) => {
        flag = doc.id !== values.uid;
      });
      if (!flag) {
        const payload = {
          email: String(values.email).trim(),
          fullname: String(values.fullname).trim(),
          info: String(values.info).trim(),
          username: String(values.username).trim(),
          keywords: generateKeywords(String(values.fullname).toLowerCase()),
        };
        if (values.profile) {
          payload.profile = await uploadImage(values.profile, "profile");
        }

        if (values.banner) {
          payload.banner = await uploadImage(values.banner, "banner");
        }
        await Database.collection("users")
          .doc(values.uid)
          .set(payload, { merge: true });

        this.props.storeUserUpdate(payload);
        this.setState({ showUpdateModal: false });
        this.setState({ isLoading: false });
      } else {
        toast.error("Username Already Taken");
        this.setState({ isLoading: false });
      }
    } catch (error) {
      alert(error.message);
      this.setState({ isLoading: false });
      console.log("RegisterContainer -> error", error);
    }
  };
  handleSubmitPostModal = async (values, setSubmitting) => {
    console.log("ProfileContainer -> handleSubmitPostModal -> values", values);
    try {
      setSubmitting(true);
      const payload = {
        ...values,
        createdAt: new Date().toISOString(),
      };
      if (values.image) {
        payload.image = await uploadImage(values.image, "image");
      }
      await Database.collection("posts").doc().set(payload, { merge: true });
      this.props.storeUserUpdate(payload);
      this.setState({ showPostModal: false });
      setSubmitting(false);
      toast.success("Successfully Submitted", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      alert(error.message);
      this.setState({ isLoading: false });
      console.log("RegisterContainer -> error", error);
    }
  };
  getData = async (id) => {
    try {
      this.setState({ isLoading: true });
      const data = await Database.collection("users").doc(id).get();
      console.log("ProfileContainer -> getData -> id", id);
      if (!data.exists) return this.props.history.push("/404");
      this.setState({ data: { ...data.data(), uid: data.id } });
      this.getAllChatrooms();
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
      console.log("ProfileContainer -> getData -> error", error);
    }
  };

  getDataEvents = async (id) => {
    try {
      this.lister = await Database.collection("events")
        .where("createdBy", "==", id)
        .onSnapshot((snap) => {
          const data = [];
          snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
          this.setState({ events: data });
        });
    } catch (error) {
      console.log("HomeContainer -> getData -> error", error);
    }
  };
  getDataPost = async (id) => {
    try {
      this.listerPosts = await Database.collection("posts")
        .where("createdBy", "==", id)
        .onSnapshot((snap) => {
          const data = [];
          snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
          this.setState({
            posts: data.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            ),
          });
        });
    } catch (error) {
      console.log("HomeContainer -> getData -> error", error);
    }
  };
  getAllFollowers = async (id) => {
    console.log("ProfileContainer -> getAllFollowers -> id", id);
    try {
      const tempData = [];
      const data = await Database.collection("followers")
        .where("followBy", "==", id)
        .get();
      data.forEach((doc) => tempData.push({ ...doc.data(), id: doc.id }));
      const data2 = await Database.collection("followers")
        .where("followTo", "==", id)
        .get();
      data2.forEach((doc) => tempData.push({ ...doc.data(), id: doc.id }));
      this.setState({ followers: tempData });
    } catch (error) {
      console.log("ProfileContainer -> getData -> error", error);
    }
  };
  handleFollow = async (isFollow) => {
    try {
      const { showUpdateModal, data, events, followers } = this.state;
      const {
        user,
        match: {
          params: { username },
        },
      } = this.props;
      if (!user.uid) return this.props.history.push("/login");
      const payload = {
        followBy: user.uid,
        followTo: username,
      };
      console.log("ProfileContainer -> handleFollow -> payload", payload);
      if (isFollow) {
        await Database.collection("followers").doc(isFollow.id).delete();
        const allFollowers = followers.filter((d) => d.id !== isFollow.id);
        this.setState({ followers: allFollowers });
      } else {
        await Database.collection("followers").add(payload);
        this.setState({
          followers: [...followers, { ...payload, id: "tempID" }],
        });
      }
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };
  handleAddStory = async (values, { setValues, setSubmitting }) => {
    try {
      const payload = {
        createdBy: this.props.user.uid,
        createdAt: TimeStamp(),
        seenBy: [],
      };
      setSubmitting(true);
      payload.image = await uploadImage(values.image, "profile");
      await Database.collection("story").doc().set(payload, { merge: true });
      this.setState({ showStoryModal: false, storyLoading: false });
      await Database.collection("users")
        .doc(this.props.user.uid)
        .set({ recentStory: payload }, { merge: true });
      setValues({
        image: "",
      });
      setSubmitting(false);
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };
  handleMessage = async (otherUserChat) => {
    try {
      const {
        user,
        match: {
          params: { username },
        },
      } = this.props;
      if (!user.uid) return this.props.history.push("/login");
      let chatrooms;
      if (!otherUserChat) {
        chatrooms = await Database.collection("chatrooms").add({
          createdAt: new Date(),
          createdBy: user.uid,
          members: [user.uid, username],
        });
      }
      console.log(
        "ProfileContainer -> handleMessage -> otherUserChat",
        otherUserChat
      );
      console.log("ProfileContainer -> handleMessage -> chatrooms", chatrooms);
      this.props.history.push(
        `/message/${otherUserChat ? otherUserChat.id : chatrooms.id}`
      );
    } catch (error) {
      console.log("ProfileContainer -> handleMessage -> error", error);
    }
  };
  handleImages = async (files, setFieldValue, fieldName) => {
    console.log("handleImages -> files", files);
    const payload = [];
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
      },
      (error) => {
        console.error(error);
      }
    );
  };

  getAllUsers = async () => {
    try {
      const allUser = await Database.collection("users").get();
      const data = [];

      for (const iterator of allUser.docs) {
        data.push({
          ...iterator.data(),
          id: iterator.id,
        });
      }
      this.setState({ users: data, isLoading: false });
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
  getAllStories = async (id) => {
    console.log("getAllStories -> id", id);
    try {
      const tsToMillis = TimeStampNow();
      const compareDate = new Date(tsToMillis - 24 * 60 * 60 * 1000);
      this.stories = await Database.collection("story")
        .where("createdAt", ">", compareDate)
        .where("createdBy", "==", id)
        .onSnapshot((snap) => {
          const data = [];
          snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
          this.setState({ stories: data });
        });
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };
  handleFollowerModal = (type) =>
    this.setState({
      followersModal: true,
      followersModalType: type,
    });
  render() {
    const {
      showUpdateModal,
      data,
      events,
      followers: allFollowers,
      showStoryModal,
      chatrooms,
      storyLoading,
      showStoriesModal,
      stories,
      followersModal,
      followersModalType,
      isLoading,
      showPostModal,
      posts,
      activeTab,
      otherChatrooms,
    } = this.state;
    const {
      user,
      match: {
        params: { username },
      },
    } = this.props;
    const otherUserChat = chatrooms
      .filter((d) => d.members.length === 2)
      .find((d) => d.members.find((o) => o === username));
    const userData = username ? data : user;
    const followers = allFollowers
      .filter((d) => d.followTo === userData.uid)
      .map((d) => this.getUser(d.followBy));
    const following = allFollowers
      .filter((d) => d.followBy === userData.uid)
      .map((d) => this.getUser(d.followTo));
    const isFollow = followers.find((d) => d.followBy === user.uid);
    const hasStory = !!stories.length;
    if (isLoading)
      return (
        <div className="d-flex justify-content-center messages-container p-0">
          <CircularProgress />
        </div>
      );
    return (
      <div className="profile-container">
        <div className="container">
          <div className="row">
            <div className="p-2 col-12 ">
              <div
                className="top-profile-container"
                style={{
                  backgroundImage: userData.banner
                    ? `url('${userData.banner}')`
                    : `url("https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg")`,
                }}
              ></div>
            </div>
            <div className="col-12 profile-img-container">
              <div
                className={`profile-img bg-white ${hasStory && "view-story"}`}
                style={{
                  backgroundImage: userData.profile
                    ? `url('${userData.profile}')`
                    : `url("https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png")`,
                }}
                onClick={(e) => this.setState({ showStoriesModal: true })}
              ></div>
              {!username && (
                <button
                  className="btn-custom btn"
                  onClick={this._handleShowUpdateModal}
                >
                  Edit Profile
                </button>
              )}
              {!username && (
                <button
                  className="btn-custom btn ml-2"
                  onClick={(e) => this.setState({ showStoryModal: true })}
                >
                  Add Story
                </button>
              )}
              {/* {!username && (
                <button
                  className="btn-custom btn ml-2"
                  onClick={(e) => this.setState({ showPostModal: true })}
                >
                  Add Post
                </button>
              )} */}
              {username && (
                <button
                  className="btn-custom btn ml-2"
                  onClick={() => this.handleFollow(isFollow)}
                >
                  {!isFollow ? "Follow" : "Un Follow"}
                </button>
              )}
              {username && (
                <button
                  className="btn-custom btn ml-2"
                  onClick={() => this.handleMessage(otherUserChat)}
                >
                  Message
                </button>
              )}
            </div>
            <div className="col-12 name-container pb-2">
              <h4 className="text-capitalize text-white">
                {userData.fullname}
              </h4>
              <p className="username text-white">
                @{userData.username || "NOT SET"}
              </p>
              <p className="overview text-white">
                {userData.info || "NOT SET"}
              </p>
              <div className="followers">
                <p
                  className="text-white"
                  onClick={(e) => this.handleFollowerModal("followers")}
                >
                  <b>{followers.length}</b> Followers
                </p>
                <p
                  className="text-white"
                  onClick={(e) => this.handleFollowerModal("following")}
                >
                  <b>{following.length}</b> Following
                </p>
              </div>
            </div>
            <div className="col-12 post-container p-0 pb-2">
              {!username && <PostModal />}
            </div>
            <div className="col-12 p-0">
              <Tabs
                value={activeTab}
                onChange={(e, value) => this.setState({ activeTab: value })}
                classes={{ root: "tab-fix-border" }}
              >
                <Tab label="Events" id="events" value="events" />
                <Tab label="Posts" id="posts" value="posts" />
                <Tab label="Groups" id="groups" value="groups" />
              </Tabs>
            </div>
            {activeTab === "events" && (
              <>
                {!events.length ? (
                  <div
                    className="w-100 d-flex justify-content-center align-items-center"
                    style={{ minHeight: "70vh" }}
                  >
                    <p className="text-white">No Events Found</p>
                  </div>
                ) : (
                  events.map((d, i) => (
                    <div
                      className="col-12 col-md-4 col-sm-6 col-lg-3 col-md-6 mb-4  animated fadeInUp"
                      style={{ animationDelay: i / 10 + "s" }}
                    >
                      <Event data={d} />
                    </div>
                  ))
                )}
              </>
            )}
            {activeTab === "posts" && (
              <>
                {!posts.length ? (
                  <div
                    className="w-100 d-flex justify-content-center align-items-center"
                    style={{ minHeight: "70vh" }}
                  >
                    <p className="text-white">No Posts Found</p>
                  </div>
                ) : (
                  posts.map((d, i) => (
                    <div
                      className="col-12 animated fadeInUp"
                      style={{ animationDelay: i / 10 + "s" }}
                    >
                      <Post data={d} user={userData} />
                    </div>
                  ))
                )}
              </>
            )}
            {activeTab === "groups" && (
              <>
                {!posts.length ? (
                  <div
                    className="w-100 d-flex justify-content-center align-items-center"
                    style={{ minHeight: "70vh" }}
                  >
                    <p className="text-white">No Group Found</p>
                  </div>
                ) : (
                  otherChatrooms.map((d, i) => (
                    <div
                      className="col-12 animated fadeInUp"
                      style={{ animationDelay: i / 10 + "s" }}
                    >
                      <Group data={d} />
                    </div>
                  ))
                )}
              </>
            )}
          </div>
        </div>
        <UpdateProfile
          open={showUpdateModal}
          handleClose={() => this.setState({ showUpdateModal: false })}
          handleSubmit={this.handleSubmit}
          isLoading={this.state.isLoading}
        />
        <AddStoryModal
          open={showStoryModal}
          onClose={(e) => this.setState({ showStoryModal: false })}
          onSubmit={this.handleAddStory}
        />
        <StoryModal
          open={showStoriesModal}
          onClose={(e) => this.setState({ showStoriesModal: false })}
          data={stories}
          isMine={!username}
          currentUser={this.props.user}
        />
        <FollowersModal
          open={followersModal}
          onClose={(e) => this.setState({ followersModal: false })}
          data={followersModalType === "followers" ? followers : following}
          title={followersModalType}
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
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
