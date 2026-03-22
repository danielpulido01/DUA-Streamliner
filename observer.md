# Observer Pattern Playbook (For Agents)

This guide explains how to reuse the current Observer pattern implementation to stream long-running progress updates to UI views through the hook layer, without blocking the UI.

## Goal

Use a shared observable state store so that:

1. A producer (manager/service) pushes progress updates.
2. Subscriber hooks react to those updates.
3. Views only consume hooks and re-render automatically.

This keeps business orchestration out of UI components.

## Reference Implementation

Use these files as the canonical pattern:

- `src/state/generation.types.ts`
- `src/state/generationProgressStore.ts`
- `src/state/generationManager.ts`
- `src/components/hooks/useGenerationProgress.ts`
- `src/components/hooks/useDuaGeneration.ts`
- `src/components/pages/GenerationProgressPage.tsx`

## Pattern Roles

### 1) State Contract (`*.types.ts`)

Define:

- Progress phases
- Run state (`idle`, `running`, `completed`, etc.)
- Progress snapshot shape
- `createInitial...State()` factory

Rule: keep this file purely declarative (types + initializer).

### 2) Observable Store (`*Store.ts`)

Must expose:

- `getState()`
- `subscribe(listener) => unsubscribe`
- `setState(next)`
- `patchState(partial)`
- `reset()`

Rule: listeners are stored in a `Set`, and `subscribe` must emit current state immediately.

### 3) Manager/Publisher (`*Manager.ts`)

Must expose:

- `start...()` to begin async work
- `cancel...()` (optional but recommended)
- `subscribe(...)` pass-through to store
- `get...Snapshot()` pass-through to store

Rule: start work asynchronously (`void this.run...()`) so UI thread is not blocked.

Business logic methods should be isolated and replaceable:

- `prepare...()` placeholder
- `persist...()` placeholder

### 4) Subscriber Hook (`use...Progress.ts`)

Hook responsibilities:

- seed state from manager snapshot
- subscribe on mount
- unsubscribe on unmount
- return current state only

Rule: no business logic inside subscriber hook.

### 5) Action Hook (`use...Generation.ts` or similar)

Hook responsibilities:

- expose `start...()` / `cancel...()`
- hold local start/cancel errors and loading flags
- delegate execution to manager

Rule: this hook is orchestration-facing, not rendering-facing.

### 6) View Component

Responsibilities:

- read progress from subscriber hook
- trigger actions via action hook
- render status/progress/errors

Rule: no direct service/store calls in view.

## Reuse Steps For New Flows

When implementing another long-running workflow (example: import, analysis, export):

1. Copy and rename the 3 state files (`types`, `store`, `manager`).
2. Replace phase names and status texts.
3. Keep the same observer API (`subscribe/getState/patchState`).
4. Create two hooks:
   - one subscriber hook (`useXProgress`)
   - one action hook (`useXActions` or `useXGeneration`)
5. Wire a page/view to those hooks only.
6. Replace placeholder methods with real business logic later.

## Minimal Agent Checklist

Before marking work complete, ensure:

- [ ] Store has unsubscribe support.
- [ ] `subscribe` emits snapshot immediately.
- [ ] Manager starts async work without blocking render.
- [ ] Progress updates are pushed through store (not polled in view).
- [ ] Hooks are the only interface used by UI.
- [ ] Placeholders are isolated for future real logic.

## Common Mistakes To Avoid

- Calling APIs directly from view components.
- Mutating shared state directly in hooks.
- Forgetting unsubscribe cleanup in hooks.
- Long `await` chains directly inside render paths.
- Putting business rules in `use...Progress` hook.

## Agent Copy Template

```ts
// store
type Listener<T> = (state: T) => void;
class XStore {
  private listeners = new Set<Listener<XState>>();
  private state: XState = createInitialXState();
  getState() { return this.state; }
  subscribe(listener: Listener<XState>) {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }
  patchState(partial: Partial<XState>) {
    this.state = { ...this.state, ...partial };
    for (const listener of this.listeners) listener(this.state);
  }
}
```

```ts
// manager
async function startX() {
  store.patchState({ runState: "running" });
  void runXAsync(); // non-blocking kickoff
}
```

```ts
// progress hook
function useXProgress() {
  const [state, setState] = useState(() => manager.getSnapshot());
  useEffect(() => manager.subscribe(setState), []);
  return state;
}
```

## Integration Note

If route wiring exists, map your view page to the correct route and guard. Keep route guards and permissions outside manager/store/hook internals.
