import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import colors from 'constants/colors';

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <SafeAreaView style={styles.header}>
            <Text style={styles.headerText}>
                {title}
            </Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: colors.veryLightGray,
    },
    headerText: {
        margin: 24,
        marginTop: 64,
        fontSize: 36,
        fontFamily: 'Inter-V',
        color: colors.black,
        fontWeight: '700',
    },
});

export default Header;
