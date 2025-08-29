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
            } else if (userType === 'captain') {
                await captainmodel.findByIdAndUpdate(userId, { socketId: socket.id })
            }
        })

        socket.on('update-location-captain', async (data) => {

            const { userId, location } = data;

            if (!location || !location.lat || !location.lng) {
                return socket.emit('error', { message: "Invalid Location" })
            }

            await captainmodel.findByIdAndUpdate(userId, {
                location: {
                    type: "Point",
                    coordinates: [location.lng, location.lat]   // GeoJSON order
                }
            })
        })

        socket.on('disconnect', () => {
            console.log(`Client disconnected:  ${socket.id}`);

        })

    })
}

function sendMessageToSocketId(socketId, messageObject) {
    
    if (io) {

        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io is not initialized');

    }
}

module.exports = { intializeSocket, sendMessageToSocketId }