import React, { useState } from "react";
import "./style.scss";
import moment from "moment";
import { Link } from "react-router-dom";
import Share from "../share";
import { Database } from "../../services/firebase";
import { useSelector, useDispatch } from "react-redux";
import { User } from "../../store/actions";
import { Button, CircularProgress } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const Event = (props) => {
  const { data } = props;
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.User.data);
  const dispatch = useDispatch();
  const handleAddFav = async () => {
    try {
      setLoading(true);

      let favorites = user.favorites || [];
      const flag = favorites.find((d) => d === data.id);
      console.log("handleAddFav -> flag", flag);
      if (!flag) favorites.push(data.id);
      else favorites = favorites.filter((d) => d !== data.id);
      await Database.collection("users")
        .doc(user.uid)
        .set({ favorites }, { merge: true });
      dispatch(User.StoreUserUpdate({ favorites }));
      setLoading(false);
    } catch (error) {
      console.log("handleAddFav -> error", error);
    }
  };
  const handleGoing = async () => {
    setLoading(true);
    try {
      let going = data.going || [];
      console.log("handleGoing -> going", going);
      const flag = going.find((d) => d === user.uid);
      if (!flag) going.push(user.uid);
      else props.history.push("/message/" + data.chatroom);
      await Database.collection("events").doc(data.id).set(
        {
          going,
        },
        { merge: true }
      );
      console.log("handleGoing -> data.chatroom", data);
      if (going && going.length) {
        if (data.chatroom) {
          let flagFromChatRoomFromFireStore = await Database.collection(
            "chatrooms"
          )
            .doc(data.chatroom)
            .get();
          console.log(
            "handleGoing -> flagFromChatRoomFromFireStore",
            flagFromChatRoomFromFireStore.data()
          );
          let flagFromChatRoom = flagFromChatRoomFromFireStore.data();
          const flagChatRoomExist = flagFromChatRoom?.members?.find(
            (d) => d === user.uid
          );
          console.log("handleGoing -> flagChatRoomExist", flagChatRoomExist);
          console.log(
            "handleGoing -> flagFromChatRoom.members",
            flagFromChatRoom
          );
          const members = flagFromChatRoom.members
            ? [...flagFromChatRoom.members, user.uid]
            : [user.uid];
          console.log("handleGoing -> members", members);
          if (!flagChatRoomExist)
            await Database.collection("chatrooms").doc(data.chatroom).set(
              {
                members,
              },
              { merge: true }
            );
        }
        props.history.push("/message/" + data.chatroom);
      }
      setLoading(false);
    } catch (error) {
      console.log("ProfileContainer -> getData -> error", error);
    }
  };
  return (
    <div className="event-container mt-2">
      <div
        className="top-container"
        style={{ backgroundImage: `url('${data.imageURL}')` }}
      >
        <Link to={`/event/${data.id}`} className="c-link"></Link>
        <div className="action-button">
          <div onClick={handleAddFav}>
            <img src="/assets/images/fav.png" className="img-fluid" alt="" />
          </div>
          <div onClick={() => setShowShareModal(true)}>
            <img src="/assets/images/share.png" className="img-fluid" alg="share" />
          </div>
        </div>
        {/* <div className="tag-container">
            <div className="tag-free tag">
              <p>Free</p>
            </div>
          </div> */}
      </div>
      <div className="bottom-container row">
        <div className="col-6 m-0 pr-0">
          <p className="date text-bold">
            {moment(data.startDate).format("MMM")}
          </p>

          <p className="date m-0 text-bold">
            {moment(data.startDate).format("Do")}
          </p>

          <p className="date m-0">{data.startTime}</p>
        </div>
        <div className="col-6">
          <p className="title text-white text-capitalize">
            {String(data.name).slice(0, 20)}
          </p>
          <p className="area text-white text-capitalize">
            {String(data.location).slice(0, 20)}
          </p>
        </div>
        <div className="col-12">
          <Button
            variant="contained"
            color="primary"
            className="mt-2"
            style={{ zIndex: 1000 }}
            onClick={handleGoing}
          >
            {loading ? (
              <CircularProgress classes={{ root: "text-white" }} />
            ) : (
              "Attend"
            )}
          </Button>
        </div>
        <Link to={`/event/${data.id}`} className="c-link"></Link>
      </div>
      <Share
        open={showShareModal}
        handleClose={() => setShowShareModal(false)}
      />
    </div>
  );
};

export default withRouter(Event);
