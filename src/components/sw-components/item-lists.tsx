import React, { FC } from "react";
import ItemList from "../item-list";

import {
  WithData,
  WithSwapiService,
  WithChildFunction,
  compose,
} from "../hoc-helper";

const renderName = ({ name }: any) => <span>{name}</span>;
const renderModelAndName = ({ model, name }: any) => (
  <span>
    {name} ({model})
  </span>
);

const mapPersonMethodToProps = (swapiService: any) => {
  return {
    getData: swapiService.getAllPeople,
  };
};

const mapPlanetMethodToProps = (swapiService: any) => {
  return {
    getData: swapiService.getAllPlanets,
  };
};

const mapStarshipMethodToProps = (swapiService: any) => {
  return {
    getData: swapiService.getAllStarships,
  };
};

const PersonList = compose(
  WithSwapiService(mapPersonMethodToProps),
  WithData,
  WithChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
  WithSwapiService(mapStarshipMethodToProps),
  WithData,
  WithChildFunction(renderModelAndName)
)(ItemList);

const PlanetList = compose(
  WithSwapiService(mapPlanetMethodToProps),
  WithData,
  WithChildFunction(renderName)
)(ItemList);

export { PersonList, PlanetList, StarshipList };
