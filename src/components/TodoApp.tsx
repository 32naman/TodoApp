import React, { useState, useEffect, useRef } from "react";
import netCalls from "../netCallsMod";
import ListSelector from "./ListSelector";
import SearchBar from "./SearchBar";
import TodoList from "./TodoList";
import InputTodo from "./InputTodo";
import ShareableLink from "./ShareableLink";
import ScreenSharing from "./ScreenSharing";
import { TreeMirrorClient } from "../tree_mirror";
import "./TodoApp.css";
import { RouteComponentProps } from "react-router-dom";

declare var gapi: any;
const PORT = 8000;
const ScreenSharePORT = 7000;
const getURL = `https://todonaman1.herokuapp.com/getdata`;
const socketURL = `ws://localhost:${ScreenSharePORT}/screenShareClient`;

export interface TodoItem {
  text: string;
  done: boolean;
  id: number;
}

export interface State {
  todos: TodoItem[];
  listNum: number;
  totalLists: number;
  searchQuery: string;
  filteredTodos: TodoItem[] | null;
  date: string;
  id_token: string | null;
  sharing: string;
}

function useScreenShareWithWebRTC(): [
  string,
  React.Dispatch<React.SetStateAction<string>>
] {
  const [sharing, setSharing] = useState<string>("off");
  const [, setSocket] = useState<WebSocket | undefined>(undefined);
  const peer = useRef<RTCPeerConnection>(null);
  const dataChannel = useRef<RTCDataChannel>(null);
  const msgs = useRef<string[]>([JSON.stringify({ clear: true })]);
  const peerConn = useRef(false);

  useEffect(() => {
    let peerDataSend = (data) => {
      if (peerConn.current === false) {
        msgs.current.push(JSON.stringify(data));
      } else {
        dataChannel.current.send(JSON.stringify(data));
      }
    };

    console.log(sharing);
    if (sharing === "off") {
      console.log("Entering off");
      // if(shareSocket !== undefined) shareSocket.close();
      // setSocket(undefined);
      setSocket((socket) => {
        if (socket !== undefined) socket.close();
        return undefined;
      });
    } else {
      let socket = new WebSocket(socketURL + `?hash=${sharing}`);
      setSocket(socket);

      let mirrorClient: any;
      let mousePos: { x: number; y: number; width: number; height: number };

      document.onmousemove = (e) => {
        let width =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth;
        let height =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight;

        mousePos = {
          x: e.pageX,
          y: e.pageY,
          width: width,
          height: height,
        };
        // socket.send(JSON.stringify(mousePos));
        peerDataSend(mousePos);
      };

      window.onscroll = () => {
        let verScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        // socket.send(JSON.stringify({ scroll: verScroll }));
        peerDataSend({ scroll: verScroll });
      };

      socket.onopen = () => {
        peerDataSend({
          base: window.location.href.match(/^(.*\/)[^/]*$/)![1],
        });
        mirrorClient = new TreeMirrorClient(
          document,
          {
            initialize: function (rootId: number, children: object[]) {
              peerDataSend({
                f: "initialize",
                args: [rootId, children],
              });
            },

            applyChanged: function (
              removed: object[],
              addedOrMoved: object[],
              attributes: object[],
              text: object[]
            ) {
              peerDataSend({
                f: "applyChanged",
                args: [removed, addedOrMoved, attributes, text],
              });
            },
          },
          null
        );
      };

      socket.onmessage = function (event) {
        let data = JSON.parse(event.data);
        console.log(data);
        if (data.type === "offer") {
          console.log("Peer Creation");
          let config = {
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
          };
          peer.current = new RTCPeerConnection(config);

          peer.current.onicecandidate = (event) => {
            if (!event || !event.candidate) {
              console.log(event.candidate);
              return;
            }
            socket.send(
              JSON.stringify({
                type: "candidate",
                value: event.candidate,
              })
            );
          };

          peer.current.onconnectionstatechange = (event) => {
            if (peer.current.connectionState === "connected") {
              console.log("Peer Connected");
            }
          };

          peer.current.setRemoteDescription(
            new RTCSessionDescription(data.value)
          );

          let sdpConstraints = {
            offerToReceiveAudio: false,
            offerToReceiveVideo: false,
          };
          peer.current.createAnswer(sdpConstraints).then((descrip) => {
            console.log("Sending Answer");
            peer.current.setLocalDescription(descrip);
            socket.send(
              JSON.stringify({
                type: "answer",
                value: descrip,
              })
            );
          }, null);

          peer.current.ondatachannel = (event) => {
            dataChannel.current = event.channel;

            dataChannel.current.onmessage = (event) => {
              console.log("Message from Agent to Client on Data Channel");
            };
            dataChannel.current.onopen = () => {
              console.log("Data Channel Opened on Client");
              peerConn.current = true;
              dataChannel.current.send(JSON.stringify(msgs.current));
            };
            dataChannel.current.onclose = () => {
              console.log("Data Channel Closed on Client");
            };
          };
        }
        if (data.type === "candidate") {
          console.log("Processing ICE");
          peer.current.addIceCandidate(new RTCIceCandidate(data.value));
        }
      };

      socket.onclose = function () {
        console.log("Screen Sharing Socket Close");
        // Maybe send a message to the other peer to close
        // peer.current.destroy();
        dataChannel.current.send(JSON.stringify({ clear: true }));
        peer.current.close();
        peer.current = null;
        mirrorClient.disconnect();
      };
    }
  }, [sharing]);

  return [sharing, setSharing];
}

function TodoApp(props: RouteComponentProps) {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [listNum, setListNum] = useState<number>(1);
  const [totalLists, setTotalLists] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  let [filteredTodos, setFilteredTodos] = useState<TodoItem[] | null>(null);
  const [date, setDate] = useState<string>(
    new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      weekday: "short",
    })
  );
  const [id_token, setID] = useState<string | null>(
    localStorage.getItem("id_token")
  );
  const [sharing, setSharing] = useScreenShareWithWebRTC();
  const state: State = {
    todos: todos,
    listNum: listNum,
    totalLists: totalLists,
    searchQuery: searchQuery,
    filteredTodos: filteredTodos,
    date: date,
    id_token: id_token,
    sharing: sharing,
  };

  let updateState = (stateData: Partial<State>) => {
    if (stateData.todos) setTodos([...stateData.todos]);
    if (stateData.listNum) setListNum(stateData.listNum);
    if (stateData.totalLists) setTotalLists(stateData.totalLists);
    if (stateData.searchQuery) setSearchQuery(stateData.searchQuery);
    if (stateData.filteredTodos !== undefined) {
      if (stateData.filteredTodos === null) setFilteredTodos(null);
      else setFilteredTodos([...stateData.filteredTodos]);
    }
    if (stateData.date) setDate(stateData.date);
    if (stateData.id_token) setID(stateData.id_token);
    if (stateData.sharing) setSharing(stateData.sharing);
  };

  useEffect(() => {
    netCalls.getJSON(
      getURL,
      1,
      (err: number | null, data: object) => {
        if (err !== null) {
          console.log("Empty");
        } else {
          setTodos(JSON.parse(data["json"]));
          setTotalLists(Number(data["listNum"]));
        }
      },
      id_token
    );

    console.log("Reached.");
    gapi.load("auth2", function () {
      gapi.auth2.init();
    });
  }, [id_token]);

  let signOutFunc = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    console.log("Sign out started");
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log("User signed out.");
      props.history.push("/login");
    });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="date">{date}</div>
        <a href="" id="signOut" onClick={signOutFunc}>
          Sign Out
        </a>
        <ListSelector
          state={state}
          updateState={updateState}
          setTodos={setTodos}
        />
        <SearchBar
          state={state}
          setFilteredTodos={setFilteredTodos}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <TodoList state={state} setTodos={setTodos} />
      <InputTodo state={state} setTodos={setTodos} />
      <ShareableLink state={state} />
      {/* <ScreenSharing sharing={sharing} setSharing={setSharing} /> */}
    </div>
  );
}

export default TodoApp;
