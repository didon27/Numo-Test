import React, { useEffect, useCallback, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, I18nManager } from 'react-native';

import { fetchJokes, toggleJokeLike } from 'store/jokes/jokesThunks';
import { useAppDispatch, useAppSelector } from 'store/store';
import { Header, HeartButton } from 'components';
import { JokeItem } from 'types/jokeTypes';
import colors from 'constants/colors';
import { getJokeText } from 'utils/jokesUtils';

import styles from './styles';

const JokeItemComponent: React.FC<{ item: JokeItem; onLikeToggle: () => void }> = React.memo(({ item, onLikeToggle }) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
                {getJokeText(item)}
            </Text>
            <HeartButton onPress={onLikeToggle} isSelected={item.isLiked} />
        </View>
    );
});

const HistoryScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const { jokes, jokesLoading, jokesError } = useAppSelector((state) => state.jokes);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        dispatch(fetchJokes());
    }, [dispatch]);

    const handleLikeToggle = useCallback((id: number) => {
        dispatch(toggleJokeLike(id));
    }, [dispatch]);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(fetchJokes()).finally(() => setRefreshing(false));
    }, [dispatch]);

    const renderJokeItem = useCallback(
        ({ item }: { item: JokeItem }) => (
            <JokeItemComponent item={item} onLikeToggle={() => handleLikeToggle(item.id)} />
        ),
        [handleLikeToggle]
    );

    return (
        <View style={styles.container}>
            <Header title={'History'} />
            {jokesLoading && !refreshing ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator
                        size="large"
                        color={colors.mediumPurple}
                    />
                </View>
            ) : jokesError ? (
                <Text style={styles.errorText}>
                    {jokesError}
                </Text>
            ) : (
                <FlatList
                    data={jokes}
                    renderItem={renderJokeItem}
                    keyExtractor={(item) => item.id.toString()}
                    initialNumToRender={5}
                    windowSize={10}
                    removeClippedSubviews={true}
                    style={styles.list}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                />
            )}
        </View>
    );
};

export default HistoryScreen;
