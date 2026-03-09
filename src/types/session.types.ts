export type PermissionCode =
  | "dua.read"
  | "dua.generate"
  | "dua.download"
  | "files.read"
  | "files.upload"
  | "activity.read";

export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
  roles: string[];
}

export interface AuthSession {
  user: AuthUser;
  permissions: PermissionCode[];
  isAuthenticated: boolean;
}