import Profile from "../../components/profile/Profile";
import Chat from "../../components/chat/Chat";
import React, { createContext } from 'react';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const MyContext = createContext();

function Dashboard() {
	const navigate = useNavigate()

	const errHandler = (err) => {
		if (err?.response?.status == 401) {
			localStorage.clear();
			navigate('/login')
		}
    toast.error('Error while loading data');
		console.log(err)
  };

  return(
		<MyContext.Provider value={errHandler}>
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
		</MyContext.Provider>
	)
}

export default Dashboard;
