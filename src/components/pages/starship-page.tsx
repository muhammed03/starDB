import React, { Component } from "react";
import Row from "../row";
import { StarshipDetails, StarshipList } from "../sw-components";

export default class StarshipPage extends Component<any, any> {
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
        left={<StarshipList onItemSelected={this.onItemSelected} />}
        right={<StarshipDetails itemId={selectedItem} />}
      />
    );
  }
}
