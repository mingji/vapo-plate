import React, { Component } from "react";
import { Event } from "../../components";
import { Database } from "../../services/firebase";

class HomeContainer extends Component {
  state = { data: [] };

  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    try {
      this.lister = await Database.collection("events").onSnapshot((snap) => {
        const data = [];
        snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
        this.setState({ data });
      });
    } catch (error) {
      console.log("HomeContainer -> getData -> error", error);
    }
  };
  componentWillUnmount() {
    if (this.lister) this.lister();
  }

  render() {
    const { data } = this.state;
    console.log("HomeContainer -> render -> data", data);
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
                  className="col-12 col-md-4 col-sm-6 col-lg-4 col-md-6 mb-4  animated fadeInUp"
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

export default HomeContainer;
