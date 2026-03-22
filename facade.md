# Facade Pattern Runbook (Hooks -> Auth + HTTP)

## Goal

Expose a single service access surface for hooks while keeping auth and HTTP implementation details behind facades.

## Files to keep aligned

- `src/services/client.ts`
- `src/auth/authService.ts`
- `src/services/applicationFacade.ts`
- `src/components/hooks/useApplicationServices.ts`
- `src/components/hooks/useLogin.ts`
- `src/components/hooks/useLogout.ts`

## Contracts

1. HTTP facade contract (`client.ts`)
```ts
export interface HttpClientFacade {
  fetch(input: string, init?: RequestInit): Promise<Response>;
  authFetch(input: string, init?: RequestInit): Promise<Response>;
  json<T>(input: string, init?: RequestInit): Promise<T>;
  authJson<T>(input: string, init?: RequestInit): Promise<T>;
  // source/external helpers as needed
}
```

2. Auth facade contract (`authService.ts`)
```ts
export interface AuthServiceFacade {
  login(input: LoginInput): Promise<AuthSession | null>;
  logout(): Promise<void>;
  refreshSession(): Promise<AuthSession | null>;
  getCurrentSession(): Promise<AuthSession | null>;
  isAuthServiceError(reason: unknown): reason is AuthServiceError;
  isNoTenantAccessError(reason: unknown): reason is NoTenantAccessError;
  toErrorMessage(reason: unknown, fallbackMessage?: string): string;
}
```

3. App facade contract (`applicationFacade.ts`)
```ts
export interface ApplicationServiceFacade {
  readonly auth: AuthServiceFacade;
  readonly http: HttpClientFacade;
}
```

## Implementation Steps

1. In `src/services/client.ts`, keep low-level source client behavior intact, add `HttpClientFacade`, and export a singleton (`httpClientFacade`).
2. Keep legacy function exports (`apiFetch`, `authFetch`, etc.) but make them delegate to `httpClientFacade` for backward compatibility.
3. In `src/auth/authService.ts`, replace direct low-level client imports with `httpClientFacade`.
4. Add `AuthServiceFacade` + singleton (`authServiceFacade`) that delegates to `authService` and centralizes auth error guards.
5. Add `src/services/applicationFacade.ts` that composes `authServiceFacade` and `httpClientFacade`.
6. Add `src/components/hooks/useApplicationServices.ts` and return the app facade singleton.
7. Update hooks to consume `useApplicationServices()` instead of importing auth/http services directly.

## Placeholder Rule

When adding a new operation, add it to the relevant facade interface first, then implement a passthrough or placeholder body (`Promise.resolve(...)`) until business logic is ready.

## Checklist for New Agents

- Hooks import only `useApplicationServices` for service access.
- `authService.ts` only uses HTTP via `httpClientFacade`.
- `client.ts` exposes one facade entrypoint and keeps legacy helpers as delegates.
- New domains are added by extending facades, not by importing low-level clients in hooks.
