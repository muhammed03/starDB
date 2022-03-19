import React, { Component } from "react";

import "./people-page.css";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";

export default class PeoplePage extends Component<{}, PeoplePageStateI> {
  state = {
    selectedPerson: "3",
    hasError: false,
  };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      hasError: true,
    });
  }

  onPersonSelected = (id: string) => {
    this.setState({
      selectedPerson: id,
    });
  };

  render() {
    const { selectedPerson, hasError } = this.state;

    if (hasError) {
      return <ErrorIndicator />;
    }
    return (
      <div className="row mb2 person-details-container">
        <div className="col-md-6">
          <ItemList onItemSelected={this.onPersonSelected} />
        </div>
        <div className="col-md-6">
          <PersonDetails personId={selectedPerson} />
        </div>
      </div>
    );
  }
}

interface PeoplePageStateI {
  selectedPerson: string | null;
  hasError: boolean;
}
