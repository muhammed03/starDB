import React, { Component, Children } from "react";

import "./item-details.css";
import { ListItemI } from "../../services/types";
import Spinner from "../spinner";
import ErrorButton from "../error-button";

const Record: React.FC<{
  item?: ListItemI;
  field: string;
  label: string;
}> = ({ item, field, label }) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item ? item[field] : null}</span>
    </li>
  );
};

export { Record };

export default class ItemDetails extends Component<
  ItemDetailsPropsType,
  ItemDetailsStateI
> {
  state = {
    item: null,
    loading: true,
    image: "",
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps: ItemDetailsPropsType) {
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
    const { children } = this.props;

    if (!item) {
      return <span>Select a item from a list</span>;
    }

    const { id, name, gender, birthYear, eyeColor } = item;

    const spinner = loading ? <Spinner /> : null;

    return (
      <div className="item-details card">
        {loading ? (
          spinner
        ) : (
          <>
            <img alt="character" className="item-image" src={image} />

            <div className="card-body">
              <h4>{name}</h4>
              <ul className="list-group list-group-flush">
                {React.Children.map(children, (child, idx) => {
                  return React.cloneElement(child as React.ReactElement, {
                    item,
                  });
                })}
              </ul>
              <ErrorButton />
            </div>
          </>
        )}
      </div>
    );
  }
}

type ItemDetailsPropsType = {
  itemId: string | null;
  getData: (id: string) => Promise<ListItemI>;
  getImageUrl: ({ id }: ListItemI) => string;
  children: JSX.Element[] | null;
};

interface ItemDetailsStateI {
  item: null | ListItemI;
  loading: boolean;
  image: null | string;
}
