import React, { Component } from "react";
import { Event } from "../../components";
import { Database } from "../../services/firebase";
import user from "../../store/actions/user";
import { connect } from "react-redux";

class FeedContainer extends Component {
  state = { data: [] };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const followToUIDs = [];
      const data = [];
      const data2 = await Database.collection("followers")
        .where("followBy", "==", this.props.user.uid)
        .get();
      data2.forEach((doc) => followToUIDs.push(doc.data().followTo));
      for (const uid of followToUIDs) {
        const snap = await Database.collection("events")
          .where("createdBy", "==", uid)
          .get();
        snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
      }
      this.setState({ data });
    } catch (error) {
      console.log("ProfileContainer -> getData -> error", error);
    }
  };
  render() {
    const { data } = this.state;
    console.log("FeedContainer -> render -> data", data);
    return (
      <div className="event-details-container">
        <div className="container">
          <div className="row">
            {!data.length ? (
              <div
                className="w-100 d-flex justify-content-center align-items-center"
                style={{ minHeight: "70vh" }}
              >
                <p className="text-white">No Events Found</p>
              </div>
            ) : (
              data.map((d, i) => (
                <div
                  className="col-12 col-md-4 col-sm-6 col-lg-3 col-md-6 mb-4  animated fadeInUp"
                  style={{ animationDelay: i / 10 + "s" }}
                >
                  <Event data={d} />
                  {/* {i === 3 ? <Promotion /> : <Event />} */}
                </div>
              ))
            )}
          </div>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
