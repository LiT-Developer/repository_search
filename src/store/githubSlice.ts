import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Repository } from '../types/github';

interface GithubState {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  username: string;
  page: number;
  hasMore: boolean;
}

interface FetchReposParams {
  username: string;
  page: number;
}

const initialState: GithubState = {
  repositories: [],
  loading: false,
  error: null,
  username: '',
  page: 1,
  hasMore: true
};

export const fetchUserRepos = createAsyncThunk<
  Repository[],
  FetchReposParams,
  { rejectValue: string }
>(
  'github/fetchUserRepos',
  async ({ username, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get<Repository[]>(
        `https://api.github.com/users/${username}/repos`,
        {
          params: {
            per_page: 20,
            page
          }
        }
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

const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.repositories = [];
      state.page = 1;
      state.hasMore = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserRepos.fulfilled, (state, action) => {
        if (state.page === 1) {
          state.repositories = action.payload;
        } else {
          state.repositories = [...state.repositories, ...action.payload];
        }
        state.loading = false;
        state.hasMore = action.payload.length === 20;
        state.page = state.page + 1;
      })
      .addCase(fetchUserRepos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Произошла ошибка';
      });
  }
});

export const { setUsername } = githubSlice.actions;
export default githubSlice.reducer; 