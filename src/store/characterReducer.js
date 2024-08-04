import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Api from '../Api/Api';

export const fetchCharacters = createAsyncThunk(
  'fetchCharacters',
  async () => {
    const response = await Api.getCharacters();
    return response;
  }
);

const characterSlice = createSlice({
  name: 'characters',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoader = true;
        state.isError = false;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state) => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});

export default characterSlice.reducer;
