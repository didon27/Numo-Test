import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { deviceLanguage } from 'utils/languageUtils';
import { setLikedJokeIds } from './jokesSlice';
import { getLikedJokeIdsFromStorage } from 'utils/jokesUtils';
import { LIKED_JOKE_IDS } from 'constants/storage';
import { api } from 'services/api';

export const fetchJokes = createAsyncThunk('jokes/fetchJokes', async () => {
    const response = await api.get(`joke/Any?amount=10&lang=${deviceLanguage}`);
    return response.data.jokes;
});

export const fetchJokeToday = createAsyncThunk('jokes/fetchJokeToday', async () => {
    const response = await api.get(`joke/Any?amount=1&lang=${deviceLanguage}`);
    return response.data;
});

export const loadLikedJokeIds = createAsyncThunk(
    'jokes/loadLikedJokeIds',
    async (_, { dispatch }) => {
        const likedJokeIds = await getLikedJokeIdsFromStorage();
        dispatch(setLikedJokeIds(likedJokeIds));
    }
);

export const toggleJokeLike = createAsyncThunk('jokes/toggleJokeLike', async (id: number) => {
    const likedJokeIds = JSON.parse(await AsyncStorage.getItem(LIKED_JOKE_IDS) || '[]');

    const isLiked = likedJokeIds.includes(id);
    if (isLiked) {
        const updatedLikes = likedJokeIds.filter((jokeId: number) => jokeId !== id);
        await AsyncStorage.setItem(LIKED_JOKE_IDS, JSON.stringify(updatedLikes));
        return { id, isLiked: false };
    } else {
        likedJokeIds.push(id);
        await AsyncStorage.setItem(LIKED_JOKE_IDS, JSON.stringify(likedJokeIds));
        return { id, isLiked: true };
    }
});
