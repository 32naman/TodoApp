import React, { useRef } from "react";
import netCalls from "../netCallsMod";
import { State } from "./TodoApp";

// const PORT = 8000;
const shareURL = `https://todonaman1.herokuapp.com/shareLink`;

type Props = {
  state: State;
};

type PropsUI = {
  state: State;
  genShareLink: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  linkAddRef: React.RefObject<HTMLParagraphElement>;
};

const ShareableLink: React.FunctionComponent<Props> = ({ state }) => {
  const linkAdd = useRef<HTMLParagraphElement>(null);

  let genShareLink = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    netCalls
      .generateLink(shareURL, state.listNum, state.id_token)
      .then((result) => {
        if (linkAdd.current === null) return;
        linkAdd.current.innerHTML = `<a href="${result}" target="_blank">${result}</a>`;
      });
  };

  return (
    <ShareableLinkUI
      state={state}
      genShareLink={genShareLink}
      linkAddRef={linkAdd}
    />
  );
};

const ShareableLinkUI: React.FunctionComponent<PropsUI> = ({
  state,
  genShareLink,
  linkAddRef,
}) => {
  // const { state, genShareLink, linkAddRef } = props;
  return (
    <div className="shareLink">
      <p id="linkAdd" ref={linkAddRef}>
        {"Generate Link for List " + state.listNum.toString()}
      </p>
      <i className="fas fa-link" id="genLink" onClick={genShareLink}></i>
    </div>
  );
};

export default ShareableLink;
