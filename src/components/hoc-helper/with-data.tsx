import React, { Component } from "react";
import Spinner from "../spinner";
import {
  TransformedPersonI,
  TransformedPlanetI,
  TransformedStarshipI,
} from "~/services/types";

const withData = (View: React.FC<ItemListPropsType>) => {
  return class extends Component<ItemListPropsType, WithDataStateI> {
    state = {
      data: null,
    };

    componentDidMount() {
      const { getData } = this.props;

      getData().then((data: any) => {
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
  data?: TransformedPlanetI[] | TransformedPersonI[] | TransformedStarshipI[];
  getData: any;
};

type GetDataType = () =>
  | Promise<TransformedPlanetI[]>
  | Promise<TransformedPersonI[]>
  | Promise<TransformedStarshipI[]>;

interface WithDataStateI {
  data:
    | null
    | TransformedPlanetI[]
    | TransformedPersonI[]
    | TransformedStarshipI[];
}

export default withData;
