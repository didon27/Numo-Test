import { StyleSheet } from 'react-native';

import colors from 'constants/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderColor: colors.veryLightGray,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    loaderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemText: {
        flex: 1,
        marginRight: 20,
        lineHeight: 26,
        fontSize: 16,
        fontFamily: 'Inter-V',
        color: colors.black,
        fontWeight: '500',
    },
    list: {
        flex: 1,
    },
    errorText: {
        textAlign: 'center',
        margin: 20,
        color: colors.red,
    },
});
