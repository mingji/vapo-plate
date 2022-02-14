import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import user from "../../store/actions/user";
import { Link, withRouter } from "react-router-dom";

const Header = (props) => {
  const { isShown, setShown } = props;
  const [search, setSearch] = useState("");
  const isLogin = useSelector((state) => state.User.isLogin);
  const isAdmin = useSelector((state) => state.User.data.isAdmin);
  const dispatch = useDispatch();
  const _handleLogout = () => dispatch(user.Logout());
  const handleSearch = () => {
    String(search).trim() &&
      props.history.push(`/search/${String(search).trim()}`);
  };
  const handleChangeURL = (url) => props.history.push(url);
  return (
    <div className="header-container container-fluid">
      <div className="row top-container">
        <div
          className={`col-12 col-sm-12 col-md-${
            props.isSmall ? "1 small-screen" : "2"
          }`}
        >
          <img
            src="/assets/images/menu.svg"
            onClick={() => setShown(true)}
            alt=""
          />
          <Link to="/" className="logo">
            <img
              src="/assets/images/logo.png"
              className="img-fluid"
              style={{ maxWidth: 150, width: "100%" }}
            />
          </Link>
          <div />
        </div>
        <div
          className={`col-12 col-sm-12 col-md-${props.isSmall ? "7" : "6"} p-0`}
        >
          <div>
            <img
              src="/assets/images/search.svg"
              className="img-fluid icon"
              alt=""
            />{" "}
            <form action="javascript:void(0)" onSubmit={handleSearch}>
              <input
                type="text"
                name=""
                id=""
                placeholder="search"
                value={search}
                className="text-white w-100"
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
            </form>
          </div>
        </div>
        <div className="col-12 col-sm-12 col-md-4">
          <form
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
            target="_top"
          >
            <input type="hidden" name="cmd" value="_s-xclick" />

            <input
              type="hidden"
              name="hosted_button_id"
              value="G53JM2MWRCLWU"
            />

            <input
              type="image"
              src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif"
              border="0"
              name="submit"
              title="PayPal - The safer, easier way to pay online!"
              alt="Donate with PayPal button"
            />

            <img
              alt=""
              border="0"
              src="https://www.paypal.com/en_US/i/scr/pixel.gif"
              width="1"
              height="1"
            />
          </form>
          {isAdmin && (
            <div onClick={(e) => handleChangeURL("/ads")}>
              <a href="javascript:void(0)" className="text-white">
                Ads Center
              </a>
            </div>
          )}
          {isLogin ? (
            <div onClick={_handleLogout}>
              <a href="javascript:void(0)" className="text-white">
                Logout
              </a>
            </div>
          ) : (
            <div>
              <Link to="/login" className="text-white">
                Login
              </Link>
            </div>
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
