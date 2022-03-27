import React, { Component } from "react";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";
import {
  TransformedPersonI,
  TransformedPlanetI,
  TransformedStarshipI,
} from "~/services/types";

const WithData = (View: React.FC<ItemListPropsType>) => {
  return class extends Component<ItemListPropsType, WithDataStateI> {
    state = {
      data: null,
      loading: true,
      error: false,
    };

    componentDidMount() {
      // eslint-disable-next-line react/no-this-in-sfc
      this.update();
    }

    update() {
      // eslint-disable-next-line react/no-this-in-sfc
      this.setState({
        loading: true,
        error: false,
      });

      const { getData } = this.props;

      getData()
        .then((data: any) => {
          // eslint-disable-next-line react/no-this-in-sfc
          this.setState({
            data,
            loading: false,
          });
        })
        .catch(() => {
          // eslint-disable-next-line react/no-this-in-sfc
          this.setState({
            error: true,
            loading: false,
          });
        });
    }

    render() {
      const { data, loading, error } = this.state;

      if (loading) {
        return <Spinner />;
      }

      if (error) {
        return <ErrorIndicator />;
      }

      // eslint-disable-next-line react/no-this-in-sfc
      return <View {...this.props} data={data} />;
    }
  };
};

type ItemListPropsType = {
  onItemSelected?: (id: string | null) => void;
  data?:
    | null
    | TransformedPlanetI[]
    | TransformedPersonI[]
    | TransformedStarshipI[];
  getData: any;
};

interface WithDataStateI {
  data:
    | null
    | TransformedPlanetI[]
    | TransformedPersonI[]
    | TransformedStarshipI[];
  loading: boolean;
  error: boolean;
}

export default WithData;
