import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import { Link, useLocation, withRouter } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import CreateGroup from "../createGroup";
import CreateEvent from "../createEvent";
import { Database } from "../../services/firebase";

function useWindowSize() {
  const isClient = typeof window === "object";

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

const SwipeableTemporaryDrawer = (props) => {
  const size = useWindowSize();
  const [unRead, setUnRead] = useState(false);
  if ((size.width > 900 || size.width < 600) && props.isSmall) {
    props.setSetSmall(false);
  } else if (!props.isSmall && size.width < 900 && size.width > 600) {
    props.setSetSmall(true);
  }
  const [createEventModal, setCreateEventModal] = useState(false);
  const [createGroupModal, setCreateGroupModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const { isShown, setShown } = props;
  const isLogin = useSelector((state) => state.User.isLogin);
  const user = useSelector((state) => state.User.data);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogin) getAllChatRooms();
  }, [isLogin]);

  const pathname = String(useLocation().pathname);
  const getAllChatRooms = async () =>
    await Database.collection("chatrooms")
      .where("members", "array-contains", user.uid)
      .onSnapshot((snap) => {
        const data = [];
        snap.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
        let isUnReadMessage = false;
        for (let i = 0; i < data.length; i++) {
          const { lastMessage } = data[i];
          if (lastMessage?.seenBy)
            console.log(
              "SwipeableTemporaryDrawer -> lastMessage",
              lastMessage.seenBy
            );
          if (
            !lastMessage ||
            !lastMessage.seenBy ||
            !lastMessage.seenBy.length
          ) {
          } else {
            isUnReadMessage = !lastMessage.seenBy.find((d) => d === user.uid);
            console.log(
              "SwipeableTemporaryDrawer -> lastMessage.seenBy",
              lastMessage.seenBy
            );
            if (isUnReadMessage) break;
          }
        }
        data.find(({ lastMessage }) => {});
        console.log(
          "SwipeableTemporaryDrawer -> isUnReadMessage",
          isUnReadMessage
        );
        setUnRead(isUnReadMessage);
      });
  if (isLogin) {
  }
  const _handleLogout = () => {
    console.log("asd");
    dispatch(user.Logout());
    setShown(false);
  };

  const active =
    pathname === "/"
      ? 0
      : pathname.includes("message")
      ? 1
      : pathname.includes("feeds")
      ? 2
      : pathname.includes("create")
      ? 3
      : pathname.includes("profile")
      ? 4
      : pathname.includes("events")
      ? 5
      : pathname.includes("merch")
      ? 6
      : pathname.includes("setting")
      ? 7
      : false;
  const handleChangeRoute = (route) => {
    setShown(false);
    props.history.push(route);
  };
  const handleCreateClose = () => setCreateModal(false);
  const handleOpenEventModal = () => {
    setCreateModal(false);
    setCreateEventModal(true);
  };
  const handleOpenGroupModal = () => {
    setCreateModal(false);
    setCreateGroupModal(true);
  };
  const moveToSignIn = () => props.history.push("/login");

  return (
    <div
      className={`sidebar-container col-12 col-sm-12 col-md-3 col-lg-${
        props.isSmall ? "1 small-screen" : "2"
      } p-0 ${isShown && "open"}`}
    >
      <div>
        <div className="d-block d-md-none" onClick={() => setShown(false)}>
          <img src="/assets/images/close.png" alt="" className="close" />
        </div>
        <p className="bg-logo">
          {active === 0
            ? "FindFun"
            : active === 1
            ? "Messages"
            : active === 2
            ? "Feeds"
            : active === 3
            ? "Create"
            : active === 4
            ? "My Profile"
            : active === 5
            ? "Events"
            : active === 6
            ? "Merch"
            : "Find Fun"}
        </p>
        <Link to="/" className="logo">
          <img
            src="/assets/images/logo.png"
            className="img-fluid m-2"
            alt=""
            style={{ maxWidth: 200 }}
          />
        </Link>

        <div
          className={`icon-home ${active === 0 && "active"}`}
          onClick={(e) => handleChangeRoute("/")}
          // onClick={() => setActive("Findfun")}
        >
          <div
            style={{ backgroundImage: "url('/assets/images/home.png')" }}
            className="icon"
          />
          {!props.isSmall && <p>FindFun</p>}{" "}
        </div>

        <div
          className={`icon-message ${active === 1 && "active"}`}
          onClick={(e) =>
            !isLogin ? moveToSignIn() : handleChangeRoute("/message")
          } // onClick={() => setActive("Message's")}
        >
          <div
            style={{
              backgroundImage: "url('/assets/images/messages.png')",
            }}
            className={`icon  ${unRead && "dot"}`}
          />
          {!props.isSmall && <p>Message</p>}{" "}
        </div>

        {/* <div
          className={`icon-feed ${active === 2 && "active"}`}
          onClick={(e) =>
            !isLogin ? moveToSignIn() : handleChangeRoute("/feeds")
          }
          // onClick={() => setActive("Feed")}
        >
          <div
            style={{
              backgroundImage: "url('/assets/images/rss-feed.svg')",
            }}
            className="icon"
          />
          {!props.isSmall && <p>Feeds</p>}{" "}
        </div> */}

        <div
          className={`icon-create ${active === 3 && "active"}`}
          onClick={() => (!isLogin ? moveToSignIn() : setCreateModal(true))}
        >
          <div
            style={{ backgroundImage: "url('/assets/images/add.png')" }}
            className="icon"
          />
          {!props.isSmall && <p>Create</p>}{" "}
        </div>

        <div
          className={`icon-profile ${active === 4 && "active"}`}
          onClick={(e) =>
            !isLogin ? moveToSignIn() : handleChangeRoute("/profile")
          }
          // onClick={() => setActive("Create Profile")}
        >
          <div
            style={{ backgroundImage: "url('/assets/images/Profile.png')" }}
            className="icon"
          />
          {!props.isSmall && <p>My Profile</p>}{" "}
        </div>

        <div
          className={active === 5 && "active"}
          onClick={(e) =>
            !isLogin ? moveToSignIn() : handleChangeRoute("/events")
          } // onClick={() => setActive("Events")}
        >
          <div
            style={{ backgroundImage: "url('/assets/images/save.svg')" }}
            className="icon"
          />
          {!props.isSmall && <p>Saved</p>}{" "}
        </div>

        <div
          className={`icon-bar ${active === 6 && "active"}`}
          // onClick={() => setActive("Merch")}
		  onClick={() => window.location = 'https://shop.findfun.com'}
        >
          <div
            style={{ backgroundImage: "url('/assets/images/barcode.png')" }}
            className="icon"
          />
          {!props.isSmall && <p>Merch</p>}{" "}
        </div>
        <div
          className={`icon-setting ${active === 7 && "active"}`}
          // onClick={() => setActive("Merch")}
          onClick={(e) =>
            !isLogin ? moveToSignIn() : handleChangeRoute("/setting")
          }
        >
          <div
            style={{ backgroundImage: "url('/assets/images/settings.png')" }}
            className="icon"
          />
          {!props.isSmall && <p>Settings</p>}{" "}
        </div>

        {size.width < 600 && (
          <>
            <div
              className={`icon-setting ${active === 6 && "active"}`}
              // onClick={() => setActive("Merch")}
              // onClick={(e) => handleChangeRoute("/setting")}
            >
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
            </div>
            {!isLogin ? (
              <div
                className={`icon-setting ${active === 7 && "active"}`}
                // onClick={() => setActive("Merch")}
                onClick={(e) =>
                  !isLogin ? moveToSignIn() : handleChangeRoute("/login")
                }
              >
                <div
                  style={{
                    backgroundImage: "url('/public/assets/images/home.png')",
                  }}
                  className="icon"
                />
                {!props.isSmall && <p>Login</p>}{" "}
              </div>
            ) : (
              <div
                className={`icon-setting ${active === 7 && "active"}`}
                // onClick={() => setActive("Merch")}
                onClick={_handleLogout}
              >
                <div
                  style={{
                    backgroundImage: "url('/public/assets/images/home.png')",
                  }}
                  className="icon"
                />
                {!props.isSmall && <p>Logout</p>}{" "}
              </div>
            )}
          </>
        )}
      </div>
      {/* <i
        class={`fas fa-caret-${
          !props.isSmall ? "left" : "right"
        } mt-2 hide-sm hide-icon`}
        onClick={(e) => props.setSetSmall(!props.isSmall)}
      ></i> */}
      {!props.isSmall && (
        <div className="social-div mt-5">
          <h6>Follow us</h6>
          <div>
            <a
              href="https://www.tiktok.com/@findfunofficial?source=h5_t"
              target="_blank"
            >
              <img
                src="/assets/images/tiktok-logo.42a18187.png"
                target="_blank"
                alt="blank"
              />
            </a>
            <a href="https://www.facebook.com/Findfunofficial/">
              <img src="/assets/images/facebook.png" target="_blank" alt="facebook" />
            </a>

            <a href="https://www.instagram.com/findfun">
              <img src="/assets/images/instagram.png" target="_blank" alt="instagram" />
            </a>
            <a href="https://twitter.com/FindfunOfficial">
              <img src="/assets/images/twitter.png" target="_blank" alt="twitter" />
            </a>
          </div>
          <div className="mt-3">
            <a href="#">About us</a>
            <a href="#">Contact us</a>
            <a href="#"></a>
          </div>
          <p className="credit mt-2">Made in San Francisco</p>
        </div>
      )}

      <CreateEvent
        open={createEventModal}
        handleClose={() => setCreateEventModal(false)}
        handleSubmit={() => null}
      />

      <CreateGroup
        open={createGroupModal}
        handleClose={() => setCreateGroupModal(false)}
        handleSubmit={() => null}
      />
      <Dialog
        open={createModal}
        onClose={handleCreateClose}
        aria-labelledby="form-dialog-title"
        style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
        PaperProps={{ style: { backgroundColor: "#1f1e2e" } }}
      >
        <DialogTitle id="scroll-dialog-title" className="text-white">
          Create Event/Group
        </DialogTitle>
        <DialogContent>
          <div className="row popup-for-create">
            <div className="col-6" onClick={handleOpenEventModal}>
              <p>Create Event</p>
            </div>
            <div className="col-6" onClick={handleOpenGroupModal}>
              <p>Create Group</p>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose} color="primary">
            Close
          </Button>
        </DialogActions>{" "}
      </Dialog>
    </div>
  );
};
export default withRouter(SwipeableTemporaryDrawer);
