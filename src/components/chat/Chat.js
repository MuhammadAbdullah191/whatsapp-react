import ChatHeader from "../chatHeader/ChatHeader";
import ChatMessages from "../chatMessages/ChatMessages";
import ChatBox from "../chatBox/ChatBox";
import { useSelector } from 'react-redux';
import { useState } from "react";

function Chat() {
  const currentRoom = useSelector((state) => state.data.currentRoom);
  const selectedContact = useSelector((state) => state.data.selectedContact);
  const contacts = useSelector((state) => state.data.contacts);
  let contact;

  function findContactById(contacts) {
    return contacts.find(contact => contact.id === selectedContact);
  }

  if(contacts){
    contact = findContactById(contacts);
  }

  if(currentRoom && contact){
    return (
      <div className="d-flex flex-column vh-100">
        <ChatHeader contact = {contact}/>
        <div className="chat-background h-100">
          <ChatMessages />
        </div>
        <div className="position-fixed bottom-0 w-75">
          <ChatBox />
        </div>
      </div>
    );
  }else{
    return(
      <h1 className="text-center">
        Select a chat to start conversation
      </h1>
    )
  }
}

export default Chat;