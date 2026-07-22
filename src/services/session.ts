import {
  clearSession,
  getAccessToken,
  getRefreshToken,
  getSettings,
  getUser,
} from "./storage";

import {
  refreshSession,
  validateSession,
  getCurrentUser,
} from "./auth";
import { getActiveMembership } from "./organization";

export interface BootstrapResult {
  languageSelected: boolean;
  authenticated: boolean;
  mpinSet: boolean;
  hasWorkspace: boolean;
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
        mpinSet: false,
        hasWorkspace: false,
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
        mpinSet: false,
        hasWorkspace: false,
      };
    }

    /* ---------------------------------------------------------------------- */
    /*                        Validate Existing Session                       */
    /* ---------------------------------------------------------------------- */

    const isValid = await validateSession();

    if (!isValid && !(await refreshSession())) {
      await clearSession();

      return {
        languageSelected: true,
        authenticated: false,
        mpinSet: false,
        hasWorkspace: false,
      };
    }

    const user = await getCurrentUser();

    return {
      languageSelected: true,
      authenticated: true,
      mpinSet: user?.hasMpin ?? (await getUser())?.hasMpin ?? false,
      hasWorkspace: !!(await getActiveMembership()),
    };
  } catch (error) {
    console.error("Bootstrap failed", error);

    await clearSession();

    return {
      languageSelected: false,
      authenticated: false,
      mpinSet: false,
      hasWorkspace: false,
    };
  }
}
