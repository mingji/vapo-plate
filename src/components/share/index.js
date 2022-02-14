import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon
} from "react-share";
const Share = props => {
  const { open, handleClose } = props;
  const title = "FINDFUN";
  const shareUrl = "https://find-fun-34219.firebaseapp.com/";
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Share</DialogTitle>
      <DialogContent dividers={true}>
        <div className="row">
          <div className="col-12 col-md-2">
            <FacebookShareButton
              url={shareUrl}
              quote={title}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>
          <div className="col-12 col-md-2">
            <FacebookMessengerShareButton
              url={shareUrl}
              appId="521270401588372"
              className="Demo__some-network__share-button"
            >
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>
          </div>
          <div className="col-12 col-md-2">
            <TwitterShareButton
              url={shareUrl}
              title={title}
              className="Demo__some-network__share-button"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
          <div className="col-12 col-md-2">
            <WhatsappShareButton
              url={shareUrl}
              title={title}
              separator=":: "
              className="Demo__some-network__share-button"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
          </div>
          <div className="col-12 col-md-2">
            <EmailShareButton
              url={shareUrl}
              title={title}
              separator=":: "
              className="Demo__some-network__share-button"
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Share;
