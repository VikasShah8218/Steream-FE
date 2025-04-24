import React, { useRef, useState ,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import { logout } from '../../../app/slices/authSlice';

// ws.send(JSON.stringify({type:"connect",data:{}}));

const Home: React.FC = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const wsConnection = useSelector((state: any) => state.auth.wsConnection);
  const wsMessage    = useSelector((state: any) => state.auth.wsMessage);

  const videoRef = useRef<HTMLVideoElement>(null);
  const skipVideoServer = useRef<HTMLInputElement>(null);
  const [videoFile, setVideoFile] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoFile(videoURL);
    }
  };

  const maximizeVideo = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitRequestFullscreen) { // Safari
        (video as any).webkitRequestFullscreen();
      } else if ((video as any).mozRequestFullScreen) { // Firefox
        (video as any).mozRequestFullScreen();
      } else if ((video as any).msRequestFullscreen) { // IE/Edge
        (video as any).msRequestFullscreen();
      }
    }
  };

  const sendMessageWS = (message: object) => {if (wsConnection && wsConnection.readyState === WebSocket.OPEN) { wsConnection.send(JSON.stringify(message));}}
  // const playVideo  = () => videoRef.current?.play();
  // const pauseVideo = () => videoRef.current?.pause();
  // const seekTo = (seconds: number) => {if (videoRef.current) {videoRef.current.currentTime = seconds;}};
  // const changePlaybackRate = (rate: number) => { if (videoRef.current) {videoRef.current.playbackRate = rate;}};
  // const stopVideo  = () => {
  //   if (videoRef.current) {
  //     videoRef.current.pause();
  //     videoRef.current.currentTime = 0;
  //   }
  // };

  const serverControlPush = (action:string, value:string="") => {
    if (action === "play" ){ sendMessageWS({action: "play" , value: videoRef?.current?.currentTime });}
    if (action === "pause"){ sendMessageWS({action: "pause", value: videoRef?.current?.currentTime });}
    if (action === "skip" ){ sendMessageWS({action: "skip", value: value });}
  }

  const serverControlPull = () => {
    if ( wsMessage?.action === "play" ){
      if (wsMessage?.value){ videoRef.current!.currentTime = parseFloat(wsMessage.value);}
      videoRef?.current?.play();
    }
    if ( wsMessage?.action === "pause" ){
      if (wsMessage?.value){ videoRef.current!.currentTime = parseFloat(wsMessage.value);}
      videoRef?.current?.pause();
    }
    if ( wsMessage?.action === "skipTo" ){
      if (wsMessage?.value){ videoRef.current!.currentTime = parseFloat(wsMessage.value);}
      videoRef?.current?.play();
    }
    if ( wsMessage?.action === "skip" ){
      if (wsMessage?.value){ videoRef.current!.currentTime = parseFloat(wsMessage.value);}
      videoRef?.current?.play();
    }

  }

  useEffect(() => {console.log(wsMessage);serverControlPull()}, [wsMessage]);

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <input type="file" accept="video/*" onChange={handleFileUpload} className="file-input" />

      {videoFile && (
        <>
          <video ref={videoRef} src={videoFile} 
           crossOrigin="anonymous"  // ← Add this
          //  type="video/x-matroska"  // ← Add this
          className="w-full max-w-2xl rounded-lg shadow-lg" controls={false} />
          
          <div className="flex space-x-4">
            <button onClick={() => serverControlPush("play")} className="btn">Play</button>
            <button onClick={() => serverControlPush("pause")} className="btn">Pause</button>
            <input ref={skipVideoServer} type="number" className='btn' />
            <button onClick={() => serverControlPush("skip",skipVideoServer.current?.value)} className="btn">Skip</button>
            <button onClick={() => dispatch(logout())} className="btn">Logout</button>
            <button onClick={maximizeVideo} className="btn">Maximize</button>
          </div>
        </>
      )}

      <style>{`
        .btn { background-color: #3b82f6; color: white; padding: 8px 16px; border-radius: 8px; cursor: pointer; }
        .btn:hover { background-color: #2563eb; }
      `}</style>
    </div>
  );
};

export default Home;
