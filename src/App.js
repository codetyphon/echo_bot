import React, { useState, useEffect } from 'react';
import {Launcher} from 'react-chat-window'
import './App.css';

function App() {
  const [messageList,setMessageList] = useState([])
  const [msg,setMsg]=useState("")
  const [up,setUp]=useState(0)
  const [isopen,setIsopen]=useState(false)
  const [isfirst,setIsfirst]=useState(true)

  const _onFilesSelected = files =>{
    console.log(files)
  }

  const _onMessageWasSent = message=> {
    console.log(message)
    setMessageList([...messageList, message])
    setMsg(message)
    setUp(Date.now())
  }

  const _sendMessage = text => {
    if (text.length > 0) {
      setMessageList([...messageList, {
        author: 'them',
        type: 'text',
        data: { text }
      }])
    }
  }

  const handleClick = () => {
    console.log('lanch')
    setIsopen(!isopen)
    if(isfirst){
      setIsfirst(false)
    }else{
      //不是第一次载入，则机器人不主动聊天。
    }
  }

  useEffect(()=>{
    if(up!=0){
      setTimeout(() => {
        _sendMessage(`${msg.data[msg.type]} too`)
      }, 1000);
    }
  },[up])

  return (
    <div className="App">
      <header className="App-header">
        <Launcher
        isOpen={isopen}
        agentProfile={{
          teamName: 'echo_bot',
          imageUrl: '/logo.png'
        }}
        onFilesSelected={_onFilesSelected}
        onMessageWasSent={_onMessageWasSent}
        messageList={messageList}
        handleClick={handleClick}
        showEmoji
      />
      </header>
    </div>
  );
}

export default App;
