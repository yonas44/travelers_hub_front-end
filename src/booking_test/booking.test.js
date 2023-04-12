import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../';
import renderer from 'react-test-renderer';
import BookingPage from '../pages/BookingPage';
import '@testing-library/jest-dom';

describe('Booking component', () => {
  it('should match snapshot', () => {
    const tree = renderer
    .create(
      <Provider store={store}>
        <BrowserRouter>
          <BookingPage />
        </BrowserRouter>
      </Provider>,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

  it('should render booking object', () => {
    const startDate = 'Choose Start Date';
    const endDate = 'Choose End Date';
    const packages = [
      { title: 'Package1',
        description: 'Package description',
        destination: 'Package destination',
        price: 50,
        accomodation: 'Package accomodation',
        promotion: 0,
        user: 1 },
      { title: 'Package2',
        description: 'Package description',
        destination: 'Package destination',
        price: 50,
        accomodation: 'Package accomodation',
        promotion: 0,
        user: 1 },
    ];
    render(<BookingPage startDate={startDate} endDate={endDate} packages={packages.title} />);
    expect(screen.getByText(startDate)).toBeInTheDocument();
    expect(screen.getByText(endDate)).toBeInTheDocument();
    expect(screen.getByText(packages.title)).toBeInTheDocument();
  });
});