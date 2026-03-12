import { Permissions } from "./permissions";
import { Roles } from "./roles";

export const rolePermissions = {
  [Roles.ADMIN]: ["*"],

  [Roles.OPERATOR]: [
    Permissions.AUTH_LOGIN,
    Permissions.AUTH_LOGOUT,
    Permissions.SESSION_READ,
    Permissions.USER_PROFILE_READ,
    Permissions.FILES_READ,
    Permissions.FILES_UPLOAD,
    Permissions.ACTIVITY_READ,
    Permissions.DUA_TEMPLATE_UPLOAD,
    Permissions.DUA_TEMPLATE_VALIDATE,
    Permissions.DUA_GENERATE,
    Permissions.GENERATION_READ,
    Permissions.GENERATION_REFRESH,
    Permissions.GENERATION_ERRORS_READ,
    Permissions.DUA_PREVIEW,
    Permissions.DUA_DOWNLOAD,
  ],

  [Roles.REVIEWER]: [
    Permissions.AUTH_LOGIN,
    Permissions.AUTH_LOGOUT,
    Permissions.SESSION_READ,
    Permissions.USER_PROFILE_READ,
    Permissions.FILES_READ,
    Permissions.ACTIVITY_READ,
    Permissions.DUA_PREVIEW,
    Permissions.DUA_CONFIRM,
    Permissions.DUA_DOWNLOAD,
    Permissions.GENERATION_READ,
    Permissions.GENERATION_REFRESH,
    Permissions.GENERATION_ERRORS_READ,
  ],

  [Roles.VIEWER]: [
    Permissions.AUTH_LOGIN,
    Permissions.AUTH_LOGOUT,
    Permissions.SESSION_READ,
    Permissions.USER_PROFILE_READ,
    Permissions.FILES_READ,
    Permissions.ACTIVITY_READ,
    Permissions.GENERATION_READ,
  ],
} as const;