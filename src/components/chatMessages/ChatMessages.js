  import { useState, useEffect } from "react";
  import { useSelector } from "react-redux";
  import { RoomApi } from "../../apis/room/room";
  import Loader from "../shared/Loader";

  function ChatMessages() {
    const [data, setData] = useState(null);
    const currentUser = useSelector((state) => state.data.currentUser);
    const currentRoom = useSelector((state) => state.data.currentRoom);


    useEffect(() => {
      console.log('room changed')
      if (currentRoom) {
        RoomApi.getAllMessages(currentRoom)
          .then((res) => {
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [currentRoom]);

    if(data != null){
        return (
          <div className="container chat-messages p-3 pb-5 h-75 overflow-scroll">
            {data.map((message, index) => {
              if(message.user_id == currentUser){
                return (
                  <div className="d-flex flex-column align-items-end">
                    <div key={index} className="message p-2 m-1 shadow-sm rounded d-inline-block sender-msg">
                      <p className="m-0 p-0 d-inline">{message.content}</p>
                    </div>
                  </div>
                );
              }else{
                return (
                  <div className="d-flex flex-column align-items-start">
                    <div key={index} className="message p-2 m-1 shadow-sm rounded d-inline-block receiver-msg">
                      <p className="m-0 p-0 d-inline">{message.content}</p>
                    </div>
                  </div>
                );
              }
              })}
          </div>
        );
    }else{
      <Loader/>
    }
  }

  export default ChatMessages;
