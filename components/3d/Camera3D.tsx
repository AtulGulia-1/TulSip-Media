"use client";

import Spline from "@splinetool/react-spline";
import { Component, ReactNode } from "react";

type Camera3DProps = {
  sceneUrl: string;
  fallback?: ReactNode;
};

type BoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type BoundaryState = {
  hasError: boolean;
};

class SplineErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // Keep runtime parsing errors from crashing the page.
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }

    return this.props.children;
  }
}

export default function Camera3D({ sceneUrl, fallback }: Camera3DProps) {
  return (
    <SplineErrorBoundary fallback={fallback}>
      <Spline scene={sceneUrl} />
    </SplineErrorBoundary>
  );
}
