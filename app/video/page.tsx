'use client';
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {useRouter} from 'next/navigation';
import styles from "@/styles/lobby.module.css";

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
    <div className= {styles.mainBox}>
    <div className= {styles.heading}>
        <h1> Wylight Technology</h1>
    </div>

        
     <div className= {styles.box}>

        <input className = {styles.inputContainer} placeholder='Enter the Room ID' value = {roomId} onChange={(e) =>setRoomId(e?.target?.value)}/>  

        <button  className = {styles.buttons}onClick= {joinRoom}>
            Join Room
        </button>
        <span>Or</span>  
        <button className = {styles.buttons} onClick={createRoom}>
            Create Meeting
        </button>

        
        
     
     
    </div>
    </div>
  )
}

export default video


function useEffect(arg0: () => void, arg1: string[]) {
    throw new Error('Function not implemented.');
}
// if some error pops un in uuidv4 just download the type definition.
// npm install --save-dev @types/uuid