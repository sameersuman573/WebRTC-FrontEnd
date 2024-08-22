import React, { useContext } from 'react'
import { SocketContext } from '../Context/SocketContext'

const CreateRoom: React.FC = () => {

    //The button on cliciking need to create a new room and redirect to the room and send the roomID to the server by emitting the event create-room
    // The server will listen to the event and create a new room and send the roomID back to the client
    // After a new room is created the client will be redirected to the room with the roomID
 
    const {socket} = useContext(SocketContext);

    const CreateRoomEvent = () => {
        console.log("Initializing the room creation process" , socket);
        socket.emit("create-room");
    }

  return (
    <button  onClick={CreateRoomEvent}   className="bg-gradient-to-r from-red-500 to-yellow-500 text-white px-4 py-2 rounded">
        Start a new Meeting in a new room
    </button>
  )
}

export default CreateRoom
