import SocketIoClient from "socket.io-client";
import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WS_Server = "http://localhost:3000";

export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server);

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }: Props) => {

  const navigate = useNavigate()


  // The moment our clients collects the Room created events from the server , it will redirect the user to the room with the roomID 
  useEffect(() => {


    const EnterRoom = ({roomID}: {roomID:string}) => {
      console.log("Room Created" , roomID);
      navigate(`/room/${roomID}`)
    }

    socket.on("room-created" , EnterRoom)
  }, []) 

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
