const socketIo = require('socket.io')
const usermodel = require('./Models/User_model')
const captainmodel = require('./Models/Captain_model')

let io;

function intializeSocket(server) {

    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {

            const { userId, userType } = data;

            if (userType === 'user') {
                await usermodel.findByIdAndUpdate(userId, { socketId: socket.id })
            }else if(userType === 'captain'){
                await captainmodel.findByIdAndUpdate(userId, { socketId: socket.id })
            }
        })

        socket.on('disconnect', () => {
            console.log(`Client disconnected:  ${socket.id}`);

        })

    })
}

function sendMessageToSocketId(socketId, message) {
    if (io) {

        io.to(socketId).emit('message', message);
    } else {
        console.log('Socket.io is not initialized');

    }
}

module.exports = { intializeSocket, sendMessageToSocketId }