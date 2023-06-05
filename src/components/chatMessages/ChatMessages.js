import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RoomApi } from '../../apis/room/room';
import Loader from '../shared/Loader';
import { useDispatch } from 'react-redux';
import { setMessages } from '../../store/slices/data';
import InfiniteScroll from 'react-infinite-scroll-component';
import ConvoTop from '../convoTop/ConvoTop';
import MessageItem from './MessageItem'

function ChatMessages() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.data.currentUser);
  const currentRoom = useSelector((state) => state.data.currentRoom);
  const messages = useSelector((state) => state.data.messages);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (currentRoom) {
      RoomApi.getAllMessages(currentRoom, 1)
        .then((res) => {
          dispatch(setMessages(res.data));
          setHasMore(res.data.length >= 10);
          setLimit(20);
          setPage(2);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [currentRoom]);

  const fetchData = () => {
    RoomApi.getAllMessages(currentRoom, page)
      .then((res) => {
        let newMessages = [...messages,...res.data]
        dispatch(setMessages(newMessages));
        if (newMessages.length < limit) {
          setHasMore(false);
        }
        setLimit(limit+10)
        setPage(page+1)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const scrollableDivRef = useRef(null);

  //   useEffect(() => {
  //     scrollToBottom();
  //   }, [messages]);

  //   const scrollToBottom = () => {
  //     if (scrollableDivRef.current) {
  //       scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
  //     }
  //   };
  //   ref={scrollableDivRef}


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
            {messages.map((message, index) => (
            <MessageItem key={index} message={message} currentUser={currentUser} />
            ))}
          </InfiniteScroll> 
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default ChatMessages;
