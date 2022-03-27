import React from "react";

import ItemDetails, { Record } from "../item-details";
import withSwapiService from "../hoc-helper/with-swapi-service";
import { DetailsPropsType } from "./sw-types";

const StarshipDetails: React.FC<DetailsPropsType> = (props) => {
  return (
    <ItemDetails {...props}>
      <Record field="model" label="Model" />
      <Record field="length" label="Length" />
      <Record field="costInCredits" label="Cost" />
    </ItemDetails>
  );
};

const mapMethodsToProps = (swapiService: any) => {
  return {
    getData: swapiService.getStarship,
    getImageUrl: swapiService.getStarshipImage,
  };
};

export default withSwapiService(mapMethodsToProps)(StarshipDetails);
