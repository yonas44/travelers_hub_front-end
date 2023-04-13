import packageReducer, { fetchPackages } from '../redux/packageSlice';

describe('packageSlice', () => {
  describe('fetchPackages', () => {
    it('should fetch packages and update state correctly', async () => {
      const fakePackages = [
        { id: 1, name: 'Package 1' },
        { id: 2, name: 'Package 2' },
      ];
      const fakeResponse = { json: () => Promise.resolve(fakePackages) };
      global.fetch = jest.fn(() => Promise.resolve(fakeResponse));

      const initialState = { loading: false, flightpackage: [], error: '' };
      const dispatch = jest.fn();
      const getState = jest.fn(() => initialState);

      await fetchPackages()(dispatch, getState, undefined);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://127.0.0.1:3000/packages',
      );

      expect(
        packageReducer(initialState, fetchPackages.fulfilled(fakePackages)),
      ).toEqual({
        loading: false,
        message: '',
        flightpackage: fakePackages,
        error: '',
      });
    });

    it('should handle errors correctly', async () => {
      const fakeError = new Error('Something went wrong');
      global.fetch = jest.fn(() => Promise.reject(fakeError));

      const initialState = { loading: false, flightpackage: [], error: '' };
      const dispatch = jest.fn();
      const getState = jest.fn(() => initialState);

      await fetchPackages()(dispatch, getState, undefined);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://127.0.0.1:3000/packages',
      );

      expect(
        packageReducer(initialState, fetchPackages.rejected(fakeError)),
      ).toEqual({
        loading: false,
        flightpackage: [],
        error: fakeError.message,
      });
    });
  });
});
