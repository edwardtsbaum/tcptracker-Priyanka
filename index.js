const express = require("express");
const app = express();
const server = require("http").createServer(app);
const PORT = process.env.PORT || 5000;
//cors headers io init
const io = require('socket.io')(server,{
    'cors':{
        origin: ['http://localhost:5000'],
        methods: ["GET", "POST"]
    }
}),
ch = require('child_process');;
//where we serve the style and html sheets
app.use(express.static('public'));
//socket.io functions
io.on("connection", (socket) => {
    console.log('new connection');
    socket.on('disconnected', () => {
        console.log('disconnected')
    })
})
io.sockets.on('connection', function (socket) {
    socket.on('ping', function (data) {
        var ping = ch.spawn('ping', [data]);
        ping.stdout.on("data", function (data) {
            socket.emit("pong", data.toString());
        });

    });
});
//server code
server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})

