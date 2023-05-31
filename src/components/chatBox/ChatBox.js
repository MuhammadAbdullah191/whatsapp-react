import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RoomApi } from '../../apis/room/room';

function ChatBox() {
	const messages = useSelector((state) => state.data.messages);
  const [message, setMessage] = useState('');
	const currentUser = useSelector((state) => state.data.currentUser);
	const currentRoom = useSelector((state) => state.data.currentRoom);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

	const sendMessage = () => {
		RoomApi.sendMessage(currentRoom, message, currentUser.id)
			.then((res)=>{
				console.log('message saved successfully', res)
			}).catch((err)=>{
				console.log(err)
			})


		setMessage("");
	}

  return (
    <div className="d-flex justify-content-start align-items-center p-2 border-bottom profile-header w-100">
      <i className="fa-regular fa-face-smile p-2 fs-4"></i>
      <i className="fa-solid fa-paperclip p-2 fs-4"></i>
      <input
        className="search bg-white  p-2"
        type="text"
        placeholder="Type a Message"
        value={message}
        onChange={handleChange}
      />
      <i role="button" className="fa-solid fa-paper-plane p-2 fs-4" onClick={sendMessage}></i>
    </div>
  );
}

export default ChatBox;
