import React, { Component } from "react";

import "./item-list.css";
import Spinner from "../spinner";
import {
  ListItemI,
  TransformedPersonI,
  TransformedPlanetI,
  TransformedStarshipI,
} from "~/services/types";

export default class ItemList extends Component<
  ItemListPropsType,
  ItemListStateI
> {
  state = {
    itemList: null,
  };

  componentDidMount() {
    const { getData } = this.props;

    getData().then((itemList) => {
      this.setState({
        itemList,
      });
    });
  }

  renderItems(
    arr: TransformedPersonI[] | TransformedStarshipI[] | TransformedPlanetI[]
  ) {
    const { onItemSelected, children } = this.props;
    return arr.map((item) => {
      const { id } = item;
      const label = children(item);
      return (
        <li className="list-group-item" key={id}>
          <button type="button" onClick={() => onItemSelected(id)}>
            {label}
          </button>
        </li>
      );
    });
  }

  render() {
    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner />;
    }

    const items = this.renderItems(itemList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}

type ItemListPropsType = {
  onItemSelected: (id: string | null) => void;
  getData: () =>
    | Promise<TransformedPlanetI[]>
    | Promise<TransformedPersonI[]>
    | Promise<TransformedStarshipI[]>;
  children: (item: ListItemI) => string | null;
};

interface ItemListStateI {
  itemList:
    | null
    | TransformedPlanetI[]
    | TransformedPersonI[]
    | TransformedStarshipI[];
}
