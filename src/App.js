import React, { useState, useEffect } from 'react';
import {Launcher} from 'react-chat-window'
import './App.css';

function App() {
  const [lastMessageTime,setLastMessageTime]=useState(0)//最后消息的时间
  const [messageList,setMessageList]=useState([])
  const [unReadCount,setUnReadCount]=useState(0)//未读消息
  const [isOpen,setIsOpen]=useState(false)//聊天窗体是否打开
  const [isfirst,setIsfirst]=useState(true)

  const _onFilesSelected = files =>{
    console.log(files)
  }

  const _on_botMessage_was_sent_to_user = message=> {
    console.log(message)
    messageList.push(message)
    setLastMessageTime(Date.now())
    setTimeout(() => {
      _bot_sendMessage_to_user(`${message.data[message.type]} too`)
    }, 2000);
  }

  const _bot_sendMessage_to_user = text => {
    if (text.length > 0) {
      messageList.push({
        author: 'them',
        type: 'text',
        data: { text }
      })
      setLastMessageTime(Date.now())
    }
  }

  const _onHandleClick = () => {
    console.log('lanch')
    console.log(isOpen)
    setIsOpen(!isOpen)
  }

  useEffect(()=>{
    console.log(isOpen)
    if(isfirst){
      _bot_sendMessage_to_user(`1`)
      _bot_sendMessage_to_user(`2`)
      setIsfirst(false)
    }else{
      //不是第一次载入，则机器人不主动聊天。
    }
    setUnReadCount(0)//只要打开了，未读消息就是0
  },[isOpen])

  //用这个进行触发，只有使用useState的set方法，才能让dom更新。
  useEffect(()=>{
    console.log("time up")
    if(lastMessageTime){
      setMessageList([...messageList])
    }
    setUnReadCount(unReadCount+1)
  },[lastMessageTime])

  return (
    <div className="App">
      <header className="App-header">
        <Launcher
        isOpen={isOpen}
        agentProfile={{
          teamName: 'chatbot',
          imageUrl: '/logo.png'
        }}
        newMessagesCount={unReadCount}
        onFilesSelected={_onFilesSelected}
        onMessageWasSent={_on_botMessage_was_sent_to_user}
        messageList={messageList}
        handleClick={_onHandleClick}
        showEmoji
      />
      </header>
    </div>
  );
}

export default App;
