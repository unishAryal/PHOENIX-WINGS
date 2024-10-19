
'use client';

import { createContext, useEffect, useState, ReactNode, useContext } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextValue {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
}

const defaultContextValue: SocketContextValue = {
  socket: null,
  setSocket: () => {},
};
export const useSocket =()=> {
    const socket = useContext(SocketContext);
    if (socket === undefined ){
        throw new Error(' socket didn"t get its value.')
    }
    return socket;
}

export const SocketContext = createContext<SocketContextValue>(defaultContextValue);

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const connection = io("http://localhost:5001");
    console.log("socket connection ", connection)
    setSocket(connection);

    connection.on('connect',()=>{
        console.log('succesfully connected to socket')
    })

    
  }, []);
//   socket?.on('connect_error', async(err) => {
//     console.log("Error establishing socket", err)
//     await fetch('server/server.js')
//   })

  return (
    <SocketContext.Provider value={ {socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};


