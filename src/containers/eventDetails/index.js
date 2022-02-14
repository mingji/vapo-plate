import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Share } from "../../components";
import "./style.scss";
import CountUp from "react-countup";
import { Database } from "../../services/firebase";
import moment from "moment";
import { connect } from "react-redux";
class EventDetailsContainer extends Component {
  state = {
    data: {},
    relatedData: [],
    showShareModal: false,
    users: [],
    chatroom: { members: [] },
    viewAll: false,
  };

  componentDidMount() {
    const {
      user,
      match: {
        params: { id },
      },
    } = this.props;
    if (id) this.getData(id);
    this.getAllUsers();
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      user,
      match: {
        params: { id },
      },
    } = this.props;
    if (id !== prevProps.match.params.id) {
      this.setState({ data: {} });
      this.getData(id);
    }
  }

  getAllUsers = async () => {
    try {
      const allUser = await Database.collection("users").get();
      const data = [];

      allUser.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      this.setState({ users: data });
    } catch (error) {
      console.log("EventDetailsContainer -> getAllUsers -> error", error);
      // alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };
  getUser = (uid) => {
    const { users } = this.state;

    return users.find((d) => d.id === uid);
  };
  getData = async (id) => {
    try {
      const data = await Database.collection("events").doc(id).get();
      console.log("EventDetailsContainer -> getData -> data", data.data());
      // if (!data.exists) return this.props.history.push("/404");
      this.setState({ data: data.data() }, () => this.getRelatedEvent());
      if (data.data().chatroom) {
        const chatroom = await Database.collection("chatrooms")
          .doc(data.data().chatroom)
          .get();
        const payloadChatroom = chatroom.data();
        this.setState({ chatroom: { members: [], ...payloadChatroom } });
      }
    } catch (error) {
      console.log("ProfileContainer -> getData -> error", error);
    }
  };

  getRelatedEvent = async () => {
    const { data } = this.state;
    try {
      const tempData = await Database.collection("events")
        .where("category", "==", data.category)
        .get();
      const temp = [];
      tempData.forEach((doc) => temp.push({ ...doc.data(), id: doc.id }));
      this.setState({ relatedData: temp });
    } catch (error) {
      console.log("ProfileContainer -> getData -> error", error);
    }
  };
  handleGoing = async (flag = true) => {
    try {
      const {
        user,
        match: {
          params: { id },
        },
      } = this.props;
      const { chatroom } = this.state;
      let going = this.state.data?.going || [];
      console.log("EventDetailsContainer -> handleGoing -> going", going);
      if (flag) going.push(user.uid);
      else this.props.history.push("/message/" + this.state.data.chatroom);
      await Database.collection("events").doc(id).set(
        {
          going,
        },
        { merge: true }
      );
      this.setState((pre) => ({ data: { ...pre.data, going } }));
      if (going) {
        if (chatroom) {
          const flag = chatroom.members.find((d) => d === this.props.user.uid);
          if (!flag)
            await Database.collection("chatrooms")
              .doc(this.state.data.chatroom)
              .set(
                {
                  members: [...chatroom.members, this.props.user.uid],
                },
                { merge: true }
              );
        }
        this.props.history.push("/message/" + this.state.data.chatroom);
      }
    } catch (error) {
      console.log("ProfileContainer -> getData -> error", error);
    }
  };
  render() {
    const { data, relatedData, showShareModal, chatroom, viewAll } = this.state;
    console.log(this.state);
    const { user } = this.props;
    const isGoing = data.going?.find((d) => user.uid === d);
    const allGoingWithOut = data.going?.filter((d) => user.uid !== d);
    const host = this.getUser(data.createdBy);
    const isJoinChat = chatroom?.members?.find(
      (d) => d === this.props.user.uid
    );
    const allAttending = data.going
      ? allGoingWithOut.map((d) => this.getUser(d))
      : [];
    const allAttendees = [host, ...allAttending];
    return (
      <div className="event-details-container">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h4 className="text-white text-capitalize">Events / This Event</h4>
              {host && (
                <div className="profile-container-details mt-4">
                  <Link to={`/u/${data.createdBy}`}>
                    <div
                      style={{ backgroundImage: `url(${host.profile})` }}
                      alt=""
                      srcSet=""
                    />
                    <div className="host">
                      <p className="text-white">Host by</p>
                      <p className="text-white"  style={{ fontWeight: 500 }}>{host.fullname}</p>
                    </div>
                  </Link>
                </div>
              )}
            </div>
            <div className="col-12 col-sm-12 animated fadeIn mt-2">
              <img src={data.imageURL} className="banner" />
              <div className="info-container">
                <div className="row name-container">
                  <div className="col-2">
                    <p className="text-white month-info">
                      {moment(data.startDate).format("MMM")}
                    </p>
                    <p className="text-white date-info">
                      {moment(data.startDate).format("Do")}
                      {/* <CountUp
                        end={Number(moment(data.startDate).format("DD"))}
                      /> */}
                    </p>{" "}
                  </div>
                  <div className="col-10">
                    <p className="text-white text-bold mt-2 month-info">{data.name}</p>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-2">
                    <p className="time text-white text-bold">
                      {moment(data.startTime, "HH:mm").format("h:mm A")}
                    </p>
                    {data.endTime && <p className="time text-white text-bold">
                      - {moment(data.endTime, "HH:mm").format("h:mm A")}
                    </p>
                    }
                  </div>
                  <div className="col-10">
                    <p className="liter-tone">{data.location}</p>
                  </div>
                </div>
              </div>
              <div className="share-container">
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-success mr-3 bg-primary btn-circle btn-info"
                    onClick={(e) => this.handleGoing(true)}
                  >
                    <span>{!isJoinChat ? "Join The Group" : "JOINED"}</span>
                    <img
                      src="/assets/images/turn.svg"
                      className="img-fluid"
                      alt=""
                    />
                  </button>
                  {/* <button
                    className="btn btn-success mr-4 bg-primary btn-circle"
                    onClick={(e) => this.handleGoing(!isGoing)}
                  >
                    <span>{isGoing ? "GOING" : "GO"}</span>
                    <img
                      src="/assets/images/turn.svg"
                      className="img-fluid"
                      alt=""
                    />
                  </button> */}
                </div>
                <div onClick={() => this.setState({ showShareModal: true })}>
                  <button className="btn btn-success btn-share bg-primary btn-circle btn-info">
                    <span>Share</span>
                  </button>
                </div>
              </div>
              <div className="about-container">
                <h4 className="text-white">Details</h4>
                <p className="text-white">{data.details}</p>
              </div>
              <div className="attendee-container">
                <div className="row">
                  <div className="col-6">
                    <h4 className="text-white">{`Attendees (${allAttendees.length})`}</h4>
                  </div>
                  <div
                    className="col-6 text-right viewAll cursor-pointer"
                    onClick={(e) => this.setState({ viewAll: !viewAll })}
                  >
                    {!viewAll ? "See all" : "Hide"}
                  </div>
                </div>
                <div className="row attendee-wrapper">
                  {host &&
                    allAttendees
                      .slice(0, viewAll ? allAttendees.length : 8)
                      .map((d, i) => (
                        <>
                          <div className="col-12 col-lg-3 col-md-4 attendee-item" key={i}>
                            <div className="attende-item-container">
                              <Link to={`/u/${d.id}`}>
                                <div
                                  className="profile-c-image"
                                  style={{ backgroundImage: `url(${d.profile})` }}
                                ></div>
                                <div className="host">
                                  <div className="full-name">{d.fullname}</div>
                                  <div className="host-name">
                                    {i === 0 ? "Host" : "Attendee"}
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </>
                      ))}
                </div>
              </div>
              <div className="map-container mb-4">
                <iframe src="https://maps.google.com/maps?q=university%20of%20san%20francisco&t=&z=13&ie=UTF8&iwloc=&output=embed"></iframe>
                <div className="map-wrapper">
                  <span>{data.name}</span>
                  <span className="at">at</span>
                  <span>{data.location}</span>
                </div>
              </div>
            </div>
            <div
              className="col-12 mt-4 animated fadeIn"
              style={{ animationDelay: "0.3s" }}
            >
              <h4 className="text-white">What the next...</h4>
              {relatedData.map((d, i) => (
                <Link to={`/event/${d.id}`} key={i}>
                  <div className="bottom-item-event">
                    <div
                      className="col-12 col-md-4 image-container"
                    >
                      <img src={d.imageURL} />
                    </div>
                    <div className="col-12 col-md-6 info-container">
                      <p className="date">
                        {moment(d.startDate).format("MMM Do")}{" "}
                        {moment(d.startTime, "HH:mm").format("h:mm A")}
                      </p>
                      <p className="title text-capitalize">
                        {d.name}
                      </p>
                      <p className="area text-capitalize">
                        {d.location}
                      </p>
                      <div>
                      <button
                        className="btn-join-group"
                        onClick={(e) => this.handleGoing(true)}
                      >
                        <span>{!isJoinChat ? "Join The Group" : "JOINED"}</span>
                      </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Share
          open={showShareModal}
          handleClose={() => this.setState({ showShareModal: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ user: state.User.data });
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailsContainer);
