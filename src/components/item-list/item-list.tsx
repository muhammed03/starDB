import React, { Component } from "react";

import "./item-list.css";

import SwapiService from "../../services/swapi-service";
import withData from "../hoc-helper";
import {
  ListItemI,
  TransformedPersonI,
  TransformedPlanetI,
  TransformedStarshipI,
} from "../../services/types";

type ItemListPropsType = {
  onItemSelected: (id: string | null) => void;
  children: (item: ListItemI) => string | null;
  data: TransformedPlanetI[] | TransformedPersonI[] | TransformedStarshipI[];
};

const ItemList: React.FC<ItemListPropsType> = (props) => {
  const { data, onItemSelected, children: renderLabel } = props;

  const items = data.map((item) => {
    const { id } = item;
    const label = renderLabel(item);
    return (
      <li className="list-group-item" key={id}>
        <button type="button" onClick={() => onItemSelected(id)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="item-list list-group">{items}</ul>;
};

const { getAllPeople } = new SwapiService();

export default withData(ItemList, getAllPeople);
