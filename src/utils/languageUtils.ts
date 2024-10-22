import { NativeModules, Platform } from "react-native";

export const supportedLanguages = ['en', 'cs', 'de', 'es', 'fr', 'pt'];

export const getSupportedLanguage = (deviceLanguageCode: string) => {
    const primaryLanguageCode = deviceLanguageCode.slice(0, 2);

    return supportedLanguages.includes(primaryLanguageCode)
        ? primaryLanguageCode
        : 'en'; 
}

export const deviceLanguage = getSupportedLanguage(
    Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale || 
          NativeModules.SettingsManager.settings.AppleLanguages[0] 
        : NativeModules.I18nManager.localeIdentifier
);
