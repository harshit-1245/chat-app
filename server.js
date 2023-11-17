const express = require('express');
const { createServer } = require('node:http');
const colors=require('colors')
const  path  = require('path');
const { Server } = require('socket.io');
require('dotenv').config();
const app = express();
const server = createServer(app);
const io = new Server(server);
const PORT=process.env.PORT;
app.use(express.static(path.resolve('./public')))

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  socket.on('message',(message)=>{  //recieving mesg of frontend
    io.emit('message',message);     //sending to the client,sbko baat do
  })
});

server.listen(PORT, () => {
  console.log(`Server live at ${PORT}`.yellow);
});