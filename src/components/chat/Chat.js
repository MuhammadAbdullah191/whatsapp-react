import ChatHeader from "../chatHeader/ChatHeader";
import ChatMessages from "../chatMessages/ChatMessages";
import ChatBox from "../chatBox/ChatBox";

function Chat() {
  return (
    <div className="d-flex flex-column vh-100">
      <ChatHeader />
      <div className="chat-background h-100">
				<ChatMessages/>
      </div>
			<div className="position-fixed bottom-0 w-75">
      	<ChatBox />
			</div>
    </div>
  );
}

export default Chat;