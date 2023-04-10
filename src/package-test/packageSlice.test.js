import { fetchPackages } from '../redux/packageSlice';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

describe('packages slice', () => {
  describe('fetchPackages action', () => {
    let state;
    beforeEach(() => {
      state = createSlice({
        name: 'packages',
        initialState: {
          loading: false,
          flightpackage: [],
          error: '',
        },
        reducers: {},
        extraReducers: (builder) => {
          builder.addCase(fetchPackages.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(fetchPackages.fulfilled, (state, action) => {
            state.loading = false;
            state.flightpackage = action.payload;
          });
          builder.addCase(fetchPackages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
        },
      }).reducer;
    });

    it('should handle successful API call', async () => {
      const fakePackages = [{ id: 1, name: 'Package 1' }, { id: 2, name: 'Package 2' }];
      axios.get.mockResolvedValueOnce({ data: fakePackages });

      await fetchPackages()(jest.fn(), jest.fn(), undefined);

      expect(state.loading).toBe(false);
      expect(state.flightpackage).toEqual(fakePackages);
      expect(state.error).toBe('');
    });

    it('should handle API call failure', async () => {
      axios.get.mockRejectedValueOnce(new Error('Error fetching packages'));

      await fetchPackages()(jest.fn(), jest.fn(), undefined);

      expect(state.loading).toBe(false);
      expect(state.flightpackage).toEqual([]);
      expect(state.error).toBe('Error fetching packages');
    });

    it('should set loading flag to true on API call start', () => {
      const nextState = state(initialState, fetchPackages.pending());

      expect(nextState.loading).toBe(true);
    });
  });
});