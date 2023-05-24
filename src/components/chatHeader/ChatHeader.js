function ChatHeader() {
	return (
		<div className="profile-header">
			<div className="vh-20 px-3 py-3">
				<div className="d-flex flex-row justify-content-between align-items-center">
					<div className='d-flex flex-row justify-content-center align-items-center '>
						<img className='profile-header-logo rounded-circle me-2' src={require('../../assets/people1.jpg')} /> 
						<p className='m-0 p-0 '>+92 3349949490</p>
					</div>
				</div>
			</div>
		</div> 
	 );
}

export default ChatHeader;