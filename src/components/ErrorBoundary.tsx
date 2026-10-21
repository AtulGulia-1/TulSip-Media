import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    // Operational errors are caught safely without exposing stack traces or internal paths in the UI.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-deep-dark text-light-beige flex flex-col items-center justify-center px-6 text-center font-general">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-3">
            TulSip Media
          </p>
          <h1 className="font-zentry text-4xl sm:text-5xl uppercase tracking-tight mb-4">
            Something Went Wrong
          </h1>
          <p className="max-w-md text-sm text-light-beige/80 leading-relaxed mb-8">
            We encountered an unexpected display issue. Please refresh the page or return to the homepage.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/"
              className="rounded-full bg-cta glow-cta px-6 py-3 text-xs font-bold uppercase tracking-wider text-deep-dark"
            >
              Return Home
            </a>
            <a
              href="/contact"
              className="rounded-full border border-royal-beige/40 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-light-beige"
            >
              Contact Us
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
