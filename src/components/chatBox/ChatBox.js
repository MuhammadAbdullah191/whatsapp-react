import React, { useState } from 'react';
import consumer from '../../cable';
import { useSelector } from 'react-redux';
import { RoomApi } from '../../apis/room/room';

function ChatBox() {
  const [message, setMessage] = useState('');
	const currentUser = useSelector((state) => state.data.currentUser);
	const currentRoom = useSelector((state) => state.data.currentRoom);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

	const sendMessage = () => {
			const messageHtml = `
			<div class="d-flex flex-column align-items-end">
				<div class="message p-2 m-1 shadow-sm rounded d-inline-block sender-msg">
					<p class="m-0 p-0 d-inline">${message}</p>
				</div>
			</div>
		`;

		const chatMessagesContainer = document.querySelector(".container.chat-messages");
		chatMessagesContainer.innerHTML += messageHtml;

		chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;

		RoomApi.sendMessage(currentRoom, message, currentUser)
			.then((res)=>{
				console.log('message saved successfully', res)
			}).catch((err)=>{
				console.log(err)
			})

		setMessage("");
	}

  return (
    <div className="d-flex justify-content-center align-items-center p-2 border-bottom profile-header">
      <i className="fa-regular fa-face-smile p-2 fs-4"></i>
      <i className="fa-solid fa-paperclip p-2 fs-4"></i>
      <input
        className="search bg-white w-100 p-2"
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
