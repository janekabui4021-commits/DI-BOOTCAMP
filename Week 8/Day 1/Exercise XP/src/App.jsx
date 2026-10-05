import React, { Component, useState } from 'react';

class BuggyCounter extends Component {
  state = {
    counter: 0,
  };

  handleClick = () => {
    const nextCounter = this.state.counter + 1;

    if (nextCounter >= 5) {
      throw new Error('I crashed!');
    }

    this.setState({ counter: nextCounter });
  };

  render() {
    return (
      <button className="buggy-button" onClick={this.handleClick}>
        Counter: {this.state.counter}
      </button>
    );
  }
}

class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <h3>Something went wrong.</h3>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

class Child extends Component {
  componentWillUnmount() {
    alert('The Child component has unmounted');
  }

  render() {
    return <h3>Hello World!</h3>;
  }
}

class LifecycleDemo extends Component {
  state = {
    favoriteColor: 'red',
    show: true,
  };

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ favoriteColor: 'yellow' });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('after update');
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('in getSnapshotBeforeUpdate');
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  changeColor = () => {
    this.setState({ favoriteColor: 'blue' });
  };

  deleteChild = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="lifecycle-demo">
        <h2>Lifecycle Demo</h2>
        <p>Favorite color: {this.state.favoriteColor}</p>
        <button onClick={this.changeColor}>Change color to blue</button>

        <div className="child-box">
          {this.state.show && <Child />}
        </div>

        <button onClick={this.deleteChild}>Delete</button>
      </div>
    );
  }
}

export default function App() {
  const [scenario, setScenario] = useState(1);

  return (
    <div className="app">
      <h1>Week 8 Day 1 Exercise XP</h1>

      <section className="panel">
        <h2>Exercise 1: React Error Boundary Simulation</h2>

        <div className="scenario-buttons">
          <button onClick={() => setScenario(1)}>Simulation 1</button>
          <button onClick={() => setScenario(2)}>Simulation 2</button>
          <button onClick={() => setScenario(3)}>Simulation 3</button>
        </div>

        {scenario === 1 && (
          <ErrorBoundary>
            <div className="simulation-group">
              <BuggyCounter />
              <BuggyCounter />
            </div>
          </ErrorBoundary>
        )}

        {scenario === 2 && (
          <div className="simulation-group">
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
            <ErrorBoundary>
              <BuggyCounter />
            </ErrorBoundary>
          </div>
        )}

        {scenario === 3 && <BuggyCounter />}
      </section>

      <section className="panel">
        <LifecycleDemo />
      </section>
    </div>
  );
}
