import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-maroon-950">
          <div className="text-center px-6">
            <h1 className="text-4xl font-serif font-bold text-brand-cream-100 mb-4">
              Something went wrong
            </h1>
            <p className="text-brand-cream-300 mb-8">
              We hit an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-brand-gold-600 hover:bg-brand-gold-500 text-brand-maroon-950 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
