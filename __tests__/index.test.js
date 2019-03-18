'use strict';

import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { bindElementToQueries } from 'dom-testing-library';
import 'jest-dom/extend-expect';

import Modal from '../src/index';

const bodyUtils = bindElementToQueries(document.body);

afterEach(cleanup);

test('Renders child render prop', () => {
  const { getByText } = render(
    <Modal modal={() => <div>Modal content</div>}>
      {() => <button>Open</button>}
    </Modal>
  );

  expect(getByText('Open')).toBeTruthy();
});

test('Opens modal on open button click', () => {
  const { getByText } = render(
    <Modal modal={() => <div>Modal content</div>}>
      {({ openModal }) => <button onClick={openModal}>Open</button>}
    </Modal>
  );

  fireEvent.click(getByText('Open'));

  expect(bodyUtils.queryByText('Modal content')).toBeTruthy();
});

test('Closes modal on close button click', () => {
  render(
    <Modal
      modal={({ closeModal }) => (
        <div>
          <h2>Modal content</h2>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
      isOpen={true}
    />
  );

  fireEvent.click(bodyUtils.getByText('Close'));

  expect(bodyUtils.queryByText('Modal content')).toBeFalsy();
});

test('Can set state from props', () => {
  render(<Modal isOpen={true} modal={() => <h2>Modal content</h2>} />);

  expect(bodyUtils.queryByText('Modal content')).toBeTruthy();
});

test('Closes modal on Escape key press', () => {
  render(<Modal isOpen={true} modal={() => <h2>Modal content</h2>} />);

  fireEvent.keyDown(document.body, {
    key: 'Escape',
    keyCode: 27,
  });

  expect(bodyUtils.queryByText('Modal content')).toBeFalsy();
});

test('Closes modal on click outside', () => {
  const { container } = render(
    <Modal isOpen={true} modal={() => <h2>Modal content</h2>} />
  );

  fireEvent.mouseDown(container);

  expect(bodyUtils.queryByText('Modal content')).toBeFalsy();
});

test('Renders with custom styles', () => {
  render(
    <Modal
      customStyles={styles => ({
        modal: {
          ...styles.modal,
          color: 'red',
        },
      })}
      isOpen={true}
      modal={() => <div>Modal content</div>}
    />
  );

  expect(bodyUtils.getByText('Modal content').parentNode).toHaveStyle(
    'color: red;'
  );
});
