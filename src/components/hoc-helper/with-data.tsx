import React, { Component } from "react";
import Spinner from "../spinner";
import {
  ListItemI,
  TransformedPersonI,
  TransformedPlanetI,
  TransformedStarshipI,
} from "../../services/types";

const withData = (View: React.FC<ItemListPropsType>, getData: GetDataType) => {
  return class extends Component<ItemListPropsType, WithDataStateI> {
    state = {
      data: null,
    };

    componentDidMount() {
      getData().then((data) => {
        this.setState({
          data,
        });
      });
    }

    render() {
      const { data } = this.state;

      if (!data) {
        return <Spinner />;
      }
      return <View {...this.props} data={data} />;
    }
  };
};

type ItemListPropsType = {
  onItemSelected?: (id: string | null) => void;
  children: (item: ListItemI) => string | null;
  data?: TransformedPlanetI[] | TransformedPersonI[] | TransformedStarshipI[];
};

type GetDataType = () =>
  | Promise<TransformedPlanetI[]>
  | Promise<TransformedPersonI[]>
  | Promise<TransformedStarshipI[]>;

type WithDataPropsType = {
  onItemSelected?: (id: string | null) => void;
  getData: GetDataType;
  children: (item: ListItemI) => string | null;
};

interface WithDataStateI {
  data:
    | null
    | TransformedPlanetI[]
    | TransformedPersonI[]
    | TransformedStarshipI[];
}

export default withData;
