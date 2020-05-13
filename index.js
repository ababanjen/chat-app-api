const express = require('express')
const port = 8080
const socketio = require('socket.io')
const http = require('http')
const cors = require('cors');
const app = express()
const router  = require('./config/routes');
const server = http.createServer(app)
const io = socketio(server);

const {addUser, removeUser, getUser, getUserRoom} = require('./user')
app.use(cors({
    'Access-Control-Allow-Origin': '*'
}));
io.on('connection',(socket)=>{
    socket.on('join',({name, password, room='chat'}, callback) => {
        if(name && password) {
            const {error, user} = addUser({id:socket.id, name, room, password})
            if(error) {return callback(error)}
            socket.emit('message', {user:'admin', 'text': `Hi ${user.name}, You are now connected to ${room} room`})
            socket.broadcast.to(user.room).emit('message',{...user, user:'admin', text:`${user.name} is now connected`, name:user.name})

            socket.join(user.room)
            callback()
        } else {
            callback({message:'No session. Please login'})
        }
    })

    socket.on('sendMessage',(message,callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message',{...user,user:user.name, 'text':message})
        callback()
    })
    socket.on('leave',(user, callback)=>{
        io.to('chat').emit('message', {user:'admin', text:`${user.name.charAt(0).toUpperCase()}${user.name.slice(1)} has left the conversation`, name:user.name})
        callback()
    })
    socket.leave('chat', () => {
        io.to('chat').emit(`user ${socket.id} has left the room`);
      });

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id)
        if(user) {
            io.to(user.room).emit('message', {user:'admin', text:`${user.name} has left the conversation`, name:user.name})
        }
    })
})

app.use(router)
server.listen(port, ()=> console.log(`Server start at: ${port}`))
