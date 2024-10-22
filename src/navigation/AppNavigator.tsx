import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TextStyle, ViewStyle } from 'react-native';

import TodayScreen from 'screens/Today/TodayScreen';
import HistoryScreen from 'screens/History/HistoryScreen';
import { HistoryIcon, TodayIcon } from 'assets/icons';
import routeNames from 'constants/routeNames';
import colors from 'constants/colors';
import { useAppDispatch } from 'store/store';
import { loadLikedJokeIds } from 'store/jokes/jokesThunks';


const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
    const insets = useSafeAreaInsets();
    const dispatch = useAppDispatch();

    useEffect(() =>{
        const fetchLikedJokes = async () => {
            dispatch(loadLikedJokeIds())
        }

    fetchLikedJokes()
    }, [dispatch])

    const tabBarOptions: BottomTabNavigationOptions = {
        headerShown: false,
        tabBarStyle: {
            alignItems: 'center',
            height: 68 + insets.bottom,
            paddingTop: 10,
            backgroundColor: colors.white,
            borderTopWidth: 1,
            borderColor: colors.veryLightGray,
        } as ViewStyle,
        tabBarActiveTintColor: colors.mediumPurple,
        tabBarInactiveTintColor: colors.lightGray,
        tabBarLabelStyle: {
            fontWeight: '600',
            fontSize: 12,
            marginTop: 4,
            fontFamily: 'Inter-V',
        } as TextStyle,
        tabBarItemStyle: {
            flex:0,
            width: 60,
            height: 48,
            marginHorizontal: 16,
        } as ViewStyle,
    };

    const screenOptions = (Icon: React.ComponentType<any>): BottomTabNavigationOptions => ({
        tabBarIcon: ({ color }: { color: string }) => <Icon width={28} color={color} />,
    });

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={tabBarOptions}>
                <Tab.Screen
                    name={routeNames.today}
                    component={TodayScreen}
                    options={screenOptions(TodayIcon)}
                />
                <Tab.Screen
                    name={routeNames.history}
                    component={HistoryScreen}
                    options={screenOptions(HistoryIcon)}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
