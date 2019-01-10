import { Beverage } from "../models/Beverage";

export class DrinkService {
    private static _instance: DrinkService;
    static baseUrl = 'https://alkomate-backend.herokuapp.com/';

    private constructor() {}

    public static get Instance(){
        return this._instance || (this._instance = new this());
    }

    getBeverageById(beverageEan: string): Promise<Beverage | undefined> {
        return fetch(`${DrinkService.baseUrl}/public/beverages/${beverageEan}`)
            .then(res => res.json())
            .catch(err => console.warn('Error when fetching beverage with EAN', err));
    }

    async getBeverages(): Promise<Beverage[]> {
        let res = await fetch(`${DrinkService.baseUrl}/public/beverages/`)
            .then(res => res.json())
            .catch(err => console.warn('Beverage fetching failed', err));
        let drinks = res ? res.beverages : [];

        return drinks ? drinks : [];
    }

    async addBeverage(beverage: Beverage): Promise<Beverage | undefined> {
        return fetch(`${DrinkService.baseUrl}/public/beverages/`, { method: 'POST', body: JSON.stringify(beverage) })
            .then(res => res.json())
            .catch(err => console.warn('error when posting drink', err));
    }
}

