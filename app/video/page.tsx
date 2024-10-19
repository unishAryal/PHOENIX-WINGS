'use client';
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {useRouter} from 'next/navigation';

const video = () => {
    const [roomId, setRoomId] = useState('');
    const router = useRouter()
    const createRoom = () => {
        
            const randomId = uuidv4();
            console.log(`The roomId created is ${randomId}`);
            router.push(`/video/${randomId}`);
        
    };
   const joinRoom = ()=> {
    if (roomId){
        router.push(`video/${roomId}`)
    }else
    {   alert('Please provide the valid RoomId.')
        console.log('there is an error getting a roomId')}
   }
  return (
    <div>
        <h1> Wylight Technology</h1>
        <button  onClick={createRoom}>
            Create Meeting
        </button>

        <input placeholder='Enter the Room ID' value = {roomId} onChange={(e) =>setRoomId(e?.target?.value)}/>
        <button onClick= {joinRoom}>
            Join Room
        </button>
    </div>
  )
}

export default video


function useEffect(arg0: () => void, arg1: string[]) {
    throw new Error('Function not implemented.');
}
// if some error pops un in uuidv4 just download the type definition.
// npm install --save-dev @types/uuid