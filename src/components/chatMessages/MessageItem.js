function MessageItem({ message, messageClass, alignmentClass }) {
  return (
    <div className={`d-flex flex-column ${alignmentClass} overflow-hidden`}>
      <div className={`message p-2 m-1 shadow-sm rounded d-inline-block text-wrap ${messageClass} custom-message-class`}>
        <p className="m-0 p-0 d-inline">{message.content}</p>
      </div>
    </div>
  );
}

export default MessageItem;
