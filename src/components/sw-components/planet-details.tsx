import React from "react";

import ItemDetails, { Record } from "../item-details";
import withSwapiService from "../hoc-helper/with-swapi-service";
import { DetailsPropsType } from "./sw-types";

const PlanetDetails: React.FC<DetailsPropsType> = (props) => {
  return (
    <ItemDetails {...props}>
      <Record field="population" label="Population" />
      <Record field="rotationPeriod" label="Rotation Period" />
      <Record field="diameter" label="Diameter" />
    </ItemDetails>
  );
};

const mapMethodsToProps = (swapiService: any) => {
  return {
    getData: swapiService.getPlanet,
    getImageUrl: swapiService.getPlanetImage,
  };
};

export default withSwapiService(mapMethodsToProps)(PlanetDetails);
