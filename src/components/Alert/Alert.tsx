import React from 'react';
import {HTMLMotionProps, motion} from 'framer-motion';

interface Props extends React.PropsWithChildren {
  type: 'primary' | 'success' | 'danger' | 'warning';
  showWindow: boolean;
  onDismiss?: () => void;
  clickDismissable?: () => void;
}

interface StyleProps extends HTMLMotionProps<'div'> {
  opacity: number;
  x: number;
  display: string;
}

interface Variants {
  open: StyleProps;
  closed: StyleProps;
}

const alertVariants: Variants = {
  open: {opacity: 1, x: 0, display: 'block'},
  closed: {opacity: 0, x: -100, display: 'none'},
};

const Alert: React.FC<Props> = ({type, showWindow, clickDismissable, onDismiss, children}) => {
  const alertColor: string = `alert-${type}`;
  const className: string[] = ['alert', alertColor];

  let closeButton: React.ReactNode | null = (
    <button
      type="button"
      className="btn-close ms-auto"
      data-bs-dismiss="alert"
      aria-label="Close"
      onClick={() => onDismiss ? onDismiss() : undefined}
    ></button>);

  if (!onDismiss) {
    closeButton = null;
  }

  const visible: React.CSSProperties = {
    display: 'block'
  };
  if (!showWindow) {
    visible.display = 'none';
  }

  return (
    <motion.div
      animate={showWindow ? 'open' : 'closed'}
      variants={alertVariants ? alertVariants : {}}
      transition={{ease: 'easeOut', duration: 1}}
    >
      <div
        className={className.join(' ')}
        role="alert"
        onClick={() => clickDismissable ? clickDismissable() : undefined}
        style={visible}
      >
        <div className="d-flex">
          {children}
          {closeButton}
        </div>
      </div>
    </motion.div>
  );
};

export default Alert;