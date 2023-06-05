import { isMessageFromCurrentUser } from "../../helpers/getMessageClass";

function MessageItem({ message, currentUser }) {
  const isCurrentUser = isMessageFromCurrentUser(message, currentUser);
  const messageClass = isCurrentUser ? "sender-msg" : "receiver-msg";
  const alignmentClass = isCurrentUser ? "align-items-end" : "align-items-start";

  return (
    <div className={`d-flex flex-column ${alignmentClass}`}>
      <div className={`message p-2 m-1 shadow-sm rounded d-inline-block ${messageClass}`}>
        <p className="m-0 p-0 d-inline">{message.content}</p>
      </div>
    </div>
  );
}

export default MessageItem;
