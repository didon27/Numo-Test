import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchJokes, fetchJokeToday, toggleJokeLike } from './jokesThunks';
import { JokeItem, JokesState } from 'types/jokeTypes';

const initialState: JokesState = {
  jokes: [],
  jokesLoading: false,
  jokesError: null,
  jokeToday: {
    id: 0,
    isLiked: false
  },
  jokeTodayLoading: false,
  jokeTodayError: null,
  likedJokeIds: [],
};

const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {
    setLikedJokeIds(state, action) {
      state.likedJokeIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJokes.fulfilled, (state, action: PayloadAction<JokeItem[]>) => {
        state.jokes = action.payload.map(joke => ({
          ...joke,
          isLiked: state.likedJokeIds.includes(joke.id),
        }));
        state.jokesLoading = false;
        state.jokesError = null;
      })
      .addCase(fetchJokes.pending, (state) => {
        state.jokesLoading = true;
      })
      .addCase(fetchJokes.rejected, (state, action) => {
        state.jokesLoading = false;
        state.jokesError = action.error.message || 'Error fetching jokes';
      })
      .addCase(fetchJokeToday.fulfilled, (state, action: PayloadAction<JokeItem>) => {
        state.jokeToday = {
          ...action.payload,
          isLiked: state.likedJokeIds.includes(action.payload.id),
        };
        state.jokeTodayLoading = false;
      })
      .addCase(fetchJokeToday.pending, (state) => {
        state.jokeTodayError = null;
        state.jokeTodayLoading = true;
      })
      .addCase(fetchJokeToday.rejected, (state, action) => {
        state.jokeTodayLoading = false;
        state.jokeTodayError = action.error.message || 'Error fetching jokes';
      })
      .addCase(toggleJokeLike.fulfilled, (state, action: PayloadAction<{ id: number; isLiked: boolean }>) => {
        const { id, isLiked } = action.payload;

        if (isLiked) {
          state.likedJokeIds.push(id);
        } else {
          state.likedJokeIds = state.likedJokeIds.filter((jokeId) => jokeId !== id);
        }

        const joke = state.jokes.find(joke => joke.id === id);
        if (joke) {
          joke.isLiked = isLiked;
        }

        if(state.jokeToday.id === id) {
          state.jokeToday.isLiked = isLiked
        } 
      });
  },
});

export const { setLikedJokeIds } = jokesSlice.actions;
export default jokesSlice.reducer;
