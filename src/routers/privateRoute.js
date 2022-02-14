import React from "react";
import { Redirect } from "react-router-dom";
import { Footer, Header, Layout } from "../components";
import { useSelector } from "react-redux";
import Route from "./route";
const PrivateRoute = props => {
  const isAuthorized = useSelector(state => state.User.isLogin);
  if (!isAuthorized) return <Redirect to="/" />;
  return <Route {...props} />;
};

export default PrivateRoute;
