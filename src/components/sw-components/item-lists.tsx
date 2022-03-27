import React, { FC } from "react";
import ItemList from "../item-list";
import withData from "../hoc-helper/with-data";
import withSwapiService from "../hoc-helper/with-swapi-service";
import { ItemListPropsType } from "../item-list/item-list";

const withChildFunction = (Wrapped: FC<ItemListPropsType>, fn: any) => {
  return (props: any) => {
    return <Wrapped {...props}>{fn}</Wrapped>;
  };
};

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
    getData: swapiService.getAllPeople,
  };
};

const mapStarshipMethodToProps = (swapiService: any) => {
  return {
    getData: swapiService.getAllPeople,
  };
};

const PersonList = withSwapiService(
  withData(withChildFunction(ItemList, renderName)),
  mapPersonMethodToProps
);
const StarshipList = withSwapiService(
  withData(withChildFunction(ItemList, renderModelAndName)),
  mapStarshipMethodToProps
);
const PlanetList = withSwapiService(
  withData(withChildFunction(ItemList, renderName)),
  mapPlanetMethodToProps
);

export { PersonList, PlanetList, StarshipList };
