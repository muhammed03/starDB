import React, { Component } from "react";

import "./item-details.css";
import SwapiService from "../../services/swapi-service";
import { TransformedPersonI } from "~/services/types";
import Spinner from "../spinner";
import ErrorButton from "../error-button";

const PersonDetailView: React.FC<PersonDetailsViewPropsType> = ({ item }) => {
  const { id, name, gender, birthYear, eyeColor } = item;
  return (
    <>
      <img
        alt="character"
        className="item-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
        <ErrorButton />
      </div>
    </>
  );
};

export default class ItemDetails extends Component<
  PersonDetailsPropsType,
  PersonDetailsStateI
> {
  swapiService = new SwapiService();

  state = {
    item: null,
    loading: true,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps: PersonDetailsPropsType) {
    const { itemId } = this.props;
    if (itemId !== prevProps.itemId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { itemId } = this.props;
    if (!itemId) {
      return;
    }

    this.setState({
      loading: true,
    });

    this.swapiService.getPerson(itemId).then((item) => {
      this.setState({ item, loading: false });
    });
  }

  render() {
    const { item, loading } = this.state;

    if (!item) {
      return <span>Select a item from a list</span>;
    }

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <PersonDetailView item={item} /> : null;
    return (
      <div className="item-details card">
        {spinner}
        {content}
      </div>
    );
  }
}

type PersonDetailsPropsType = {
  itemId: string | null;
};

interface PersonDetailsStateI {
  item: null | TransformedPersonI;
  loading: boolean;
}

type PersonDetailsViewPropsType = {
  item: TransformedPersonI;
};
