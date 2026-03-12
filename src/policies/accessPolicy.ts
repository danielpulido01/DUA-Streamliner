import { Permissions } from "./permissions";

export const accessPolicy = {
  canViewHome: [
    Permissions.SESSION_READ,
    Permissions.USER_PROFILE_READ,
    Permissions.FILES_READ,
    Permissions.ACTIVITY_READ,
  ],

  canViewFiles: [
    Permissions.FILES_READ,
  ],

  canUploadFiles: [
    Permissions.FILES_UPLOAD,
  ],

  canDeleteFiles: [
    Permissions.FILES_DELETE,
  ],

  canUploadDuaTemplate: [
    Permissions.DUA_TEMPLATE_UPLOAD,
  ],

  canGenerateDua: [
    Permissions.DUA_GENERATE,
    Permissions.FILES_UPLOAD,
    Permissions.DUA_TEMPLATE_UPLOAD,
  ],

  canMonitorGeneration: [
    Permissions.GENERATION_READ,
  ],

  canRefreshGeneration: [
    Permissions.GENERATION_REFRESH,
  ],

  canViewGenerationErrors: [
    Permissions.GENERATION_ERRORS_READ,
  ],

  canPreviewDua: [
    Permissions.DUA_PREVIEW,
  ],

  canConfirmDua: [
    Permissions.DUA_CONFIRM,
  ],

  canDownloadDua: [
    Permissions.DUA_DOWNLOAD,
  ],

  canManageUsers: [
    Permissions.USERS_READ,
    Permissions.USERS_CREATE,
    Permissions.USERS_UPDATE,
    Permissions.USERS_DELETE,
  ],

  canManageRoles: [
    Permissions.ROLES_READ,
    Permissions.ROLES_CREATE,
    Permissions.ROLES_UPDATE,
    Permissions.ROLES_DELETE,
  ],

  canAssignPermissions: [
    Permissions.PERMISSIONS_READ,
    Permissions.PERMISSIONS_ASSIGN,
  ],

  canReadAuditLog: [
    Permissions.ACTIVITY_AUDIT_READ,
  ],

  canManageSystemSettings: [
    Permissions.SYSTEM_SETTINGS_UPDATE,
  ],

  canCancelGeneration: [
    Permissions.GENERATION_CANCEL,
  ],
} as const;