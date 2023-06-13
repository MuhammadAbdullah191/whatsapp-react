import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RoomApi } from '../../apis/room/room';
import { toast } from 'react-toastify';
import { MyContext } from '../../pages/dashboard/dashboard'
import { scrollHelper } from '../../helpers/animationHelper';

function ChatBox() {
  const [message, setMessage] = useState('');
  const currentUser = useSelector((state) => state.data.currentUser);
  const currentRoom = useSelector((state) => state.data.currentRoom);
  const errHandler = React.useContext(MyContext);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      RoomApi.sendMessage(currentRoom, message, currentUser.id)
        .then((res) => {
          toast('Message sent successfully')
          setTimeout(() => {
            scrollHelper()
          }, 100)
          setMessage('');
        })
        .catch((err) => {
          errHandler(err)
        });
    } else {
      toast.error("Can't send empty message")
    }
  };

  return (
    <div className="d-flex justify-content-start align-items-center p-2 border-bottom profile-header w-100">
      <i className="fa-regular fa-face-smile p-2 fs-4"></i>
      <i className="fa-solid fa-paperclip p-2 fs-4"></i>
      <input
        className="search bg-white p-2 chat-input"
        type="text"
        placeholder="Type a Message"
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <i role="button" className="fa-solid fa-paper-plane p-2 fs-4" onClick={sendMessage}></i>
    </div>
  );
}

export default ChatBox;
