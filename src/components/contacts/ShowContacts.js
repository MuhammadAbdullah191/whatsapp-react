import { useState, useEffect } from 'react';
import { CrudApi } from '../../apis/shared/crudApi';
import Loader from '../shared/Loader';
import { useDispatch } from 'react-redux';
import { setRoom, setContacts, setSelectedContact } from '../../store/slices/data';
import { useSelector } from 'react-redux';
import { RoomApi } from '../../apis/room/room';
import consumer from '../../cable';

function ShowContacts() {
	const [data, setData] = useState(null);
	const currentUser = useSelector((state) => state.data.currentUser);
	const currentRoom = useSelector((state) => state.data.currentRoom);
	const dispatch = useDispatch();

	useEffect(() => {
    CrudApi.getAll('users')
      .then((res) => {
				setData(res.data.users);
				dispatch(setContacts(res.data.users))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

	const setConvo = (e) => {
		consumer.subscriptions.subscriptions.forEach((subscription) => {
			consumer.subscriptions.remove(subscription);
		});
		
		RoomApi.getCurrentRoom(currentUser, e)
			.then((res)=>{
				const room_id = res.data.id
				dispatch(setRoom(room_id));
				dispatch(setSelectedContact(e));
				const channel = consumer.subscriptions.create({channel: "ChatChannel", room_id: room_id}, {
					connected: () => {
						console.log('connected to room channel ' + room_id)
					},
					disconnected: () => {
						console.log('Disconnected from Action Cable');
					},
					received: (data) => {
						if(data.message.user_id != currentUser){
							console.log('Received data from Action Cable:', data);
							const messageHtml = `
							<div className="d-flex flex-column align-items-start">
							<div key={index} class="message p-2 m-1 shadow-sm rounded d-inline-block receiver-msg">
								<p class="m-0 p-0 d-inline">${data.message.content}</p>
							</div>
							</div>
						`;
						
							const chatMessagesContainer = document.querySelector(".container.chat-messages");
							chatMessagesContainer.innerHTML += messageHtml;

							chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
						}
					},
				});
			}).catch((err)=>{
				console.log(err)
			})
	}

	if(data){
		return (
			<div className="contacts pe-2 h-100 overflow-scroll">
				{data.map((contact, index) => {
					if (currentUser === contact.id) {
						return null; // Skip rendering the contact
					}
					return (
						<div className="convo border-bottom p-2 d-flex flex-row" onClick={() => { setConvo(contact.id) }}>
							<div>
								<img className='convo-img rounded-circle' src={require('../../assets/people1.jpg')} />
							</div>
							<div className="w-100 d-flex flex-row justify-content-between">
								<div className="convo-details ms-3 fw-normal d-flex- flex-col">
									<p className='m-0 convo-heading'>
										{contact.phone}
									</p>
									<p className='m-0 fw-light'>
										this is a test message...
									</p>
								</div>
								<div className="convo-time">
									<p className="m-0">
										4:53 pm
									</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		);
		
	}
	else{
		return(
			<Loader/>
		)
	}
}

export default ShowContacts;