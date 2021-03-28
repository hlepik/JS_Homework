import { IAnimal } from "../domain/IAnimal";
import { AnimalService } from "../services/animal-service";

import { IFashion } from "../domain/IFashion";
import { FashionService } from "../services/fashion-service";

import { ITravel } from "../domain/ITravel";
import { TravelService } from "../services/travel-service";

export class AppState {
    public animalJokes: readonly AnimalService[] = [];
    public animalData: IAnimal[] = [];

    public fashionJokes: readonly FashionService[] = [];
    public fashionData: IFashion[] = [];

    public travelJokes: readonly TravelService[] = [];
    public travelData: ITravel[] = [];

    constructor() {
      
    }


}