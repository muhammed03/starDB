import React from "react";
import { SwapiServiceConsumer } from "../swapi-service-context/swapi-service-context";

const withSwapiService = (Wrapped: any) => {
  return (props: any) => {
    return (
      <SwapiServiceConsumer>
        {(swapiService) => {
          return <Wrapped {...props} swapiService={swapiService} />;
        }}
      </SwapiServiceConsumer>
    );
  };
};

export default withSwapiService;
