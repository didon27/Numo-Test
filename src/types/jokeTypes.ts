export interface JokeItem {
    id: number;
    joke?: string;
    setup?: string;
    delivery?: string;
    isLiked: boolean;
}

export interface JokesState {
    jokes: JokeItem[];
    jokesLoading: boolean;
    jokesError: string | null;
    jokeToday: JokeItem;
    jokeTodayLoading: boolean;
    jokeTodayError: string | null;
    likedJokeIds: number[];
}
