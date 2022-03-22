import React, { FC } from "react";
import ItemList from "../item-list";
import withData from "../hoc-helper/with-data";
import SwapiService from "../../services/swapi-service";
import { ItemListPropsType } from "../item-list/item-list";

const swapiService = new SwapiService();

const { getAllPeople, getAllStarships, getAllPlanets } = swapiService;

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

const PersonList = withData(
  withChildFunction(ItemList, renderName),
  getAllPeople
);
const StarshipList = withData(
  withChildFunction(ItemList, renderModelAndName),
  getAllStarships
);
const PlanetList = withData(
  withChildFunction(ItemList, renderName),
  getAllPlanets
);

export { PersonList, PlanetList, StarshipList };
