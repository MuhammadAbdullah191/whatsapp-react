import Profile from "../../components/profile/Profile";
import Chat from "../../components/chat/Chat";

function Dashboard() {
  return(
		<>
		<div className="container-fluid">
			<div className="row">
				<div className="col-3 p-0">
					<Profile/>
				</div>
				<div className="col-9 p-0">
					<Chat/>
				</div>
			</div>
		</div>
		</>
	)
}

export default Dashboard;
