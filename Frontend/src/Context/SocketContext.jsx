import React, { createContext } from 'react'
import { useEffect } from 'react';
import { io } from "socket.io-client";

export const Socket = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketContext = ({ children }) => {

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to socket server');
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        })

    }, [])

    return (
        <Socket.Provider value={{ socket }}>
            {children}
        </Socket.Provider>
    )

}

export default SocketContext