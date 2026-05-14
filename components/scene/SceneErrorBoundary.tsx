"use client";

import { Component, type ReactNode } from "react";

type Props = {
  fallback: ReactNode;
  label?: string;
  children: ReactNode;
};

type State = { hasError: boolean };

export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn(
      `[${this.props.label ?? "Scene"}] caught error, using fallback:`,
      error
    );
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}
