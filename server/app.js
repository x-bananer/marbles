const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const m = (name, id) => ({name, id});

io.on('connection', socket => {
	socket.on('userJoined', (data, cb) => {
		if(!data.name)return cb('Поле "Имя" обязательно для заполнения');
		if(!data.room) return cb('Поле "Комната" обязательно для заполнения');
		socket.join(data.room)
		cb({userId: socket.id});
		socket.broadcast.to(data.room).emit('newUser', m(data.name));
	})
})

module.exports = {
	app,
	server,
}
