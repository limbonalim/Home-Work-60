import React from 'react';
import {Spinner} from 'react-bootstrap';

interface Props {
  show: boolean;
}

const SpinnerMemo: React.FC<Props> = React.memo(function SpinnerMemo({show}) {
  const visible: React.CSSProperties = {
    display: 'none',
  };
  if (show) {
    visible.display = 'block';
  }
  return (
    <div
      style={visible}
      className="mx-auto my-3"
    >
      <Spinner animation="grow" variant="primary"/>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.show === nextProps.show;
});

export default SpinnerMemo;