import React, { Component } from "react";

import "./person-details.css";
import SwapiService from "../../services/swapi-service";
import { TransformedPersonI } from "~/services/types";
import Spinner from "../spinner";
import ErrorButton from "../error-button";

const PersonDetailView: React.FC<PersonDetailsViewPropsType> = ({ person }) => {
  const { id, name, gender, birthYear, eyeColor } = person;
  return (
    <>
      <img
        alt="character"
        className="person-image"
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
      />

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
        <ErrorButton />
      </div>
    </>
  );
};

export default class PersonDetails extends Component<
  PersonDetailsPropsType,
  PersonDetailsStateI
> {
  swapiService = new SwapiService();

  state = {
    person: null,
    loading: true,
  };

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps: PersonDetailsPropsType) {
    const { personId } = this.props;
    if (personId !== prevProps.personId) {
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return;
    }

    this.setState({
      loading: true,
    });

    this.swapiService.getPerson(personId).then((person) => {
      this.setState({ person, loading: false });
    });
  }

  render() {
    const { person, loading } = this.state;

    if (!person) {
      return <span>Select a person from a list</span>;
    }

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? <PersonDetailView person={person} /> : null;
    return (
      <div className="person-details card">
        {spinner}
        {content}
      </div>
    );
  }
}

type PersonDetailsPropsType = {
  personId: string | null;
};

interface PersonDetailsStateI {
  person: null | TransformedPersonI;
  loading: boolean;
}

type PersonDetailsViewPropsType = {
  person: TransformedPersonI;
};
