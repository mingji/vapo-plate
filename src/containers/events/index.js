import React, { Component } from "react";
import { Event } from "../../components";
import { Database } from "../../services/firebase";
import user from "../../store/actions/user";
import { connect } from "react-redux";

class EventsContainer extends Component {
  state = { data: [] };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      const data = [];
      const favorites = this.props.user.favorites || [];
      console.log("FeedContainer -> getData -> favorites", favorites);
      for (const uid of favorites) {
        const snap = await Database.collection("events").doc(uid).get();
        data.push({ ...snap.data(), id: snap.id });
      }
      this.setState({ data });
    } catch (error) {
      console.log("ProfileContainer -> getData -> error", error);
    }
  };
  componentWillUnmount() {
    if (this.lister) this.lister();
  }

  render() {
    const { data } = this.state;
    console.log("EventsContainer -> render -> data", data);
    return (
      <div className="event-details-container">
        <div className="container-fluid">
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
export default connect(mapStateToProps, mapDispatchToProps)(EventsContainer);
