import React from 'react'
import CreateRoom from '../Components/CreateRoom'

const Home: React.FC = () => {
  return (
    <div className='h-[100vh] flex items-center justify-center p-3'>
      <CreateRoom />
    </div>
  )
}

export default Home
