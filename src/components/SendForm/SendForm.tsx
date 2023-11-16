import React, {ChangeEvent, FormEvent, useState} from 'react';
import {MessageFormType} from '../../types.d..ts';

interface Props {
  onSubmit: (message: MessageFormType) => void;
}

const MemoSendForm: React.FC<Props> = React.memo(function SendForm({onSubmit}) {
  const [message, setMessage] = useState<MessageFormType>({
    auhtor: '',
    message: '',
  });

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const onFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(message);
    event.target[1].value = '';
  };
  return (
    <>
      <form
        onSubmit={onFormSubmit}
      >
        <div className="mb-3">
          <label htmlFor="auhtor" className="form-label">Auhtor:</label>
          <input
            onChange={onChange}
            type="text"
            className="form-control"
            id="auhtor"
            name="auhtor"
            placeholder="Jhon Doe"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message:</label>
          <textarea
            onChange={onChange}
            className="form-control"
            id="message"
            name="message"
            rows="3"
            placeholder="My message"
          ></textarea>
          <button className="btn btn-success d-block ms-auto me-2 my-3">Send</button>
        </div>
      </form>
    </>
  );
});

export default MemoSendForm;