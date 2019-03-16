import React from 'react';
import Portal from './Portal';
import {
  useKeyPress,
  useOnClickOutside,
  useFocusOnTrigger,
  useLockBodyScroll,
} from '../hooks';

function Modal({ children, modal }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const modalRef = React.useRef(null);

  useKeyPress('Escape', () => setIsModalOpen(false));
  useOnClickOutside(modalRef, () => setIsModalOpen(false));
  useLockBodyScroll();
  useFocusOnTrigger(modalRef, isModalOpen);

  return (
    <React.Fragment>
      {children({
        openModal: () => setIsModalOpen(true),
      })}
      {isModalOpen && (
        <Portal>
          <div style={defaultStyles}>
            <div ref={modalRef} tabIndex={0}>
              {modal({
                closeModal: () => setIsModalOpen(false),
              })}
            </div>
          </div>
        </Portal>
      )}
    </React.Fragment>
  );
}

const defaultStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(0,0,0,0.5)',
};

export default Modal;
