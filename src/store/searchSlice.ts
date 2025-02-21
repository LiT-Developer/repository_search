import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Repository, SearchParams } from '../types/github';

interface SearchState {
  repositories: Repository[];
  error: string | null;
  isLoading: boolean;
}

const initialState: SearchState = {
  repositories: [],
  error: null,
  isLoading: false
};

export const searchRepositories = createAsyncThunk<
  Repository[],
  SearchParams,
  { rejectValue: string }
>(
  'search/searchRepositories',
  async (params: SearchParams, { rejectWithValue }) => {
    try {
      const response = await axios.get<Repository[]>(
        `https://api.github.com/users/${params.username}/repos`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.status === 404 
            ? 'Пользователь не найден' 
            : 'Произошла ошибка при поиске репозиториев'
        );
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchRepositories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchRepositories.fulfilled, (state, action: PayloadAction<Repository[]>) => {
        state.repositories = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(searchRepositories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;