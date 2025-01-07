import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import CoinsList from '../pages/dashboard/CoinsList';
import { store } from 'src/redux/store';

describe('CoinsList Component', () => {
  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HelmetProvider>
            <CoinsList />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

  test('renders tabs correctly', () => {
    renderComponent();

    expect(screen.getByText(/auth_all/i)).toBeInTheDocument();
    expect(screen.getByText(/High Lights/i)).toBeInTheDocument();
    expect(screen.getByText(/Categories/i)).toBeInTheDocument();
  });

  test('renders table headers correctly', () => {
    renderComponent();

    const headers = ['#', 'Coins', 'Price', '1h', '24h', '24h Volume', 'Market Cap', 'Actions'];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  test('handles filter by name', () => {
    renderComponent();

    const input = screen.getByPlaceholderText(/Search/i);
    fireEvent.change(input, { target: { value: 'Bitcoin' } });

    expect(screen.getByDisplayValue('Bitcoin')).toBeInTheDocument();
  });

  test('handles pagination changes', () => {
    renderComponent();

    const nextPageButton = screen.getByRole('button', { name: /next/i });
    fireEvent.click(nextPageButton);

    expect(screen.getByText(/3/i)).toBeInTheDocument();
  });
});
