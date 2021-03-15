import React, {Component} from 'react';

export default class ErrorBoundary extends Component {

  state = {
    error: null
  }

  componentDidCatch(error, errorInfo) {
    if (error) {
      this.setState({error})
    }
  }

  render() {
    if (this.state.error) {
      return <h1>Some error...</h1>;
    }

    return this.props.children;
  }
}