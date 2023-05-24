function ChatBox() {
	return ( 
		<div className = "d-flex justify-content-center align-items-center p-2 border-bottom profile-header">
			<i className = "fa-regular fa-face-smile p-2 fs-4"></i>
			<i className = "fa-solid fa-paperclip p-2 fs-4"></i>
			<input className = "search bg-white w-100 p-2" type="text" placeholder="Type a Message"/>
			<i className="fa-solid fa-paper-plane p-2 fs-4"></i>
		</div>
	 );
}

export default ChatBox;