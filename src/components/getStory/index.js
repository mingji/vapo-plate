import React, { useState, useEffect } from "react";
import StoryModal from "../storiesModal";
import { useSelector } from "react-redux";
import { TimeStampNow, Database } from "../../services/firebase";
const GetStory = (props) => {
  const [isLoading, setLoading] = useState(true);
  const { open, setOpen } = props;
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.User.data);

  const getAllStories = async (id) => {
    try {
      if (!id || !open) return;
      setLoading(true);
      const tsToMillis = TimeStampNow();
      const compareDate = new Date(tsToMillis - 24 * 60 * 60 * 1000);
      await Database.collection("story")
        .where("createdAt", ">", compareDate)
        .where("createdBy", "==", id)
        .get()
        .then((snap) => {
          const data = [];
          snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
          setData(data);
          setLoading(false);
        });
    } catch (error) {
      alert(error.message);
      console.log("RegisterContainer -> error", error);
    }
  };
  useEffect(() => {
    getAllStories(props.userId);
  }, [open]);
  return (
    <StoryModal
      open={!!open}
      onClose={(e) => setOpen(false)}
      data={data}
      isMine={props.isMine}
      currentUser={user}
      isLoading={isLoading}
      title={open && open.fullname}
    />
  );
};

export default GetStory;
