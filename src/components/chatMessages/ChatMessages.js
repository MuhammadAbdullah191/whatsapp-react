import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RoomApi } from '../../apis/room/room';
import Loader from '../shared/Loader';
import { useDispatch } from 'react-redux';
import { setMessages } from '../../store/slices/data';
import InfiniteScroll from 'react-infinite-scroll-component';
import ConvoTop from '../convoTop/ConvoTop';
import MessageItem from './MessageItem'
import { MyContext } from '../../pages/dashboard/dashboard'

function ChatMessages() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.data.currentUser);
  const currentRoom = useSelector((state) => state.data.currentRoom);
  const messages = useSelector((state) => state.data.messages);
  const [hasMore, setHasMore] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const errHandler = React.useContext(MyContext);

  useEffect(() => {
    if (currentRoom) {
      RoomApi.getAllMessages(currentRoom, 1)
        .then((res) => {
          dispatch(setMessages(res.data.messages));
          setHasMore(res.data.messages.length >= 15);
          setLimit(20);
          setPage(2);
        })
        .catch((err) => {
          errHandler(err)
        });
    }
  }, [currentRoom]);

  const fetchData = () => {
    RoomApi.getAllMessages(currentRoom, page)
      .then((res) => {
        let newMessages = [...messages, ...res.data.messages]
        dispatch(setMessages(newMessages));
        if (newMessages.length < limit) {
          setHasMore(false);
        }
        setLimit(limit + 15)
        setPage(page + 1)
      })
      .catch((err) => {
        errHandler(err)
      });
  };


  if (messages != null) {
    return (
      <div className="container chat-messages p-4 pb-5 overflow-scroll">
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
            loader={<Loader />}
            scrollableTarget="scrollableDiv"
            endMessage={<ConvoTop />}
            className='infinite-scroll'
          >
            {messages.map((message, index) => (
              message.user_id === currentUser.id ? (
                <MessageItem key={index} message={message} messageClass={'sender-msg'} alignmentClass={'align-items-end'} />
              ) : (
                <MessageItem key={index} message={message} messageClass={'receiver-msg'} alignmentClass={'align-items-start'} />
              )
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
