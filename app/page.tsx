'use client';
import {useRouter} from 'next/navigation';



export default function Home() {
  const router = useRouter();
  function takeToLobby() {
    
    router.push('/video')
  }
 

  return(
    <div> 
      <h2> Home Page</h2>
      <button onClick={takeToLobby}> 
        Meetings
      </button>
    </div>
  )};