# ✨ React Mega Modal

React Mega Modal is a simple modal component for React.

## Basic Usage

1. The easiest way to use react-mega-modal is to install it from npm:

`npm i react-mega-modal`

2. Then use it in your react app:

```jsx
import React from 'react';
import Modal from 'react-mega-modal';

const App = () => (
  <Modal
    modal={({ closeModal }) => (
      <div>
        <h1>This is the modal content</h1>
        <button onClick={closeModal}>Close</button>
      </div>
    )}
  >
    {({ openModal }) => <button onClick={openModal}>Open</button>}
  </Modal>
);
```
