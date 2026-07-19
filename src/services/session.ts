import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  getSettings,
} from "./storage";

import {
  refreshSession,
  validateSession,
} from "./auth";

export interface BootstrapResult {
  languageSelected: boolean;
  authenticated: boolean;
}

export async function bootstrap(): Promise<BootstrapResult> {
  try {
    /* ---------------------------------------------------------------------- */
    /*                            Check App Settings                          */
    /* ---------------------------------------------------------------------- */

    const settings = await getSettings();

    // User has never completed onboarding
    if (!settings.onboardingCompleted) {
      return {
        languageSelected: false,
        authenticated: false,
      };
    }

    /* ---------------------------------------------------------------------- */
    /*                            Check Access Token                          */
    /* ---------------------------------------------------------------------- */

    const [accessToken, refreshToken] = await Promise.all([
      getAccessToken(),
      getRefreshToken(),
    ]);

    if (!accessToken && !refreshToken) {
      return {
        languageSelected: true,
        authenticated: false,
      };
    }

    /* ---------------------------------------------------------------------- */
    /*                        Validate Existing Session                       */
    /* ---------------------------------------------------------------------- */

    const isValid = await validateSession();

    if (isValid) {
      return {
        languageSelected: true,
        authenticated: true,
      };
    }

    /* ---------------------------------------------------------------------- */
    /*                    Refresh Token (Future Backend)                      */
    /* ---------------------------------------------------------------------- */

    const refreshed = await refreshSession();

    if (refreshed) {
      return {
        languageSelected: true,
        authenticated: true,
      };
    }

    /* ---------------------------------------------------------------------- */
    /*                          Session Expired                               */
    /* ---------------------------------------------------------------------- */

    await clearSession();

    return {
      languageSelected: true,
      authenticated: false,
    };
  } catch (error) {
    console.error("Bootstrap failed", error);

    await clearSession();

    return {
      languageSelected: false,
      authenticated: false,
    };
  }
}
