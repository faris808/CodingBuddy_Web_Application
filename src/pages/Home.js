import React, { useState } from "react";
import {v4 as uuidv4} from 'uuid';
import { Toast, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [roomid,setroomid]=useState("");
  const [username,setusername]=useState("");
  const navigate=useNavigate();
  const createNewRoom=(e)=>{
    e.preventDefault();
    const id=uuidv4();
    setroomid(id);
    toast.success('Created a new room');
  }
  const joinRoom=()=>{
    if(!roomid || !username){
        toast.error('ROOM ID and username is required');
        return;
    }
    navigate(`/editor/${roomid}`,{
        state:{
            username,
        }
    })
  }
  const handleInputEnter=(e)=>{
    if(e.code==='Enter'){
        joinRoom();
    }
  }
  return (
    <div className="HomePageWrapper">
      <div className="FormPageWrapper">
        <img src="/logo1img.png" className="logo" alt="logo" />
        <div className="inputgrp">
          <h4>Paste invitation ROOM ID</h4>
          <input type="text" value={roomid} className="inputBox" onKeyUp={handleInputEnter} placeholder="ROOM ID" onChange={(e)=>{
            setroomid(e.target.value);
          }}/>
          <input type="text" value={username} className="inputBox" onKeyUp={handleInputEnter} placeholder="USERNAME" onChange={(e)=>{
            setusername(e.target.value);
          }}/>
          <button className="btn joinBtn" onClick={joinRoom}>Join</button>
          <span className="createInfo">
            If You Don't Have Invite then create &nbsp;
            <a href="" className="createNewBtn" onClick={createNewRoom}>
              New Room
            </a>
          </span>
        </div>
      </div>
      <footer>
        <h4>
          Built with 💛 <a href="">CodingBuddy</a>
        </h4>
      </footer>
    </div>
  );
};
export default HomePage;
