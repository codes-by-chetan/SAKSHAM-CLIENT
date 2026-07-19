import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { User } from "@/types/user";
import { AppSettings, LanguageCode } from "@/types/language";

const KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
  SETTINGS: "settings",
} as const;

/* -------------------------------------------------------------------------- */
/*                              Default Settings                              */
/* -------------------------------------------------------------------------- */

const DEFAULT_SETTINGS: AppSettings = {
  language: undefined,
  onboardingCompleted: false,
  theme: "system",
  notifications: true,
};

/* -------------------------------------------------------------------------- */
/*                            Internal Storage API                            */
/* -------------------------------------------------------------------------- */

async function setValue(
  key: string,
  value: string
): Promise<void> {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (error) {
    console.error(`Failed to save "${key}"`, error);
  }
}

async function getValue(
  key: string
): Promise<string | null> {
  try {
    if (Platform.OS === "web") {
      return await AsyncStorage.getItem(key);
    }

    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Failed to read "${key}"`, error);
    return null;
  }
}

async function removeValue(
  key: string
): Promise<void> {
  try {
    if (Platform.OS === "web") {
      await AsyncStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (error) {
    console.error(`Failed to remove "${key}"`, error);
  }
}

/* -------------------------------------------------------------------------- */
/*                                   User                                     */
/* -------------------------------------------------------------------------- */

export async function saveUser(
  user?: User
): Promise<void> {
  if (!user) return;

  await setValue(
    KEYS.USER,
    JSON.stringify(user)
  );
}

export async function getUser(): Promise<User | null> {
  try {
    const value = await getValue(KEYS.USER);

    if (!value) {
      return null;
    }

    return JSON.parse(value) as User;
  } catch (error) {
    console.error("Invalid user", error);
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/*                              Access Token                                  */
/* -------------------------------------------------------------------------- */

export async function saveAccessToken(
  token: string
): Promise<void> {
  await setValue(KEYS.ACCESS_TOKEN, token);
}

export async function getAccessToken(): Promise<string | null> {
  return getValue(KEYS.ACCESS_TOKEN);
}

/* -------------------------------------------------------------------------- */
/*                              Refresh Token                                 */
/* -------------------------------------------------------------------------- */

export async function saveRefreshToken(
  token: string
): Promise<void> {
  await setValue(KEYS.REFRESH_TOKEN, token);
}

export async function getRefreshToken(): Promise<string | null> {
  return getValue(KEYS.REFRESH_TOKEN);
}

/* -------------------------------------------------------------------------- */
/*                                 Settings                                   */
/* -------------------------------------------------------------------------- */

export async function saveSettings(
  settings: AppSettings
): Promise<void> {
  await setValue(
    KEYS.SETTINGS,
    JSON.stringify(settings)
  );
}

export async function getSettings(): Promise<AppSettings> {
  try {
    const value = await getValue(KEYS.SETTINGS);

    if (!value) {
      return DEFAULT_SETTINGS;
    }

    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(value),
    };
  } catch (error) {
    console.error(
      "Invalid settings",
      error
    );

    return DEFAULT_SETTINGS;
  }
}

/* -------------------------------------------------------------------------- */
/*                                Language                                    */
/* -------------------------------------------------------------------------- */

export async function saveLanguage(
  language: LanguageCode
): Promise<void> {
  const settings = await getSettings();

  await saveSettings({
    ...settings,
    language,
    onboardingCompleted: true,
  });
}

export async function getLanguage(): Promise<LanguageCode | undefined> {
  const settings = await getSettings();

  return settings.language;
}

/* -------------------------------------------------------------------------- */
/*                              Clear Session                                 */
/* -------------------------------------------------------------------------- */

export async function clearSession(): Promise<void> {
  await Promise.all([
    removeValue(KEYS.ACCESS_TOKEN),
    removeValue(KEYS.REFRESH_TOKEN),
    removeValue(KEYS.USER),
  ]);
}

/* -------------------------------------------------------------------------- */
/*                           Clear Everything                                 */
/* -------------------------------------------------------------------------- */

export async function clearAllStorage(): Promise<void> {
  await Promise.all([
    removeValue(KEYS.ACCESS_TOKEN),
    removeValue(KEYS.REFRESH_TOKEN),
    removeValue(KEYS.USER),
    removeValue(KEYS.SETTINGS),
  ]);
}