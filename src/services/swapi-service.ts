import {
  ListItemI,
  PersonType,
  PlanetType,
  StarshipType,
  TransformedPersonI,
  TransformedPlanetI,
  TransformedStarshipI,
} from "./types";

export default class SwapiService {
  baseUrl = "https://swapi.dev/api";

  _imageBase = "https://starwars-visualguide.com/assets/img";

  async getResource(url: string) {
    const res = await fetch(`${this.baseUrl}${url}`);
    const body = await res.json();

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return body;
  }

  getAllPeople = async (): Promise<Array<TransformedPersonI>> => {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transfomPerson).slice(0, 5);
  };

  getPerson = async (id: string): Promise<TransformedPersonI> => {
    const person = await this.getResource(`/people/${id}`);
    return this._transfomPerson(person);
  };

  getAllPlanets = async (): Promise<Array<TransformedPlanetI>> => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  };

  getPlanet = async (id: string): Promise<TransformedPlanetI> => {
    const planet = await this.getResource(`/planets/${id}`);
    return this._transformPlanet(planet);
  };

  getAllStarships = async (): Promise<Array<TransformedStarshipI>> => {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  };

  getStarship = async (id: string): Promise<TransformedStarshipI> => {
    const starship = await this.getResource(`/starships/${id}`);
    return this._transformStarship(starship);
  };

  getPersonImage = ({ id }: ListItemI) => {
    return `${this._imageBase}/characters/${id}.jpg`;
  };

  getStarshipImage = ({ id }: ListItemI) => {
    return `${this._imageBase}/starships/${id}.jpg`;
  };

  getPlanetImage = ({ id }: ListItemI) => {
    return `${this._imageBase}/planets/${id}.jpg`;
  };

  _extractId(item: string) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.match(idRegExp)![1];
  }

  _transfomPerson = (person: PersonType): TransformedPersonI => {
    return {
      id: this._extractId(person.url),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
    };
  };

  _transformPlanet = (planet: PlanetType): TransformedPlanetI => {
    return {
      id: this._extractId(planet.url),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  };

  _transformStarship = (starship: StarshipType): TransformedStarshipI => {
    return {
      id: this._extractId(starship.url),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity,
    };
  };
}
