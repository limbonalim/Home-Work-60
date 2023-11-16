import React from 'react';

interface Props {
  auhtor: string;
  date: string;
  message: string;
}

const MemoMessage: React.FC<Props> = React.memo(function Message({auhtor, date, message}) {
  return (
    <div className="alert alert-success p-0" role="alert">
      <div className="d-flex justify-content-between border-bottom border-primary px-2 pt-1">
        <span>{auhtor}</span>
        <span>{date}</span>
      </div>
      <div className="p-3 ">
        {message}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (prevProps.message === nextProps.message) && (prevProps.date === nextProps.date) && (prevProps.auhtor === nextProps.auhtor);
});

export default MemoMessage;