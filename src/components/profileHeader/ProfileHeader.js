function ProfileHeader() {
	return (
		<div className="profile-header">
			<div className="vh-20 px-3 py-3">
				<div className="d-flex flex-row justify-content-between align-items-center">
					<div>
						<img className='profile-header-logo rounded-circle' src={require('../../assets/people1.jpg')} /> 
					</div>
					<div className='d-flex w-50 justify-content-between'>
						<i className="fa-solid fa-users fs-5"></i>
						<i className="fa-solid fa-spinner fs-5"></i>
						<i className="fa-solid fa-comment-dots fs-5"></i>
						<i className="fa-solid fa-ellipsis-vertical fs-5"></i>
					</div>
				</div>
			</div>
		</div> 
	 );
}

export default ProfileHeader;