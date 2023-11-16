import React from 'react';

interface Props {
  show: boolean;
}

const SpinnerMemo: React.FC<Props> = React.memo(function Spinner({show}) {
  const visible: React.CSSProperties = {
    display: 'none',
  };
  if (show) {
    visible.display = 'block';
  }
  return (
    <div
      style={visible}
      className="spinner-border text-primary mx-auto my-3"
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.show === nextProps.show;
});

export default SpinnerMemo;