import React, { Component } from "react";

import "./item-list.css";
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import { TransformedPersonI } from "~/services/types";

export default class ItemList extends Component<
  ItemListPropsType,
  ItemListStateI
> {
  swapiService = new SwapiService();

  state = {
    peopleList: null,
  };

  componentDidMount() {
    this.swapiService.getAllPeople().then((peopleList) => {
      this.setState({
        peopleList,
      });
    });
  }

  renderItems(arr: TransformedPersonI[]) {
    const { onItemSelected } = this.props;
    return arr.map(({ id, name }) => {
      return (
        <li className="list-group-item" key={id}>
          <button type="button" onClick={() => onItemSelected(id)}>
            {name}
          </button>
        </li>
      );
    });
  }

  render() {
    const { peopleList } = this.state;

    if (!peopleList) {
      return <Spinner />;
    }

    const items = this.renderItems(peopleList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}

type ItemListPropsType = {
  onItemSelected: (id: string) => void;
};

interface ItemListStateI {
  peopleList: null | TransformedPersonI[];
}
