# Singleton Runbook For Agents

This file is the operational guide to apply singleton style consistently in this repo.

## Already applied in this codebase

- `src/utils/logger.ts`
  - `ConsoleLogStrategy`
  - `RemoteLogStrategy`
  - `Logger`
- `src/utils/error-handler.ts`
  - `ErrorHandler`
- `src/auth/authService.ts`
  - `AuthService`
- `src/state/sessionManager.ts`
  - `SessionManager`

## When to apply here

Apply only if all are true:

1. One shared instance is desired app-wide.
2. Behavior must stay consistent across all consumers.
3. Class should not be recreated with different runtime config per feature.

## Do not apply here

Skip singleton for:

- Error objects (`*Error` classes): create per error event.
- React components (`*.tsx` class components): React manages lifecycle.
- Per-operation mutable workers (report formatters/generators with internal buffers).
- Classes expected to be composed with different options in tests/features (for example semantic analyzer implementations).
- `SourceHttpClient`: managed as per-source registry (multiton), not one global instance.

## Implementation recipe

For a candidate class, implement this exact structure:

```ts
export class MyService {
  private static instance: MyService | null = null;

  static getInstance() {
    if (!MyService.instance) {
      MyService.instance = new MyService();
    }
    return MyService.instance;
  }

  private constructor() {}

  // existing methods...
}

export const myService = MyService.getInstance();
```

## If constructor currently takes dependencies

Use lazy default dependencies inside `getInstance()` and keep one public exported instance.

```ts
static getInstance(dep: Dep = defaultDep) {
  if (!X.instance) {
    X.instance = new X(dep);
  }
  return X.instance;
}
```

## Migration steps for a new class

1. Add `private static instance` field.
2. Add `static getInstance(...)`.
3. Make constructor `private`.
4. Replace exported `new ClassName(...)` with `ClassName.getInstance(...)`.
5. Keep existing exported constant name to avoid call-site churn.

## Quick checks before finishing

Run:

```powershell
rg -n "new ClassName\(" src -S
```

Expected: only the `new ClassName(...)` inside `getInstance()` remains.

Also verify no existing consumers were forced to import the class directly when they were using the exported instance constant.
