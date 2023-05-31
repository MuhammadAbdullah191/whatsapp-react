import ChatHeader from "../chatHeader/ChatHeader";
import ChatMessages from "../chatMessages/ChatMessages";
import ChatBox from "../chatBox/ChatBox";
import { useSelector } from 'react-redux';
import Landing from "../landing.js/Landing";

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
        <div className="position-fixed bottom-0 chat-width">
          <ChatBox />
        </div>
      </div>
    );
  }else{
    return(
      <Landing/>
    )
  }
}

export default Chat;