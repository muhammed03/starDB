import React, { Component } from "react";

import Header from "../header";
import ErrorBoundary from "../error-boundary";
import SwapiService from "../../services/swapi-service";
import RandomPlanet from "../random-planet";
import { PeoplePage, PlanetPage, StarshipPage } from "../pages";

import { SwapiServiceProvider } from "../swapi-service-context";

import "./app.css";

export default class App extends Component<{}, AppStateI> {
  swapiService = new SwapiService();

  render() {
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.swapiService}>
          <div className="star-db-app">
            <Header />
            <RandomPlanet />
            <PeoplePage />
            <PlanetPage />
            <StarshipPage />
          </div>
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}

interface AppStateI {
  showRandomPlanet?: boolean;
  hasError?: boolean;
}
