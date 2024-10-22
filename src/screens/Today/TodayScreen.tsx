import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';

import { Header, HeartButton } from 'components';
import { fetchJokeToday, toggleJokeLike } from 'store/jokes/jokesThunks';
import { useAppDispatch, useAppSelector } from 'store/store';
import { getJokeText } from 'utils/jokesUtils';
import colors from 'constants/colors';

import styles from './styles';

const TodayScreen = () => {
    const dispatch = useAppDispatch();
    const { jokeToday, jokeTodayLoading, jokeTodayError } = useAppSelector((state) => state.jokes);
    const [currentDate, setCurrentDate] = useState(new Date());

    const updateJokeIfNewDay = useCallback(() => {
        const now = new Date();
        if (now.getDate() !== currentDate.getDate()) {
            setCurrentDate(now);
            dispatch(fetchJokeToday());
        }
    }, [currentDate, dispatch]);

    useEffect(() => {
        dispatch(fetchJokeToday());
        const intervalId = setInterval(updateJokeIfNewDay, 60 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [dispatch, updateJokeIfNewDay]);

    const handleLikeToggle = useCallback((id: number) => {
        dispatch(toggleJokeLike(id));
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <Header title={'Today'} />
            {jokeTodayLoading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator
                        size="large"
                        color={colors.mediumPurple}
                    />
                </View>
            ) : jokeTodayError ? (
                <Text style={styles.errorText}>
                    {jokeTodayError}
                </Text>
            ) : <ScrollView
                bounces={false}
                contentContainerStyle={styles.contentContainer}
            >
                <Text style={styles.contentText}>
                    {getJokeText(jokeToday)}
                </Text>
                <HeartButton
                    isSelected={jokeToday.isLiked}
                    onPress={() => handleLikeToggle(jokeToday.id)}
                    size={64}
                />
            </ScrollView>}
        </View>
    );
};

export default TodayScreen;
