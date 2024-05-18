"use client"

import Image from "next/image";
import {useState} from "react";


export default function Home() {
  

const displayMediaOptions = {
  video: true,
  audio: {
    suppressLocalAudioPlayback: false,
  },
  preferCurrentTab: false,
  selfBrowserSurface: "exclude",
  systemAudio: "include",
  surfaceSwitching: "include",
  monitorTypeSurfaces: "include",
};

 let stream = null;
async function startCapture(displayMediaOptions) {
 
  try {
    stream =
      await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    setMedia(true)
    const videoElement = document.getElementById('myVideo');
    videoElement.srcObject = stream;
    videoElement.play();
  
    stream.oninactive = () => {
    console.log('stream inactive');
    setMedia(false)
      // Handle potential stream stoppage here (might need further checks)
};

stream.onended = () => {
    console.log('Stream ended');
    // Handle stream stoppage hereiu
};

  } catch (err) {
    console.error(`Error: ${err}`);
  }
  return stream;
}

const stopstream = () => {
  //if(stream == null || !stream.getTracks){
   // console.warn("Invalid ERROR : stream already stopped")
  //}else
    stream.getTracks().forEach(track => track,stop())
  
}
  const [media,setMedia] = useState(false);
  return (
    
 <>
    <main className="w-full h-[100vh] flex items-center gap-x-4 justify-center">
      {media ? <> 
        <div className="flex flex-col h-full">
        You are streaming now 
        <button className="bg-rose-400 text-xl rounded-lg p-4 px-6 text-white" onClick={stopstream} >Stop stream </button>
        </div>
        </> : <button className="p-6 px-8 rounded-lg bg-green-600 text-white text-2xl " onClick={()=>{startCapture(displayMediaOptions)}}> 
      Start sharing screen
    </button> }
    <video id="myVideo" width="640" className="border-2 border-white rounded-lg" height="480" autoplay></video>


   </main> 
    </> 
  );
}
