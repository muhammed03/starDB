import React, { Component } from "react";

import "./item-details.css";
import SwapiService from "../../services/swapi-service";
import { ListItemI, TransformedPersonI } from "~/services/types";
import Spinner from "../spinner";
import ErrorButton from "../error-button";

const ItemDetailView: React.FC<PersonDetailsViewPropsType> = ({
  item,
  image,
}) => {
  const { id, name, gender, birthYear, eyeColor } = item;
  return (
    <>
      <img alt="character" className="item-image" src={image} />

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
    image: "",
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps: PersonDetailsPropsType) {
    const { itemId } = this.props;
    if (itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    this.setState({
      loading: true,
    });

    getData(itemId).then((item) => {
      this.setState({ item, loading: false, image: getImageUrl(item) });
    });
  }

  render() {
    const { item, loading, image } = this.state;

    if (!item) {
      return <span>Select a item from a list</span>;
    }

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? (
      <ItemDetailView item={item} image={image} />
    ) : null;
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
  getData: (id: string) => Promise<ListItemI>;
  getImageUrl: ({ id }: ListItemI) => string;
};

interface PersonDetailsStateI {
  item: null | ListItemI;
  loading: boolean;
  image: null | string;
}

type PersonDetailsViewPropsType = {
  item: TransformedPersonI;
  image: string;
};
