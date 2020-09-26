import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders exchange foreign currency page', () => {
  const { getByText } = render(<App />);
  const pageHeader = getByText(/Foreign Exchange Currency/i);
  expect(pageHeader).toBeInTheDocument();
});
