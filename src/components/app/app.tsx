import React, { Component } from "react";

import Header from "../header";
import ErrorBoundary from "../error-boundary";
import SwapiService from "../../services/swapi-service";
// import DummySwapiService from "../../services/dummy-swapi-service";

import { SwapiServiceProvider } from "../swapi-service-context";

import {
  PersonDetails,
  PersonList,
  PlanetDetails,
  PlanetList,
  StarshipDetails,
  StarshipList,
} from "../sw-components";

import "./app.css";

export default class App extends Component<{}, AppStateI> {
  swapiService = new SwapiService();

  render() {
    return (
      <ErrorBoundary>
        <SwapiServiceProvider value={this.swapiService}>
          <div className="star-db-app">
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
        </SwapiServiceProvider>
      </ErrorBoundary>
    );
  }
}

interface AppStateI {
  showRandomPlanet?: boolean;
  hasError?: boolean;
}
