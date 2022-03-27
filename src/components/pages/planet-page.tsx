import React, { Component } from "react";
import Row from "../row";
import { PlanetDetails, PlanetList } from "../sw-components";

export default class PlanetPage extends Component<any, any> {
  state = {
    selectedItem: null,
  };

  onItemSelected = (selectedItem: any) => {
    this.setState({ selectedItem });
  };

  render() {
    const { selectedItem } = this.state;
    return (
      <Row
        left={<PlanetList onItemSelected={this.onItemSelected} />}
        right={<PlanetDetails itemId={selectedItem} />}
      />
    );
  }
}
