import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";

import "./app.css";
import PeoplePage from "../people-page";
import ErrorIndicator from "../error-indicator";
import ErrorButton from "../error-button";
import Row from "../row";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";

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

    const { getPerson, getStarship, getPersonImage, getStarshipImage } =
      this.swapiService;

    const personDetails = (
      <ItemDetails
        itemId="11"
        getData={getPerson}
        getImageUrl={getPersonImage}
      />
    );

    const starshipDetails = (
      <ItemDetails
        itemId="5"
        getData={getStarship}
        getImageUrl={getStarshipImage}
      />
    );

    if (hasError) {
      return <ErrorIndicator />;
    }

    return (
      <div>
        <Header />
        {/* {randomPlanet} */}
        {/* <div className="buttons-container"> */}
        {/*  <button */}
        {/*    type="button" */}
        {/*    className="toggle-planet btn btn-warning btn-lg" */}
        {/*    onClick={this.toggleRandomPlanet} */}
        {/*  > */}
        {/*    Toggle Random Planet */}
        {/*  </button> */}
        {/*  <ErrorButton /> */}
        {/* </div> */}
        {/* <PeoplePage /> */}
        <Row left={personDetails} right={starshipDetails} />
      </div>
    );
  }
}

interface AppStateI {
  showRandomPlanet: boolean;
  hasError: boolean;
}
