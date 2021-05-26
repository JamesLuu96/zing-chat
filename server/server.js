const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http, { cors: {origin:'*'}})

io.on('connection', function(socket){
  socket.on("send message", function(message){
    io.emit("receive message", message)
  })
})

http.listen(4000, function(){
  console.log('listening on port 4000')
})