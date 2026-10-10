import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-neutral-50)]">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-[var(--color-neutral-900)] mb-4">
              Kutilmagan xatolik yuz berdi
            </h1>
            <p className="text-[var(--color-neutral-700)] mb-6">
              Iltimos, sahifani qayta yuklang yoki keyinroq urinib ko'ring.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.href = '/';
              }}
              className="px-6 py-3 bg-[var(--color-brand-700)] text-[var(--color-neutral-0)] rounded hover:bg-[var(--color-brand-700)] transition-colors"
            >
              Bosh sahifaga qaytish
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
