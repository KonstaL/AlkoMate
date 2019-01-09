import { Beverage } from "../models/Beverage";

export class DrinkService {
    private static _instance: DrinkService;

    private constructor() {}

    public static get Instance(){
        return this._instance || (this._instance = new this());
    }

    getBeverageById(beverageEan: string): Promise<Beverage | undefined> {
        return fetch(`/public/beverages/${beverageEan}`)
            .then(res => res.json())
            .catch(err => console.warn('Error when fetching beverage with EAN', err));
    }

    async getBeverages(): Promise<Beverage[]> {
        let res = await fetch(`/public/beverages/`).then(res => res.json());
        let drinks = res.beverages;

        return drinks ? drinks : [];
    }
}

