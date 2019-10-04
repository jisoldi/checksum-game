import express from "express";

import * as socketio from "socket.io";
import * as path from "path";
import * as bodyParser from "body-parser";
import * as cors from "cors";
const app = express();

app.set("port", process.env.PORT || 3000);

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
    res.sendFile(path.resolve("./client/index.html"));
});

app.post("/blockSelected",(req: any, res: any) => {
    io.emit("blockSelected",req.body);
    res.send("OK");

})

app.get("/reset",(req: any, res: any) => {
    io.emit("reset");
    res.send("OK");
})

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function(socket: any) {
    console.log("a user connected");
});

const server = http.listen(3000, function() {
    console.log("listening on *:3000");
});
