<GuestGuard>
  <LoginPage />
</GuestGuard>

<AuthGuard>
  <DashboardLayout>
    <HomePage />
  </DashboardLayout>
</AuthGuard>

<AuthGuard>
  <PermissionGuard required={["dua.generate"]}>
    <ConfigureGeneratorPage />
  </PermissionGuard>
</AuthGuard>