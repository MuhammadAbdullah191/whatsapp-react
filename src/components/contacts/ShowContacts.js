import React, { useState, useEffect } from 'react';
import { CrudApi } from '../../apis/shared/crudApi';
import Loader from '../shared/Loader';
import { useDispatch } from 'react-redux';
import { setRoom, setContacts, setSelectedContact, setUser, setTest } from '../../store/slices/data';
import { useSelector } from 'react-redux';
import { RoomApi } from '../../apis/room/room';
import consumer from '../../cable';
import { getAvatarUrl } from '../../helpers/avatarUrl';
import { useNavigate } from "react-router-dom";
import { getLocalStorage, removeLocalStorage } from "./../../helpers/localStorage"
import { MyContext } from '../../pages/dashboard/dashboard'
import { toast } from 'react-toastify';

function ShowContacts() {
  const messages = useSelector((state) => {
    return state.data.messages
  });
  const currentUser = useSelector((state) => state.data.currentUser);
  const currentRoom = useSelector((state) => state.data.currentRoom);
  const contacts = useSelector((state) => state.data.contacts);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const errHandler = React.useContext(MyContext);

  useEffect(() => {
    CrudApi.getAll('users', '')
      .then((res) => {
        dispatch(setContacts(res.data.users))
        let user = getLocalStorage('user');
        dispatch(setUser(user))
        toast('Successfully loaded contacts')
      })
      .catch((err) => {
        errHandler(err)
      });
  }, [errHandler]);

  const truncateUsername = (username) => {
    if (username && username.length > 10) {
      return username.substring(0, 10) + '...';
    }
    return username;
  };

  const setConvo = (e) => {
    consumer.subscriptions.subscriptions.forEach((subscription) => {
      consumer.subscriptions.remove(subscription);
    });
    RoomApi.getCurrentRoom(currentUser.id, e)
      .then((res) => {
        const room_id = JSON.parse(res.data.room).id
        dispatch(setRoom(room_id));
        dispatch(setSelectedContact(e));
        const channel = consumer.subscriptions.create({ channel: "ChatChannel", room_id: room_id }, {
          connected: () => {
            console.log('connected to room channel ' + room_id)
          },
          disconnected: () => {
            console.log('Disconnected from Action Cable');
          },
          received: (data) => {
            console.log('Received data from Action Cable:', data);
            dispatch(setTest(data.message))
          },
        });
      }).catch((err) => {
        console.log(err)
      })
  }

  if (contacts) {
    return (
      <div className="contacts pe-2 h-100 overflow-scroll">
        {contacts.map((contact, index) => {
          if (currentUser?.id === contact.id) {
            return null;
          }
          return (
            <div className="convo border-bottom p-2 d-flex flex-row" onClick={() => { setConvo(contact.id) }}>
              <div>
                <img className='convo-img rounded-circle' src={getAvatarUrl(contact)} />
              </div>
              <div className="w-100 d-flex flex-row justify-content-between">
                <div className="convo-details ms-3 fw-normal d-flex- flex-col">
                  <p className='m-0 convo-heading'>
                    {contact.phone}
                  </p>
                  <p className='m-0 fw-light'>
                    {truncateUsername(contact?.username)}
                  </p>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    );

  }
  else {
    return (
      <Loader />
    )
  }
}

export default ShowContacts;