export interface PlanetViewPropsType {
  planet: {
    id: null | string;
    name: null | string;
    population: null | string;
    rotationPeriod: null | string;
    diameter: null | string;
  };
};

export interface RandomPlanetStateI extends PlanetViewPropsType {
  loading: boolean;
}
