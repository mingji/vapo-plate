import React, { Component } from "react";
import { connect } from "react-redux";
import Tab from "@material-ui/core/Tab";
import { Paper, Tabs } from "@material-ui/core";
import Form from "./form";
import { Database } from "../../services/firebase";
import Table from "./table";
class AdsCenter extends Component {
  state = { activeTab: "1", data: [] };
  componentDidMount() {
    if (!this.props.user.isAdmin) this.props.history.push("/404");
    this.getData();
  }
  componentWillUnmount() {
    if (this.lister) this.lister();
  }
  getData = async () => {
    try {
      this.lister = await Database.collection("announcement").onSnapshot(
        (snap) => {
          const data = [];
          snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
          this.setState({ data: data });
        }
      );
    } catch (error) {
      console.log("AdsCenter -> getData -> error", error);
    }
  };
  handleChangeTab = (event, newValue) => {
    this.setState({ activeTab: newValue });
  };
  render() {
    const { activeTab, data } = this.state;
    return (
      <div className="ads-center">
        <Paper>
          <Tabs
            value={activeTab}
            onChange={this.handleChangeTab}
            indicatorColor="primary"
            textColor="primary"
            centered
            classes={{
              centered: "bg-darker-0",
            }}
          >
            <Tab label="Announcements" value="1" />
            <Tab label="Add New Announcements" value="2" />
          </Tabs>
        </Paper>
        {activeTab === "1" && (
          <Table data={data} updateDada={(data) => this.setState({ data })} />
        )}
        {activeTab === "2" && <Form />}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({ user: state.User.data });
const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(AdsCenter);
