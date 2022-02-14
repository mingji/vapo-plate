import React, { useState } from "react";
import { Header, Footer, Sidebar } from "..";
import AdsListing from "../AdsListing";

const Layout = (props) => {
  const withoutHeaderAndFooter = props.withoutHeaderAndFooter;
  const [isShown, setShown] = useState(false);
  const [isSmall, setSetSmall] = useState(false);
  const schema = (
    <React.Fragment>
      {!withoutHeaderAndFooter && (
        <Header isShown={isShown} isSmall={isSmall} setShown={setShown} />
      )}
      <div className="container-fluid layout">
        <div className="row">
          {!props.withoutSidebar && (
            <Sidebar
              isSmall={isSmall}
              setSetSmall={setSetSmall}
              isShown={isShown}
              setShown={setShown}
            />
          )}
          <div
            className={`col-12  col-sm-12 ${
              !props.withoutSidebar &&
              `col-md-${
                !isSmall
                  ? props.withAds
                    ? "7"
                    : "9"
                  : props.withAds
                  ? "8"
                  : "10"
              } custom-layout-main-section col-lg-${
                !isSmall
                  ? props.withAds
                    ? "8"
                    : "10"
                  : props.withAds
                  ? "9"
                  : "11"
              }`
            } pt-sm-5 pt-2 pt-md-2 ${
              props.withoutPadding && "p-0 pt-0 pb-0 pl-0 pr-0"
            }`}
          >
            {props.children}
          </div>
          {props.withAds && !isSmall && (
            <div className="col-md-2 col-lg-2 hide-sm adsListing-container overflow-y-hidden-bar">
              <AdsListing />
            </div>
          )}
        </div>
      </div>
      {/* {!withoutHeaderAndFooter && <Footer />} */}
    </React.Fragment>
  );
  return (
    <div>
      <div>{schema}</div>
    </div>
  );
};

export default Layout;
