'use strict';

import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import { bindElementToQueries } from 'dom-testing-library';
import 'jest-dom/extend-expect';

import Modal from '../src/index';

const bodyUtils = bindElementToQueries(document.body);

afterEach(cleanup);

test('Renders child render prop', () => {
  const { getByText } = render(<Modal>{() => <button>Open</button>}</Modal>);

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
  const { getByText } = render(
    <Modal
      modal={({ closeModal }) => (
        <div>
          <h2>Modal content</h2>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    >
      {({ openModal }) => <button onClick={openModal}>Open</button>}
    </Modal>
  );

  fireEvent.click(getByText('Open'));
  fireEvent.click(bodyUtils.getByText('Close'));

  expect(bodyUtils.queryByText('Modal content')).toBeFalsy();
});
