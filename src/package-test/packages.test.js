import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/configureStore';
import Package from '../pages/Package';

describe('Packages', () => {
  it('renders package component', () => {
    render(
      <Provider store={store}>
        <Package />
      </Provider>,
    );
    screen.getByRole('img', {
      name: /loading-giphy/i,
    });
  });
});
