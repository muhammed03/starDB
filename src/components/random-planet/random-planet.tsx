import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";

import "./random-planet.css";
import { RandomPlanetStateI, PlanetViewPropsType } from "./types";
import { TransformedPlanetI } from "../../services/types";
import Spinner from "../spinner";

const PlanetView: React.FC<PlanetViewPropsType> = (planet) => {
  const {
    planet: { id, name, population, rotationPeriod, diameter },
  } = planet;

  return (
    <>
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
    </>
  );
};

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
    planet: {
      id: null,
      name: null,
      population: null,
      rotationPeriod: null,
      diameter: null,
    },
    loading: true,
  };

  onPlanetLoaded = (planet: TransformedPlanetI): void => {
    this.setState({ planet, loading: false });
  };

  onError = (err) => {};

  updatePlanet() {
    const id = Math.floor(Math.random() * 25) + 2;
    this.swapiService
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch(this.onError);
  }

  render() {
    const { planet, loading } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <PlanetView planet={planet} /> : null;

    return (
      <div className="random-planet jumbotron rounded">
        {spinner}
        {content}
      </div>
    );
  }
}
