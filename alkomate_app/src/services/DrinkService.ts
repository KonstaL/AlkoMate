import { Beverage } from "../models/Beverage";
import { iid } from "react-native-firebase";

export class DrinkService {
    private static _instance: DrinkService;
    static baseUrl = 'https://alkomate-backend.herokuapp.com:443';

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
        console.log('posting this', JSON.stringify(beverage))
        return fetch(`${DrinkService.baseUrl}/public/beverages/`, { 
            method: 'POST',
            body: JSON.stringify(beverage),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
         })
            .then(res => {
                if(res.status === 201) {
                    return res.json();
                }  
                throw new Error('Not a valid drink');
            })
            .catch(err => console.warn('error when posting drink', err));
    }
}

