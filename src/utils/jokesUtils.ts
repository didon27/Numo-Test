import AsyncStorage from "@react-native-async-storage/async-storage";
import { LIKED_JOKE_IDS } from "constants/storage";
import { JokeItem } from "types/jokeTypes";

export const getJokeText = (item: JokeItem): string => {
    if (item.joke) {
        return item.joke;
    }

    if (item.setup && item.delivery) {
        return `${item.setup}\n${item.delivery}`;
    }

    return 'No joke available';
};

export const getLikedJokeIdsFromStorage = async (): Promise<number[]> => {
    try {
        const jsonValue = await AsyncStorage.getItem(LIKED_JOKE_IDS);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error('Error fetching liked jokes from AsyncStorage', e);
        return [];
    }
};