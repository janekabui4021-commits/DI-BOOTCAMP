import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
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
    console.error('ErrorBoundary caught an error:', error);
    console.error(errorInfo.componentStack);

    this.setState({
      errorInfo,
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="card my-5 error-fallback">
          <h3>Something went wrong.</h3>
          <p>
            <strong>Error:</strong> {this.state.error && this.state.error.toString()}
          </p>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button onClick={this.handleReload}>Reload page</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
