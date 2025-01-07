import { render, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { store } from 'src/redux/store';
import { ProductTableRow } from 'src/sections/@dashboard/e-commerce/product-list';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ProductTableRow Component', () => {
  const mockRow = {
    market_cap_rank: 1,
    name: 'Bitcoin',
    id: 'bitcoin',
    image: 'https://example.com/bitcoin.png',
    current_price: 50000,
    symbol: 'btc',
    market_cap: 1000000000,
    price_change_24h: 5,
    market_cap_change_24h: 1000000,
    price_change_percentage_24h: 10,
    sparkline_in_7d: { price: [100, 200, 300] },
    price_change_percentage_1h_in_currency: 1,
  };

  const renderComponent = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <HelmetProvider>
            <ProductTableRow row={mockRow} />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    );

  test('Button should be clickable', () => {
    const mockNavigate = require('react-router-dom').useNavigate();
    const { getByTestId } = renderComponent();

    const buttonBase = getByTestId('navigate-button');

    fireEvent.click(buttonBase);

    expect(buttonBase).toBeInTheDocument();
  });
});
