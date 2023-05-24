function ChatMessages() {
  const messages = [
    { name: 'John', message: 'Hello!' },
    { name: 'Jane1', message: 'How are you?' }
  ]
  return (
    <div className="container p-3 h-75 overflow-scroll">
      {messages.map((message, index) => {
        if(message.name == 'John'){
          return (
            <div className="d-flex flex-column align-items-end">
              <div key={index} className="message p-2 m-1 shadow-sm rounded d-inline-block sender-msg">
                <p className="m-0 p-0 d-inline">{message.message}</p>
              </div>
            </div>
          );
        }else{
          return (
            <div key={index} className="message p-2 m-1 shadow-sm rounded d-inline-block receiver-msg">
              <p className="m-0 p-0 d-inline">{message.message}</p>
            </div>
          );
        }
        })}
    </div>

  );
}

export default ChatMessages;
