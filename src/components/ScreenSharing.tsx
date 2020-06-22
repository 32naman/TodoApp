import React, { useRef } from "react";
import netCalls from "../netCallsMod";

const PORT = 8000;
const screenShareURL = `http://localhost:${PORT}/screenShare`;
// const socketURL = `ws://localhost:${PORT}/screenShareClient`;

type Props = {
  sharing: string;
  setSharing: React.Dispatch<React.SetStateAction<string>>;
};

function ScreenSharing(props: Props) {
  const shareCode = useRef<HTMLParagraphElement>(null);

  let toggleScreenSharing = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    console.log("Reaching 1");
    if (props.sharing === "off") {
      console.log("Reaching 2");
      let result = Math.floor(Math.random() * (999999 - 100000)) + 100000;
      let shareURL = `http://localhost:4000/screen?hash=${result}`;
      if (shareCode.current != null)
        shareCode.current.innerHTML = `<a href="${shareURL}" target="_blank">${shareURL}</a>`;
      props.setSharing(result.toString());
    } else {
      console.log("Reaching 3");
      props.setSharing("off");
    }
  };

  return (
    <ScreenSharingUI
      toggleScreenSharing={toggleScreenSharing}
      shareCodeRef={shareCode}
    />
  );
}

type Props1 = {
  toggleScreenSharing: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void;
  shareCodeRef: React.RefObject<HTMLParagraphElement>;
};

const ScreenSharingUI = (props: Props1) => {
  const { toggleScreenSharing, shareCodeRef } = props;
  return (
    <div className="screenShareLink">
      <p id="shareCode" ref={shareCodeRef}>
        Code for Screen Sharing
      </p>
      <i
        className="fas fa-share-alt"
        id="genCode"
        onClick={toggleScreenSharing}
      ></i>
    </div>
  );
};

export default ScreenSharing;
