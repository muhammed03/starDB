import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ItemList from "../item-list";
import PersonDetails from "../person-details";

import "./app.css";

export default class App extends Component<{}, AppI> {
  state = {
    showRandomPlanet: true,
    selectedPerson: "5",
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  onPersonSelected = (id: string) => {
    this.setState({
      selectedPerson: id,
    });
  };

  render() {
    const { showRandomPlanet, selectedPerson } = this.state;

    const randomPlanet = showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <div>
        <Header />
        {randomPlanet}

        <button
          type="button"
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}
        >
          Toggle Random Planet
        </button>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} />
          </div>
          <div className="col-md-6">
            <PersonDetails personId={selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
}

interface AppI {
  showRandomPlanet: boolean;
  selectedPerson: null | string;
}
