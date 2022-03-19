import React, { Component } from "react";

import "./error-button.css";

export default class ErrorButton extends Component<{}, ErrorButtonStateI> {
  state = {
    renderError: false,
  };

  render() {
    const { renderError } = this.state;

    if (renderError) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.foo.bar = 0;
    }

    return (
      <button
        type="button"
        className="error-button btn btn-danger btn-lg"
        onClick={() => this.setState({ renderError: true })}
      >
        Throw Error
      </button>
    );
  }
}

interface ErrorButtonStateI {
  renderError: boolean;
}
