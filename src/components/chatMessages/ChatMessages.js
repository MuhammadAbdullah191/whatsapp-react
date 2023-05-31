import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RoomApi } from '../../apis/room/room';
import Loader from '../shared/Loader';
import { useDispatch } from 'react-redux';
import { setMessages } from '../../store/slices/data';
import InfiniteScroll from 'react-infinite-scroll-component';
import ConvoTop from '../convoTop/ConvoTop';

function ChatMessages() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.data.currentUser);
  const currentRoom = useSelector((state) => state.data.currentRoom);
  const messages = useSelector((state) => state.data.messages);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    if (currentRoom) {
      RoomApi.getAllMessages(currentRoom, limit)
        .then((res) => {
          dispatch(setMessages(res.data));
          setLimit(limit+5)
          if (res.data.length < limit) {
            setHasMore(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentRoom]);

  const fetchData = () => {
    RoomApi.getAllMessages(currentRoom, limit)
      .then((res) => {
        dispatch(setMessages(res.data));
        if (res.data.length < limit) {
          setHasMore(false);
        }
        setLimit(limit+5)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (messages != null) {
    return (
      <div className="container chat-messages p-3 pb-5 h-75 overflow-scroll">
        <div
          id="scrollableDiv"
          style={{
            height: '100%',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column-reverse',
          }}
        >
          <InfiniteScroll
            dataLength={messages.length}
            next={fetchData}
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
            inverse={true}
            hasMore={hasMore}
            loader={<Loader/>}
            scrollableTarget="scrollableDiv"
            endMessage={<ConvoTop/>}
          >
            {messages.map((message, index) => {
              if (message.user_id === currentUser.id) {
                return (
                  <div className="d-flex flex-column align-items-end">
                    <div
                      key={index}
                      className="message p-2 m-1 shadow-sm rounded d-inline-block sender-msg"
                    >
                      <p className="m-0 p-0 d-inline">{message.content}</p>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="d-flex flex-column align-items-start">
                    <div
                      key={index}
                      className="message p-2 m-1 shadow-sm rounded d-inline-block receiver-msg"
                    >
                      <p className="m-0 p-0 d-inline">{message.content}</p>
                    </div>
                  </div>
                );
              }
            })}
          </InfiniteScroll>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default ChatMessages;
