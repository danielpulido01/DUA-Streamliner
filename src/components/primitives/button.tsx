// src/components/primitives/button.tsx
import "./button.css";

export function Button({ children }: { children: React.ReactNode }) {
  return <button className="btn">{children}</button>;
}
