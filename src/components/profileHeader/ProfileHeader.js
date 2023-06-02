import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProfileHeader() {
	const currentUser = useSelector((state) => state.data.currentUser);
	const navigate = useNavigate()
	const handleLogout = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		navigate('/login')
	}

	return (
		<div className="profile-header">
			<div className="vh-20 px-3 py-3">
				<div className="d-flex flex-row justify-content-between align-items-center">
					<div>
						<img className='profile-header-logo rounded-circle' src={currentUser.avatar_url ? currentUser.avatar_url : require('../../assets/unknown.jpeg')} /> 
					</div>
					<div className='d-flex w-50 justify-content-between'>
						<i className="fa-solid fa-users fs-5"></i>
						<i className="fa-solid fa-spinner fs-5"></i>
						<Link to="/edit"><i className="fa-solid fa-ellipsis-vertical fs-5 text-black"></i></Link>
						<i type="button" class="fa-solid fa-right-from-bracket fs-5" onClick={handleLogout}></i>
					</div>
				</div>
			</div>
		</div> 
	 );
}

export default ProfileHeader;