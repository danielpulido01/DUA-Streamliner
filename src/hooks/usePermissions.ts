Responsibilities:

check if user has permission

check if user has all required permissions

check if user has at least one permission

Example API:

{
  hasPermission,
  hasAnyPermission,
  hasAllPermissions
}

Example usage:

const { hasPermission } = usePermissions();

{hasPermission("dua.generate") && <StartGenerationButton />}