import React from "react";

import ItemDetails, { Record } from "../item-details";
import withSwapiService from "../hoc-helper/with-swapi-service";

const StarshipDetails: React.FC<{ itemId: string; swapiService: any }> = ({
  itemId,
  swapiService,
}) => {
  const { getStarship, getStarshipImage } = swapiService;

  return (
    <ItemDetails
      itemId={itemId}
      getData={getStarship}
      getImageUrl={getStarshipImage}
    >
      <Record field="model" label="Model" />
      <Record field="length" label="Length" />
      <Record field="costInCredits" label="Cost" />
    </ItemDetails>
  );
};

export default withSwapiService(StarshipDetails);
