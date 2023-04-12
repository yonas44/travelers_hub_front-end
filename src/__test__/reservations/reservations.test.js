import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import store from '../../redux/configureStore';
import Reservations from '../../components/reservations/reservations';
import '@testing-library/jest-dom';

describe('Reservation component renders', () => {
  it('renders the reservations', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Reservations />
        </BrowserRouter>
      </Provider>,
    );

    expect(
      screen.getByText(/There are no bookings to display/),
    ).toBeInTheDocument();
  });

  it('It matches the snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <Reservations />
          </BrowserRouter>
        </Provider>,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
