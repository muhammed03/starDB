import { PersonType, PlanetType, StarshipType } from "./types";

export default class SwapiService {
  _apiBase = "https://swapi.dev/api";

  async getResource(url: string) {
    const res = await fetch(`${this._apiBase}${url}`);
    const body = await res.json();

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return body;
  }

  async getAllPeople(): Promise<Array<PersonType>> {
    const res = await this.getResource(`/people/`);
    return res.results;
  }

  getPerson(id: number): Promise<PersonType> {
    return this.getResource(`/people/${id}`);
  }

  async getAllPlanets(): Promise<Array<PlanetType>> {
    const res = await this.getResource(`/planets/`);
    return res.results;
  }

  getPlanet(id: number): Promise<PlanetType> {
    return this.getResource(`/planets/${id}`);
  }

  async getAllStarships(): Promise<Array<StarshipType>> {
    const res = await this.getResource(`/starships/`);
    return res.results;
  }

  getStarship(id: number): Promise<StarshipType> {
    return this.getResource(`/starships/${id}`);
  }
}
