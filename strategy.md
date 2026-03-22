# Strategy Pattern Runbook (Unauthorized Handling)

This file explains how to reuse the strategy-based unauthorized/session protection implementation.

## Reference files

- `src/services/httpInterceptors.ts`
- `src/services/unauthorizedHandlingStrategy.ts`

## What is fixed and what is swappable

- Fixed:
  - Consumers still call `interceptHttpResponse(...)` the same way.
  - `handleUnauthorized` option still gates 401 handling.
- Swappable:
  - 401 unauthorized behavior is resolved through a strategy (`UnauthorizedHandlingStrategy`).

## Contract to follow

Implement this interface:

```ts
export interface UnauthorizedHandlingStrategy {
  readonly name: string;
  shouldHandle(input: UnauthorizedHandlingInput): boolean;
  handle(input: UnauthorizedHandlingInput): void;
}
```

## Current default strategy (HTTP-only cookie flow)

- Class: `HttpOnlyCookieUnauthorizedHandlingStrategy`
- Behavior:
  - Skips auth bootstrap endpoints (`/api/auth/login|refresh|forgot-password|reset-password`)
  - Calls `sessionManager.handleUnauthorized()`
- This preserves the existing cookie-based session flow.

## How to add a new mechanism

1. Create a new class implementing `UnauthorizedHandlingStrategy` in `src/services/unauthorizedHandlingStrategy.ts` (or a sibling strategy file).
2. Keep `shouldHandle(...)` and `handle(...)` methods, even if logic is placeholder at first.
3. Register globally when needed:

```ts
setUnauthorizedHandlingStrategy(new YourUnauthorizedHandlingStrategy());
```

4. Optional per-call override (without changing existing consumers):

```ts
interceptHttpResponse(response, request, {
  handleUnauthorized: true,
  unauthorizedStrategy: new YourUnauthorizedHandlingStrategy(),
});
```

## Minimal template for future strategies

```ts
class YourUnauthorizedHandlingStrategy implements UnauthorizedHandlingStrategy {
  readonly name = "your-strategy-name";

  shouldHandle({ request }: UnauthorizedHandlingInput) {
    // placeholder
    return true;
  }

  handle({ request }: UnauthorizedHandlingInput) {
    // placeholder
  }
}
```

## Guardrails for agents

- Do not call `sessionManager.handleUnauthorized()` directly from `httpInterceptors.ts`.
- Keep 401 decision + execution inside strategy methods.
- Keep the default strategy as HTTP-only cookie session behavior.
- Add new behavior by adding/replacing strategy implementations, not by changing interceptor consumers.
