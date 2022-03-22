import React from "react";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

const { Provider: SwapiServiceProvider, Consumer: SwapiServiceConsumer } =
  React.createContext(new SwapiService());

export { SwapiServiceProvider, SwapiServiceConsumer };
