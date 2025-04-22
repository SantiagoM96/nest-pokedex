import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import axios, { AxiosInstance } from 'axios';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios
  constructor(
    @InjectModel(Pokemon.name) //entidad es pokemon
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  async executeSeed() {
    const { data } = await this.axios.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=10")

    data.results.forEach(({ url, name }) => {
      const segments = url.split("/");
      const no = + segments[segments.length - 2] //anteultimo se encuentra el id

      console.log({ name, no })
    })

    return data.results
  }
}
