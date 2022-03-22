import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";

import "./app.css";
import ErrorIndicator from "../error-indicator";
import {
  PersonDetails,
  PersonList,
  PlanetDetails,
  PlanetList,
  StarshipDetails,
  StarshipList,
} from "../sw-components";
import ErrorBoundary from "../error-boundary";

export default class App extends Component<{}, AppStateI> {
  state = {
    showRandomPlanet: true,
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  render() {
    const { showRandomPlanet, hasError } = this.state;

    const randomPlanet = showRandomPlanet ? <RandomPlanet /> : null;

    if (hasError) {
      return <ErrorIndicator />;
    }

    return (
      <div>
        <Header />
        <ErrorBoundary>
          <PersonDetails itemId="11" />
        </ErrorBoundary>
        <PlanetDetails itemId="5" />
        <StarshipDetails itemId="9" />
        <PersonList />
        <StarshipList />
        <PlanetList />
      </div>
    );
  }
}

interface AppStateI {
  showRandomPlanet: boolean;
  hasError: boolean;
}

// <PersonList>{(item: ListItemI) => `${item.name}`}</PersonList>
