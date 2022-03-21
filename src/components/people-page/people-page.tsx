import React, { Component } from "react";

import "./people-page.css";
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import { ListItemI } from "../../services/types";
import Row from "../row";
import ErrorBoundary from "../error-boundary";
import { Record } from "../item-details/item-details";

export default class PeoplePage extends Component<{}, PeoplePageStateI> {
  swapiService = new SwapiService();

  state = {
    selectedPerson: null,
    hasError: false,
  };

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  onPersonSelected = (id: string | null) => {
    this.setState({
      selectedPerson: id,
    });
  };

  render() {
    const { selectedPerson, hasError } = this.state;

    if (hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
      <ItemList onItemSelected={this.onPersonSelected}>
        {(item: ListItemI) =>
          `${item.name} ( ${"birthYear" in item ? item.birthYear : null})`
        }
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundary>
        <ItemDetails
          itemId={selectedPerson}
          getData={this.swapiService.getPerson}
          getImageUrl={this.swapiService.getPersonImage}
        >
          <Record field="gender" label="Gender" />
          <Record field="birthYear" label="Birth Year" />
          <Record field="eyeColor" label="Eye Color" />
        </ItemDetails>
      </ErrorBoundary>
    );

    return (
      <ErrorBoundary>
        <Row left={itemList} right={personDetails} />
      </ErrorBoundary>
    );
  }
}

interface PeoplePageStateI {
  selectedPerson: string | null;
  hasError: boolean;
}
