  import { useEffect } from "react";
  import { useSelector } from "react-redux";
  import { RoomApi } from "../../apis/room/room";
  import Loader from "../shared/Loader";
  import { useDispatch } from "react-redux";
  import {setMessages} from '../../store/slices/data'

  function ChatMessages() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.data.currentUser);
    const currentRoom = useSelector((state) => state.data.currentRoom);
    const messages = useSelector((state) => state.data.messages);

    useEffect(() => {
      console.log('room changed')
      if (currentRoom) {
        RoomApi.getAllMessages(currentRoom)
          .then((res) => {
            dispatch(setMessages(res.data))
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }, [currentRoom]);

    if(messages != null){
        return (
          <div className="container chat-messages p-3 pb-5 h-75 overflow-scroll">
            {messages.map((message, index) => {
              if(message.user_id == currentUser.id){
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
