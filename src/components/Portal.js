import React from 'react';
import ReactDOM from 'react-dom';
import { useAppendChild } from '../hooks';

function Portal({ children }) {
  const portalNode = React.useRef(document.createElement('div'));
  useAppendChild(document.body, portalNode);
  return ReactDOM.createPortal(children, portalNode.current);
}

export default Portal;
