import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';

import { FavFilled, FavIcon } from 'assets/icons';
import colors from 'constants/colors';

interface HeartButtonProps {
    size?: number;
    isSelected: boolean;
    onPress: () => void;
}

const HeartButton: React.FC<HeartButtonProps> = ({ size = 48, isSelected, onPress }) => {
    const containerStyle: ViewStyle = {
        backgroundColor: isSelected ? colors.mediumPurple : colors.lavender,
        width: size,
        height: size,
        borderRadius: size / 2,
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.iconContainer, containerStyle]}
        >
            {isSelected ? <FavFilled /> : <FavIcon />}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HeartButton;
