import React, { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import ACTIONS from "../Actions";
import { useLocation, useNavigate,Navigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
const EditorPage = () => {
  const socketRef=useRef(null);
  const codeRef=useRef(null);
  const location=useLocation();
  const reactNavigator=useNavigate();
  const {roomid}=useParams();
  useEffect(()=>{
    const init=async()=>{
      socketRef.current=await initSocket();
      socketRef.current.on('connect_error',(err)=>handleErrors(err));
      socketRef.current.on('connect_failed',(err)=>handleErrors(err));
      function handleErrors(e){
        console.log('socket error',e);
        toast.error('Socket connetion failed, try again later.');
        reactNavigator('/');
      }
      socketRef.current.emit(ACTIONS.JOIN,{
        roomid,
        username:location.state?.username,
      });
       //Listening for joined events
       socketRef.current.on(ACTIONS.JOINED,({clients,username,socketid})=>{
        if(username!==location.state?.username){
          toast.success(`${username} joined the room`);
          console.log(`${username} joined`);
        }
        setclients(clients);
        socketRef.current.emit(ACTIONS.SYNC_CODE,{
          code:codeRef.current,
          socketid
        });
       })

       //Listening for disconnected
       socketRef.current.on(ACTIONS.DISCONNECTED,({socketid,username})=>{
        toast.success(`${username} left the room`);
        setclients((prev)=>{
          return prev.filter(client=>client.socketid!==socketid);
        })
       })
    }
    init();
    return ()=>{   //Listeners are required to be cleared, otherwise memory leak problem can occur
      socketRef.current.disconnect();         //Clear function
      socketRef.current.off(ACTIONS.JOINED);  //Clear function
      socketRef.current.off(ACTIONS.DISCONNECTED);  //Clear function
    }
  },[]);
  const [clients, setclients] = useState([]);

  async function copyRoomId(){
    try{
      await navigator.clipboard.writeText(roomid);
      toast.success('ROOM ID has been copied to your clipboard');
    }
    catch(err){
      toast.error('Could not copy the ROOM ID');
    }
  }

  function leaveRoom(){
    reactNavigator('/');
  }
  if(!location.state){
    return <Navigate to="/" />;
  }
  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logos">
            <img className="logoimg" src="/logo1img.png" alt="logo"></img>
          </div>
          <h3>Connected</h3>
          <div className="clientList">
            {clients.map((element) => (
              <Client username={element.username} key={element.socketId} />
            ))}
          </div>
        </div>
        <button className="btn copybtn" onClick={copyRoomId}>Copy Room ID</button>
        <button className="btn leavebtn" onClick={leaveRoom}>Leave</button>
      </div>
      <div className="editorWrap">
        <Editor socketRef={socketRef} roomid={roomid} onCodeChange={(code)=>{
          codeRef.current=code;
        }}/>
      </div>
    </div>
  );
};
export default EditorPage;
