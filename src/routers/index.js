import React, { useEffect } from "react";
import { Switch, Redirect } from "react-router-dom";
import Route from "./route";
import {
  HomeContainer,
  LoginContainer,
  PageNotFound,
  EventDetailsContainer,
  RegisterContainer,
  ForgotPasswordContainer,
  ForgotPasswordVerifyContainer,
  CreateEventContainer,
  ProfileContainer,
  MessagesContainer,
  SearchContainer,
  FeedContainer,
  EventsContainer,
  SettingContainer,
  AdsCenterContainer,
} from "../containers";
import user from "../store/actions/user";
import { connect } from "react-redux";
import PrivateRoute from "./privateRoute";

class Router extends React.Component {
  componentWillMount() {
    const userFromLocalStorage = localStorage.getItem("user");
    if (userFromLocalStorage && userFromLocalStorage !== "undefined") {
      const a = JSON.parse(userFromLocalStorage);
      this.props.storeUserUpdate(a);
    } else {
      localStorage.removeItem("user");
    }
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" withAds component={HomeContainer} />
        <PrivateRoute exact path="/feeds" component={FeedContainer} />
        <PrivateRoute exact path="/events" component={EventsContainer} />
        <Route exact path="/search/:search" component={SearchContainer} />
        <Route
          exact
          path="/login"
          withoutHeaderAndFooter
          withoutSidebar
          component={LoginContainer}
        />
        <Route
          exact
          path="/register"
          withoutSidebar
          withoutHeaderAndFooter
          component={RegisterContainer}
        />
        <Route
          exact
          path="/forgot"
          withoutSidebar
          withoutHeaderAndFooter
          component={ForgotPasswordContainer}
        />
        <Route
          exact
          path="/verify"
          withoutSidebar
          withoutHeaderAndFooter
          component={ForgotPasswordVerifyContainer}
        />
        <Route
          exact
          path="/forgot"
          withoutSidebar
          withoutHeaderAndFooter
          component={ForgotPasswordContainer}
        />
        <Route exact path="/404" component={PageNotFound} />
        <Route exact path="/details" component={EventDetailsContainer} />
        <Route exact path="/event/:id" component={EventDetailsContainer} />
        <PrivateRoute
          exact
          withoutPadding
          path="/setting"
          component={SettingContainer}
        />
        <PrivateRoute
          exact
          path="/profile"
          withAds
          component={ProfileContainer}
        />
        <Route exact path="/u/:username" withAds component={ProfileContainer} />
        <PrivateRoute
          exact
          path="/message"
          withoutPadding
          component={MessagesContainer}
        />
        <PrivateRoute
          exact
          path="/message/:id"
          withoutPadding
          component={MessagesContainer}
        />
        <PrivateRoute
          exact
          path="/create"
          withoutSidebar
          component={CreateEventContainer}
        />
        <PrivateRoute
          exact
          path="/ads"
          withoutPadding
          component={AdsCenterContainer}
        />
        <Route exact path="/*" component={() => <Redirect to="/404" />} />
      </Switch>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    storeUserUpdate: (props) => {
      dispatch(user.StoreUserUpdate(props));
    },
  };
};
export default connect(null, mapDispatchToProps)(Router);
