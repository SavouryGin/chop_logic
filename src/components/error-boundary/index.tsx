import React, { ErrorInfo } from 'react';

interface IErrorBoundaryProps {
  children: React.ReactElement;
}

interface IErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error, errorInfo: ErrorInfo): IErrorBoundaryState {
    return { hasError: true, error, errorInfo };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h3>Something went wrong... </h3>
          <p>{this.state.error && this.state.error.toString()}</p>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
