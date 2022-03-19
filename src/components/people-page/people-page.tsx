import React, { Component } from "react";

import "./people-page.css";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import { ListItemI } from "~/services/types";

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
        renderItem={(item: ListItemI) =>
          `${item.name} (${"gender" in item ? item.gender : null}, ${
            "birthYear" in item ? item.birthYear : null
          })`
        }
      />
    );

    const personDetails = <PersonDetails personId={selectedPerson} />;

    return (
      <div className="row mb2 person-details-container">
        <div className="col-md-6">{itemList}</div>
        <div className="col-md-6">{personDetails}</div>
      </div>
    );
  }
}

interface PeoplePageStateI {
  selectedPerson: string | null;
  hasError: boolean;
}
