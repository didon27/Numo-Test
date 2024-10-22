import { StyleSheet } from 'react-native';

import colors from 'constants/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    contentText: {
        color: colors.black,
        fontSize: 24,
        fontWeight: '600',
        fontFamily: 'Inter-V',
        lineHeight: 38,
        marginBottom: 16

    },
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        textAlign: 'center',
        margin: 20,
        color: colors.red,
    },
});
