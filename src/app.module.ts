import { join } from "path";
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ConfigModule } from "@nestjs/config";
import { PokemonModule } from "./pokemon/pokemon.module";
import { CommonModule } from "./common/common.module";
import { SeedModule } from "./seed/seed.module";
import { EnvConfiguration } from "./config/app.config";
import { JoiValidationSchema } from "./config/joi.validation";
@Module({
  imports: [

    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),

    MongooseModule.forRoot(process.env.MONGODB_URI as string, {
      dbName: process.env.MONGODB_NAME,
      retryAttempts: 5,
      retryDelay: 3000,
    }),

    PokemonModule,

    CommonModule,

    SeedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
