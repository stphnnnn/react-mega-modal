import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { useAppendChild, useLockBodyScroll } from '../hooks';

function Portal({ children }) {
  const portalNode = React.useRef(document.createElement('div'));
  useAppendChild(document.body, portalNode);
  return ReactDOM.createPortal(children, portalNode.current);
}

Portal.propTypes = {
  children: PropTypes.node,
};

export default Portal;
