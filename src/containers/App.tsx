import {useEffect, useState} from 'react';
import MemoMessage from '../components/Message/Message.tsx';
import {MessageFormType, MessageType} from '../types.d..ts';
import MemoSpinner from '../components/Spinner/Spinner.tsx';
import MemoSendForm from '../components/SendForm/SendForm.tsx';

const baseUrl = (time: string = ''): string => `http://146.185.154.90:8000/messages${time}`;
let lastMessageTime: string = '';

const App = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {

    const getData = async (url: string) => {
      try {
        const response: Response = await fetch(url);
        if (response.ok) {
          const data: MessageType[] = await response.json();
          if (data.length !== 0) {
            lastMessageTime = `?datetime=${data[data.length - 1].datetime}`;
            setMessages(prevState => {
              let allMessages: MessageType[];
              if (url === baseUrl()) {
                allMessages = data;
              } else {
                allMessages = [...prevState, ...data];
              }
              return allMessages;
            });
          }
        }
      } catch (e: Error) {
        console.log('===========================');
        console.log(e.message);
        console.log(lastMessageTime);
        console.log(url);
      }
    };

    const run = async () => {
      setShowSpinner(true);
      void await getData(baseUrl());
      setShowSpinner(false);
      setInterval(() => {
        void getData(baseUrl(lastMessageTime));
      }, 3000);
    };

    void run();
  }, []);

  const onSubmit = async (message: MessageFormType) => {
    const data: URLSearchParams = new URLSearchParams();
    data.set('message', message.message);
    data.set('author', message.auhtor);

    const response: Response = await fetch(baseUrl(), {
      method: 'post',
      body: data,
    });
  };

  const listOfMessages: MemoMessage[] = messages.map((message) =>
    <MemoMessage
      key={message._id}
      auhtor={message.author}
      message={message.message}
      date={message.datetime}
    />);

  return (
    <>
      <MemoSendForm onSubmit={onSubmit}/>
      <div className="d-flex flex-column-reverse">
        <MemoSpinner show={showSpinner}/>
        {listOfMessages}
      </div>
    </>
  );
};

export default App;
