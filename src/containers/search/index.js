import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Event } from "../../components";
import { Database } from "../../services/firebase";
import "./style.scss";
class SearchContainer extends Component {
  state = { data: [], users: [] };

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    this.getDataEvents();
    this.getDataProfile();
  };
  getDataEvents = async () => {
    try {
      const {
        match: {
          params: { search },
        },
      } = this.props;
      console.log("SearchContainer -> getDataEvents -> this.props", this.props);
      await Database.collection("events")
        .where(
          "keywords",
          "array-contains-any",
          String(search).toLocaleLowerCase().split(" ")
        )
        .onSnapshot((snap) => {
          const data = [];
          snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
          this.setState({ data });
          console.log("SearchContainer -> getDataEvents -> data", data);
        });
    } catch (error) {
      console.log("HomeContainer -> getDataEvents -> error", error);
    }
  };
  getDataProfile = async () => {
    try {
      const {
        match: {
          params: { search },
        },
      } = this.props;
      console.log("SearchContainer -> getDataEvents -> this.props", this.props);
      await Database.collection("users")
        .where(
          "keywords",
          "array-contains-any",
          String(search).toLocaleLowerCase().split(" ")
        )
        .onSnapshot((snap) => {
          const data = [];
          snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
          this.setState({ users: data });
          console.log("SearchContainer -> getDataEvents -> data", data);
        });
    } catch (error) {
      console.log("HomeContainer -> getDataEvents -> error", error);
    }
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.search !== this.props.match.params.search) {
      this.getData();
    }
  }
  render() {
    const { data, users } = this.state;
    const {
      match: {
        params: { search },
      },
    } = this.props;
    return (
      <div className="event-details-container">
        <div className="container">
          <div className="d-flex">
            <p className="mr-2 text-white">Search Result of </p>{" "}
            <h5 className=" text-white"> "{search}"</h5>
          </div>
          <div className="row">
            {!data.length && !users.length && (
              <div
                className="w-100 d-flex justify-content-center align-items-center"
                style={{ minHeight: "70vh" }}
              >
                <p className="text-white">No Events & Users Found</p>
              </div>
            )}
            {data.map((d, i) => (
              <div
                className="col-12 col-md-4 col-sm-6 col-lg-3 col-md-6 mb-4  animated fadeInUp"
                style={{ animationDelay: i / 10 + "s" }}
              >
                <Event data={d} />
                {/* {i === 3 ? <Promotion /> : <Event />} */}
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <div className="row">
            {users.map((d, i) => (
              <div className="col-6 col-md-3">
                <div className="attende-container">
                  <Link to={`/u/${d.id}`}>
                    <div
                      className="profile-c-image"
                      style={{ backgroundImage: `url(${d.profile})` }}
                    ></div>
                    <div className="host">
                      {/* <p className="">{i === 0 ? "Host By" : "Attendee"}</p> */}
                      <p className="text-white">{d.fullname}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SearchContainer;
