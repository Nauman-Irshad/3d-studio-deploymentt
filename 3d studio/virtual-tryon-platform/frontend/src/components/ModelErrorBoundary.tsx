import { Component, type ReactNode } from "react";

type P = { children: ReactNode; fallback: ReactNode };
type S = { err: boolean };

export class ModelErrorBoundary extends Component<P, S> {
  state: S = { err: false };

  static getDerivedStateFromError(): S {
    return { err: true };
  }

  render() {
    return this.state.err ? this.props.fallback : this.props.children;
  }
}
