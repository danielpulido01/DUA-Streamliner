import { Permissions } from "./permissions";

export const accessPolicy = {
  canViewHome: [Permissions.FILES_READ, Permissions.ACTIVITY_READ],
  canGenerateDua: [Permissions.DUA_GENERATE, Permissions.FILES_UPLOAD],
  canDownloadDua: [Permissions.DUA_DOWNLOAD],
};