import {useEffect, useState} from 'react';
import Message from '../components/Message.tsx';
import {MessageType} from '../types.d..ts';

const url = 'http://146.185.154.90:8000/messages';

const App = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response: Response = await fetch(url);
      if (response.ok) {
        const messages: MessageType[] = await response.json();
        setMessages(messages);
      }
    };

    void getData();
  }, []);

  const listOfMessages: Message[] = messages.map((message) =>
    <Message
      key={message._id}
      auhtor={message.author}
      message={message.message}
      date={message.datetime}
    />);

  return (
    <>
      <div className="d-flex flex-column-reverse">
        {listOfMessages}
      </div>
    </>
  );
};

export default App;
