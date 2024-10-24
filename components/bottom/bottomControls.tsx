import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophoneSlash,
  faPeopleGroup,
  faVideoSlash,
  faDisplay,
  faHand,
  faPhoneSlash,
  faMicrophone,
  faVideo
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

interface BottomProps {
    muted : boolean;
    playing : boolean;
    toggleAudio : ()=> void;
    toggleVideo: ()=> void;
}

const Bottom :React.FC<BottomProps>= (props) =>{
    const {muted, playing, toggleAudio, toggleVideo} = props;
    return (<div>
        {muted ? <FontAwesomeIcon icon={faMicrophoneSlash} onClick = {toggleAudio} /> : <FontAwesomeIcon icon={faMicrophone} onClick = {toggleAudio}/>}
        {playing ? <FontAwesomeIcon icon={faVideo} onClick = {toggleVideo} />: <FontAwesomeIcon icon={faVideoSlash} onClick = {toggleVideo}/>}
        
    </div>)
}
export default Bottom;