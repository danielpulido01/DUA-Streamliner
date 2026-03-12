import { accessPolicy } from "../policies/accessPolicy";
import { usePermissions } from "./usePermissions";

type PolicyName = keyof typeof accessPolicy;

export const usePolicies = () => {
  const { hasPermission, hasAllPermissions, hasAnyPermission, permissions } = usePermissions();

  const hasAccess = (policyName: PolicyName): boolean => {
    const requiredPermissions = accessPolicy[policyName] ?? [];
    return requiredPermissions.every((permission) => hasPermission(permission));
  };

  const hasSomeAccess = (policyName: PolicyName): boolean => {
    const requiredPermissions = accessPolicy[policyName] ?? [];
    return requiredPermissions.some((permission) => hasPermission(permission));
  };

  const getMissingPermissions = (policyName: PolicyName): string[] => {
    const requiredPermissions = accessPolicy[policyName] ?? [];
    return requiredPermissions.filter((permission) => !hasPermission(permission));
  };

  return {
    policies: accessPolicy,
    permissions,
    hasAccess,
    hasSomeAccess,
    getMissingPermissions,
    hasAllPermissions,
    hasAnyPermission,
  };
};