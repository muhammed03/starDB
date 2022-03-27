import React from "react";

import ItemDetails, { Record } from "../item-details";
import withSwapiService from "../hoc-helper/with-swapi-service";

const PersonDetails: React.FC<{ itemId: string; swapiService: any }> = ({
  itemId,
  swapiService,
}) => {
  return (
    <ItemDetails
      itemId={itemId}
      getData={swapiService.getPerson}
      getImageUrl={swapiService.getPersonImage}
    >
      <Record field="gender" label="Gender" />
      <Record field="birthYear" label="Birth Year" />
      <Record field="eyeColor" label="Eye Color" />
    </ItemDetails>
  );
};

export default withSwapiService(PersonDetails);
