import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";

import "./app.css";
import ErrorIndicator from "../error-indicator";
import ItemDetails, { Record } from "../item-details/item-details";
import SwapiService from "../../services/swapi-service";
import {
  PersonDetails,
  PersonList,
  PlanetDetails,
  PlanetList,
  StarshipDetails,
  StarshipList,
} from "../sw-components";
import { ListItemI } from "~/services/types";
import ErrorBoundary from "../error-boundary";

export default class App extends Component<{}, AppStateI> {
  swapiService = new SwapiService();

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

    const {
      getPerson,
      getStarship,
      getPersonImage,
      getStarshipImage,
      getAllPeople,
    } = this.swapiService;

    const personDetails = (
      <ItemDetails itemId="11" getData={getPerson} getImageUrl={getPersonImage}>
        <Record field="gender" label="Gender" />
        <Record field="eyeColor" label="Eye Color" />
      </ItemDetails>
    );

    const starshipDetails = (
      <ItemDetails
        itemId="5"
        getData={getStarship}
        getImageUrl={getStarshipImage}
      >
        <Record field="model" label="Model" />
        <Record field="length" label="Length" />
        <Record field="passengers" label="Passengers" />
      </ItemDetails>
    );

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
        <PersonList>{(item: ListItemI) => `${item.name}`}</PersonList>
        <StarshipList>{(item: ListItemI) => `${item.name}`}</StarshipList>
        <PlanetList>{(item: ListItemI) => `${item.name}`}</PlanetList>
      </div>
    );
  }
}

interface AppStateI {
  showRandomPlanet: boolean;
  hasError: boolean;
}
