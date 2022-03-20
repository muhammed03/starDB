import React, { Component } from "react";

import "./people-page.css";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import { ListItemI } from "~/services/types";
import Row from "../row";
import ErrorBoundary from "../error-boundary";

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
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.swapiService.getAllPeople}
      >
        {(item: ListItemI) =>
          `${item.name} ( ${"birthYear" in item ? item.birthYear : null})`
        }
      </ItemList>
    );

    const personDetails = (
      <ErrorBoundary>
        <PersonDetails personId={selectedPerson} />
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
