import React from "react";

import ItemDetails, { Record } from "../item-details";
import withSwapiService from "../hoc-helper/with-swapi-service";
import { DetailsPropsType } from "./sw-types";

const PersonDetails: React.FC<DetailsPropsType> = (props) => {
  return (
    <ItemDetails {...props}>
      <Record field="gender" label="Gender" />
      <Record field="birthYear" label="Birth Year" />
      <Record field="eyeColor" label="Eye Color" />
    </ItemDetails>
  );
};

const mapMethodsToProps = (swapiService: any) => {
  return {
    getData: swapiService.getPerson,
    getImageUrl: swapiService.getPersonImage,
  };
};

export default withSwapiService(PersonDetails, mapMethodsToProps);
