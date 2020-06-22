import express from "express";
import ws from "ws";
import cors from "cors";
import { Socket } from "net";
const path = require("path");
const fs = require("fs");
const url = require("url");
const { v4: uuidv4 } = require("uuid");
const PORT = 8000;
const CLIENT_ID =
  "54565130306-rtqs8i7h7ml06p4sq0tvgnk87i01dkaj.apps.googleusercontent.com";
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(CLIENT_ID);

const wss = new ws.Server({ noServer: true });

interface Messages {
  [Key: string]: (ws.Data | string)[];
}

interface Agents {
  [Key: string]: ws[];
}

interface Client {
  [Key: string]: ws | undefined;
}

interface StringToStringDict {
  [Key: string]: string;
}

interface SocketClients {
  [Key: string]: Set<ws>;
}

var messages: Messages = {};
var agents: Agents = {};
var clientShare: Client = {};
let mapTokenToLink: StringToStringDict = {};
let mapLinkToJSON: StringToStringDict = {};
const socketClients: SocketClients = {};

const app = express();
const server = app.listen(PORT, () =>
  console.log(`Server running on Port ${PORT}`)
);

server.on("upgrade", function upgrade(
  request: express.Request,
  socket: Socket,
  head: Buffer
) {
  console.log("Web Socket");
  let reqURL = url.parse(request.url, true);
  console.log(reqURL);
  if (reqURL.pathname === "/shareSocket") {
    wss.handleUpgrade(request, socket, head, onSocketConnect);
  }
});

// Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function onSocketConnect(ws: ws) {
  // socketClients.add(ws);
  console.log("on socket connect");
  ws.on("message", function (message) {
    const parsedMessage = JSON.parse(message.toString());
    console.log(parsedMessage);
    socketClients[parsedMessage["hash"]].add(ws);
    const userTodo = mapLinkToJSON[parsedMessage["hash"]];
    console.log("message on socket");
    // ws.header('Access-Control-Allow-Origin','*');
    if (parsedMessage["json"] === undefined) {
      const pathname = path.join(__dirname, userTodo);
      fs.readFile(pathname, function (err: any, data: string) {
        if (err) {
          //TODO
        } else {
          let jsonData = JSON.parse(data);
          console.log(JSON.stringify(jsonData));
          ws.send(JSON.stringify(jsonData));
        }
      });
    }
    // else{
    //     const data = parsedMessage['json'];
    //     console.log(JSON.parse(data));
    //     fs.writeFile(userTodo, data, 'utf-8', err => {
    //         if(err){
    //             // TODO
    //             console.log("Error writing JSON file");
    //             return;
    //         }
    //         console.log("Successfully saved JSON file");
    //     })
    //     for(let client of socketClients[parsedMessage['hash']]){
    //         client.send(data);
    //     }
    // }
  });
}

// Static folder
app.use(express.static(path.join(__dirname, "public")));

app.post("/getdata", (req, res) => {
  // console.log(req.body);
  const token = req.body["id_token"];
  const listNum = req.body["listNum"];
  // res.header('Access-Control-Allow-Origin','*');
  // console.log(token);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    console.log(email);
    const userTodo = email + "_" + listNum + ".json";
    const pathname = path.join(__dirname, userTodo);
    fs.readFile(pathname, function (err: any, data: string) {
      if (err) {
        //TODO
        let empty: any = [];
        fs.writeFile(userTodo, JSON.stringify(empty), "utf-8", (err: any) => {
          if (err) {
            // TODO
            console.log("Error writing JSON file");
            return;
          }
          console.log("Successfully saved JSON file");
        });
        res.status(404).json({ msg: "Empty JSON file" });
      } else {
        var files: string[] = fs
          .readdirSync(__dirname)
          .filter((fn: string) => fn.startsWith(email));
        var postJSON = {
          listNum: files.length,
          json: JSON.stringify(JSON.parse(data)),
        };
        console.log(JSON.parse(data));
        console.log(files.length);
        res.json(postJSON);
      }
    });
  }
  verify().catch(console.error);
});

app.post("/postdata", (req, res) => {
  const token = req.body["token"];
  const data = req.body["json"];
  const listNum = req.body["listNum"];
  console.log(listNum);
  console.log(data);
  // res.header('Access-Control-Allow-Origin','*');
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    console.log(email);
    const userTodo = email + "_" + listNum + ".json";
    fs.writeFile(userTodo, data, "utf-8", (err: any) => {
      if (err) {
        // TODO
        console.log("Error writing JSON file");
        return;
      }
      console.log("Successfully saved JSON file");
    });
  }
  verify().catch(console.error);
});

app.post("/loginToken", (req, res) => {
  const token = req.body["id_token"];
  // console.log(token);
  // res.header('Access-Control-Allow-Origin','*');
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;
    console.log(email);
    res.send(name);
  }
  verify().catch(console.error);
});

// Need to make changes for multiple lists
app.post("/shareLink", (req, res) => {
  console.log("here");
  const token = req.body["id_token"];
  const listNum = req.body["listNum"];
  const PORT = 3000;
  // console.log(token);
  // res.header('Access-Control-Allow-Origin','*');
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;
    const userTodo = email + "_" + listNum + ".json";
    mapTokenToLink[token] = uuidv4();
    if (mapLinkToJSON[mapTokenToLink[token]] === undefined) {
      mapLinkToJSON[mapTokenToLink[token]] = userTodo;
    }
    let emptySet: Set<ws> = new Set();
    socketClients[mapTokenToLink[token]] = emptySet;
    const link = `http://localhost:${PORT}/share?hash=${mapTokenToLink[token]}`;
    res.send(link);
  }
  verify().catch(console.error);
});

app.post("/sharePOST", (req, res) => {
  const hash = req.body["hash"];
  const userTodo = mapLinkToJSON[hash];
  const data = req.body["json"];
  console.log(JSON.parse(data));
  console.log(socketClients[hash]);
  // res.header('Access-Control-Allow-Origin','*');
  fs.writeFile(userTodo, data, "utf-8", (err: any) => {
    if (err) {
      // TODO
      console.log("Error writing JSON file");
      return;
    }
    console.log("Successfully saved JSON file");
  });
  socketClients[hash].forEach((client) => {
    console.log(client);
    client.send(data);
  });
});
//Todo : Add support for mulitple clients using hashes
app.post("/screenShare", (req, res) => {
  let randomHash = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  // Todo : Add in Client
  console.log(randomHash);
  // clientShare[randomHash.toString()] = ;
  let emptyArr: ws[] = [];
  let emptyArr1: (string | ws.Data)[] = [];
  agents[randomHash.toString()] = emptyArr;
  messages[randomHash.toString()] = emptyArr1;
  res.send(randomHash.toString());
});
