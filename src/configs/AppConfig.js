import {
  SIDE_NAV_LIGHT,
  NAV_TYPE_SIDE,
  DIR_LTR,
} from "constants/ThemeConstant";
import { env } from "./EnvironmentConfig";

export const APP_NAME = "MobileApps";
export const API_BASE_URL = env.API_ENDPOINT_URL;
export const APP_PREFIX_PATH = "/app";
export const AUTH_PREFIX_PATH = "/auth";
export const REGISTER_PREFIX_PATH = "/users";
export const REDIRECT_URL_KEY = "redirect";
export const AUTHENTICATED_ENTRY = `${APP_PREFIX_PATH}/dashboards/default`;
export const UNAUTHENTICATED_ENTRY = "/login";
export const REGISTER_ENTRY_KEY = "ADMIN450368";

export const THEME_CONFIG = {
  navCollapsed: false,
  sideNavTheme: SIDE_NAV_LIGHT,
  locale: "fr",
  navType: NAV_TYPE_SIDE,
  topNavColor: "#fff",
  headerNavColor: "",
  mobileNav: false,
  currentTheme: "light",
  direction: DIR_LTR,
  blankLayout: false,
};
