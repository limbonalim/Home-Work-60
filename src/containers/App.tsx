import {useEffect, useState} from 'react';
import MemoMessage from '../components/Message/Message.tsx';
import {MessageFormType, MessageType} from '../types.d..ts';
import MemoSpinner from '../components/Spinner/Spinner.tsx';
import MemoSendForm from '../components/SendForm/SendForm.tsx';

const url = 'http://146.185.154.90:8000/messages';

const App = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setShowSpinner(true);
        const response: Response = await fetch(url);
        if (response.ok) {
          const messages: MessageType[] = await response.json();
          setMessages(messages);
        }
        setShowSpinner(false);
      } catch (e: Error) {
        alert(e);
      }

    };

    void getData();
  }, []);

  const onSubmit = async (message: MessageFormType) => {
    console.log(message);
    const data: URLSearchParams = new URLSearchParams();
    data.set('message', message.message);
    data.set('author', message.auhtor);

    const response: Response = await fetch(url, {
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
