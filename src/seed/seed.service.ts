import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokeResponse } from './interfaces/poke-response.interface'; 
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name) //entidad es pokemon
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }

  async executeSeed() {

    await this.pokemonModel.deleteMany({})

    const data = await this.http.get<PokeResponse>("https://pokeapi.co/api/v2/pokemon?limit=650")

    const pokemonToInsert: { name: string, no: number }[] = []

    data.results.forEach(({ url, name }) => {
      const segments = url.split("/");
      const no = + segments[segments.length - 2]

      pokemonToInsert.push({ name, no })
    })

    await this.pokemonModel.insertMany(pokemonToInsert)

    return data.results
  }
}
