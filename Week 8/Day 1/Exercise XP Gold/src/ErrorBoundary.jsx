import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('Error captured by ErrorBoundary:', error);
    console.error(errorInfo.componentStack);
  }

  occurError = () => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h3>Something went wrong.</h3>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
