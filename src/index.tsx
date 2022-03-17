import React, { Component } from "react";

class SwapiService {
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

  getStarship(id: number): Promise<StarshipType>{
    return this.getResource(`/starships/${id}`);
  }


}

//types
export type PersonType = {
  birth_year: string;
  eye_color: string;
  films: Array<string>;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: Array<string>;
  starships: Array<string>;
  url: string;
  vehicles: Array<string>;
};

type PlanetType = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: Array<string>;
  films: Array<string>;
  created: string;
  edited: string;
  url: string;
};

type StarshipType = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: Array<string>;
  films: Array<string>;
  created: string;
  edited: string;
  url: string;
};
