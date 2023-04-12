import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../../redux/configureStore';
import renderer from 'react-test-renderer';
import BookingPage from '../../pages/BookingPage';
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

  
});