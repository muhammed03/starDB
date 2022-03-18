import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";

import "./random-planet.css";
import RandomPlanetStateI from "./types";
import { TransformedPlanetI } from "../../services/types";

export default class RandomPlanet extends Component<
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  RandomPlanetStateI
> {
  swapiService = new SwapiService();

  constructor() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    super();
    this.updatePlanet();
  }

  state = {
    id: null,
    name: null,
    population: null,
    rotationPeriod: null,
    diameter: null,
  };

  onPlanetLoaded = (planet: TransformedPlanetI): void => {
    this.setState({ ...planet });
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 25) + 2;
    this.swapiService.getPlanet(id).then(this.onPlanetLoaded);
  }

  render() {
    const { id, name, population, rotationPeriod, diameter } = this.state;

    return (
      <div className="random-planet jumbotron rounded">
        <img
          className="planet-image"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
          alt="planet"
        />
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term"> Rotation period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
