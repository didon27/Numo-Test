import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import store from 'store/store';
import AppNavigator from 'navigation/AppNavigator';

const App = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <AppNavigator />
            </SafeAreaProvider>
        </Provider>
    );
};

export default App;