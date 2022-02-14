import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// import DateFnsUtils from "@date-io/date-fns"; // import
import MomentUtils from "@date-io/moment";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { store } from "./store";
import Router from "./routers";
import "animate.css/animate.min.css";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// use default theme
// const theme = createMuiTheme();

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#DC1C59",
    },
  },
});
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <div className="app">
              <div className="bg-absolute">
                <header></header>
                <section>
                  <div className="left"></div>
                  <div className="right"></div>
                </section>
              </div>
              <Router />
              <ToastContainer />
            </div>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
