const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('IO Connected');

  socket.emit('newUser', {
    name: 'User 1'
  })
})

module.exports = {
  app,
  server
}
