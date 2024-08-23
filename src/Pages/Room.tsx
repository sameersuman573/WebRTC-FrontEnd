
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SocketContext } from '../Context/SocketContext'
import UserFeedPlayer from '../Components/UserFeedPlayer'

const Room : React.FC = () => {

    const {id } = useParams()
    const {socket , user , stream} = useContext(SocketContext) // now we have user as an entity of the user in context


// NOTE -  the props shall have same name in backend as well as frontend
  const fetchParticipantsList = ({roomId , participants}: {roomId:string , participants:string }) => {
    console.log("fetched Room partipants");
    console.log(roomId , participants);  
      }


    useEffect(() => {
      // The moment the user enters the room , the user will emit the event joined-room to the server
      if(user) {
        console.log("check kar --------- New user with user ID as " , user._id , "has joined the room with room ID as " , id);
        
        socket.emit("joined-room" , {roomId: id, peerId: user._id} );
        socket.on("get-users" , fetchParticipantsList)
      } 
      

    },[user , id , socket])


    
  return (
    <div>
        
      room : {id}
      <UserFeedPlayer  stream={stream}/>
      {/* The stream object comes from context */}
      {/* The context get the stream from Browser API */}

    </div>
  )
}

export default Room 
