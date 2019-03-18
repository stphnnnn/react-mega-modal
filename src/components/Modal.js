import React from 'react';
import PropTypes from 'prop-types';

import { useKeyPress, useOnClickOutside, useFocusOnTrigger } from '../hooks';

import Portal from './Portal';

function Modal({ children, modal, isOpen, customStyles }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const modalRef = React.useRef(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const styles = {
    ...defaultStyles,
    ...(customStyles ? customStyles(defaultStyles) : {}),
  };

  useKeyPress('Escape', closeModal);
  useOnClickOutside(modalRef, closeModal);
  useFocusOnTrigger(modalRef, isModalOpen);

  React.useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <React.Fragment>
      {children && children({ openModal })}
      {isModalOpen && (
        <Portal>
          <div style={styles.modal} ref={modalRef} tabIndex={0}>
            {modal({ closeModal })}
          </div>
        </Portal>
      )}
    </React.Fragment>
  );
}

const defaultStyles = {
  modal: {
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
    background: 'rgba(0, 0, 0, 0.5)',
  },
};

Modal.propTypes = {
  children: PropTypes.func,
  modal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  customStyles: PropTypes.func,
};

export default Modal;
