import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";

import "./app.css";
import PeoplePage from "../people-page";
import ErrorIndicator from "../error-indicator";
import ErrorButton from "../error-button";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import SwapiService from "../../services/swapi-service";
import { ListItemI } from "~/services/types";

export default class App extends Component<{}, AppStateI> {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false,
    selectedPerson: null,
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

  onItemSelected = (id: string | null) => {
    this.setState({
      selectedPerson: id,
    });
  };

  render() {
    const { showRandomPlanet, hasError, selectedPerson } = this.state;

    const randomPlanet = showRandomPlanet ? <RandomPlanet /> : null;

    if (hasError) {
      return <ErrorIndicator />;
    }

    return (
      <div>
        <Header />
        {randomPlanet}
        <div className="buttons-container">
          <button
            type="button"
            className="toggle-planet btn btn-warning btn-lg"
            onClick={this.toggleRandomPlanet}
          >
            Toggle Random Planet
          </button>
          <ErrorButton />
        </div>
        <PeoplePage />

        <div className="row mb2 person-details-container">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onItemSelected}
              getData={this.swapiService.getAllPlanets}
              renderItem={(item: ListItemI) => item.name}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={selectedPerson} />
          </div>
        </div>

        <div className="row mb2 person-details-container">
          <div className="col-md-6">
            <ItemList
              onItemSelected={this.onItemSelected}
              getData={this.swapiService.getAllStarships}
              renderItem={(item: ListItemI) => item.name}
            />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
}

interface AppStateI {
  showRandomPlanet: boolean;
  hasError: boolean;
  selectedPerson: string | null;
}
