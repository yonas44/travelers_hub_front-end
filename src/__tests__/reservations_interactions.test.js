import { fireEvent, render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Reservations from '../components/reservations/reservations';
import store from '../redux/configureStore';

// Mock API calls
const handlers = [
  rest.get('http://127.0.0.1:3000/bookings', (req, res, ctx) => res(
    ctx.json([
      {
        id: 272,
        user_id: 2,
        package: {
          id: 2,
          user_id: 2,
          title: 'Wanka Resort',
          description: 'Random place with nice views',
          destination: 'Madagascar',
          photo: ['http://image1.png', 'http://image2.png'],
          flight: true,
          price: '3400.0',
          bus: false,
          accomodation: 't',
          promotion: 0,
          created_at: '2023-04-08T19:17:36.261Z',
          updated_at: '2023-04-08T19:17:36.261Z',
        },
      },
      {
        id: 273,
        user_id: 1,
        package: {
          id: 2,
          user_id: 2,
          title: 'Figi Resort',
          description: 'Random place with nice views',
          destination: 'Kenya',
          photo: ['http://image1.png', 'http://image2.png'],
          flight: true,
          price: '3400.0',
          bus: false,
          accomodation: 't',
          promotion: 0,
          created_at: '2023-04-08T19:17:36.261Z',
          updated_at: '2023-04-08T19:17:36.261Z',
        },
      },
    ]),
  )),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => {
  server.listen();
  sessionStorage.setItem('user', JSON.stringify({ token: 'sometoken_here' }));
  sessionStorage.setItem('current', JSON.stringify({ id: 2 }));
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => {
  server.close();
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('current');
});

describe('Reservation component renders', () => {
  it('renders the reservations', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Reservations />
        </BrowserRouter>
      </Provider>,
    );

    expect(await screen.findByText(/Madagascar/)).toBeInTheDocument();
  });

  it('filters based on the search', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Reservations />
        </BrowserRouter>
      </Provider>,
    );

    fireEvent.change(await screen.findByTestId('search-bar'), {
      target: { value: 'wanka' },
    });

    expect(screen.queryByText(/Kenya/)).not.toBeInTheDocument();
  });
});
