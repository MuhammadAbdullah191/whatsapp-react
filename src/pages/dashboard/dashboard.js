import Profile from "../../components/profile/Profile";
import Chat from "../../components/chat/Chat";

function Dashboard() {
  return(
		<>
		<div className="container-fluid p-0">
			<div className="d-flex flex-row">
				<div className="p-0 profile-width">
					<Profile/>
				</div>
				<div className="p-0 chat-width">
					<Chat/>
				</div>
			</div>
		</div>
		</>
	)
}

export default Dashboard;
