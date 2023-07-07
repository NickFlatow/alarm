import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  // const search = screen.getByTestId('searchbar');
  // search.value = 'apple';
  // document.getElementById('searchbar').value = 'apple';
  // const search = document.getElementById('searchbar').value;
  // expect(search).toBe('apple');
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
