import SocketIoClient from "socket.io-client";
import { createContext, useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs"
import {v4 as uuID} from "uuid"

const WS_Server = "http://localhost:3000";

export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server);

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }: Props) => {

  const navigate = useNavigate()



  // state variable to store the userID
  // peerjs - Library which is used  to initiate the Signalling connection with the Peerjs Server
  // Every used who connects to the Peer server is known as peer user
  const [user, setuser] = useState<Peer>();
  const [stream, setstream] = useState<MediaStream>()




  // This is not a react Thing , It is dedicated browser Api All together
  // STREAM BROWSER API 
  const fetchUserFeed = async() => {
const stream = await navigator.mediaDevices.getUserMedia({video:true , audio:true})
setstream(stream)
  }



  // The moment our clients collects the Room created events from the server , it will redirect the user to the room with the roomID 
  useEffect(() => {

    const userID = uuID();
    const newPeerUser = new Peer(userID , {
      host: "localhost",
      port: 9000,
      path: "/myapp",
    })
    setuser(newPeerUser)

    fetchUserFeed()

    const EnterRoom = ({roomId}: {roomId:string}) => {
      console.log("Room Created" , roomId);
      navigate(`/room/${roomId}`)
    }

    socket.on("room-created" , EnterRoom)
  }, []) 

  return (
    <SocketContext.Provider value={{ socket , user , stream  }}>
      {children}
    </SocketContext.Provider>
  );
};
