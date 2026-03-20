export const Permissions = {
  AUTH_LOGIN: "auth.login",
  AUTH_LOGOUT: "auth.logout",

  SESSION_READ: "session.read",

  USER_PROFILE_READ: "user.profile.read",

  FILES_READ: "files.read",
  FILES_UPLOAD: "files.upload",
  FILES_DELETE: "files.delete",

  ACTIVITY_READ: "activity.read",

  DUA_TEMPLATE_UPLOAD: "dua.template.upload",
  DUA_TEMPLATE_VALIDATE: "dua.template.validate",

  DUA_GENERATE: "dua.generate",
  DUA_PREVIEW: "dua.preview",
  DUA_CONFIRM: "dua.confirm",
  DUA_DOWNLOAD: "dua.download",

  GENERATION_READ: "generation.read",
  GENERATION_REFRESH: "generation.refresh",
  GENERATION_ERRORS_READ: "generation.errors.read",
  GENERATION_CANCEL: "generation.cancel",

  USERS_READ: "users.read",
  USERS_CREATE: "users.create",
  USERS_UPDATE: "users.update",
  USERS_DELETE: "users.delete",

  ROLES_READ: "roles.read",
  ROLES_CREATE: "roles.create",
  ROLES_UPDATE: "roles.update",
  ROLES_DELETE: "roles.delete",

  PERMISSIONS_READ: "permissions.read",
  PERMISSIONS_ASSIGN: "permissions.assign",

  ACTIVITY_AUDIT_READ: "activity.audit.read",

  SYSTEM_SETTINGS_UPDATE: "system.settings.update",
} as const;

export type PermissionCode = (typeof Permissions)[keyof typeof Permissions];

export type PermissionOrWildcard = PermissionCode | "*";

export const permissionCodes = Object.values(Permissions) as PermissionCode[];

export function isPermissionCode(value: string): value is PermissionCode {
  return permissionCodes.includes(value as PermissionCode);
}