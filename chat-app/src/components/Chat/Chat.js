import React, { useEffect, useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
import firebase from 'firebase';
import { useStateValue } from '../../utils/StateProvider';

function Chat() {
  const [{ user }] = useStateValue();
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('');
  const [roomName, setRoomnName] = useState('');
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      db.collection('rooms')
        .doc(roomId)
        .onSnapshot(snapshot => setRoomnName(snapshot.data().name));
      db.collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
        .onSnapshot(snapshot => setMessages(snapshot.docs.map(doc => doc.data())));
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = e => {
    e.preventDefault();
    console.log('Your message is >>> ', input);

    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput('');
  };
  return (
    <div className='chat'>
      <div className='chat__header'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='chat__headerInfo'>
          <h3>{roomName}</h3>
          <p>Last seen at {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>
        <div className='chat__headerRight'>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='chat__body'>
        {messages.map(message => (
          <p key={message.id} className={`chat__message ${message.name === user.displayName && 'chat__reciever'}`}>
            <span className='chat__name'>{message.name}</span>
            {message.message}
            <span className='chat__timestamp'>{new Date(message.timestamp?.toDate()).toUTCString()}</span>
          </p>
        ))}
      </div>
      <div className='chat__footer'>
        <InsertEmoticonIcon />
        <form>
          <input placeholder='Type a message...' type='text' onChange={e => setInput(e.target.value)} value={input} />
          <button type='submit' onClick={sendMessage}>
            Send a Message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
