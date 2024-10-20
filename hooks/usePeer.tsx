'use client';
import { useEffect, useState , useRef} from "react";
import { Peer } from 'peerjs';
import { useSocket } from "@/context/VideoSocketContext";
import { useParams } from "next/navigation";
import { emit } from "process";

const usePeer = () => {
    const [myId, setMyId] = useState('');
    const isPeerSet = useRef(false);
    const [peer, setPeer] = useState<Peer | null> (null);
    const {socket} = useSocket()
    const roomId = useParams()?.roomId
    console.log("we got the socket id too in usePeer", socket)
    
    console.log('Getting the roomId from useParams,',roomId)
    useEffect(() => {
        if (isPeerSet.current || !roomId || !socket) return;
        isPeerSet.current = true
            const myPeer = new Peer();
            setPeer(myPeer);
            
            myPeer.on('open', (id) => {
                console.log(`Your peer id is ${id}`);
                setMyId(id);
                socket?.emit('joinRoom', roomId, id);
            });

            
        }, [socket, roomId]); // Empty dependency array

    return {peer ,myId};
};

export default usePeer;