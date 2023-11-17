import {useEffect, useState} from 'react';
import MemoMessage from '../components/Message/Message.tsx';
import {MessageFormType, MessageType} from '../types.d..ts';
import MemoSpinner from '../components/Spinner/Spinner.tsx';
import MemoSendForm from '../components/SendForm/SendForm.tsx';
import FormatDate from '../components/FormatDate/FormatDate.ts';

const baseUrl = (time: string = ''): string => `http://146.185.154.90:8000/messages${time}`;
let lastMessageTime: string = '';
let interval: number;

const App = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {
    const run = async () => {
      setShowSpinner(true);
      void await getData(baseUrl());
      setShowSpinner(false);
      interval = setInterval(() => {
        void getData(baseUrl(lastMessageTime));
      }, 3000);
    };

    void run();
  }, []);

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
      alert(e.message);
    }
  };

  const onSubmit = async (message: MessageFormType) => {
    clearInterval(interval);
    const data: URLSearchParams = new URLSearchParams();
    data.set('message', message.message);
    data.set('author', message.auhtor);

    const response: Response = await fetch(baseUrl(), {
      method: 'post',
      body: data,
    });
    interval = setInterval(() => {
      void getData(baseUrl(lastMessageTime));
    }, 3000);

  };

  const listOfMessages: MemoMessage[] = messages.map((message) => {
    const date = new FormatDate(message.datetime);
    return (<MemoMessage
      key={message._id}
      auhtor={message.author}
      message={message.message}
      date={date.getDate()}
    />);
  });

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
