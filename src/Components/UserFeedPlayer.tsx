

import React, { useEffect, useRef } from 'react'

const UserFeedPlayer : React.FC<{stream?: MediaStream}> = ({stream}) => {
    // use the same type everywhere

    const videoRef = useRef<HTMLVideoElement>(null);
// HTMLVideoElement -- types 

useEffect(() => {

if(videoRef.current && stream){
    // The moment we will get the stream we will put the stream in the src object of video tag
    videoRef.current.srcObject = stream
}

}, [stream])


  return (
    // Inside the video tag we will be using the ref to get the video stream from the user
    // 1. we will collect the user data in form of stream and put the chunks of  that stream in the video chat
    // 2. 

    < video
    ref={videoRef}
    style={{width: '300px' , height: '200px'}}
    muted={true}
    autoPlay
     />
  )
}

export default UserFeedPlayer
