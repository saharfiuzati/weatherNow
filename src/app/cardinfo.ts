import { country } from './country';

export interface cardinfo {
    
    name: string;
    continent: string;
    capital: string;
    neighbors : country[];
    tempreture : Number;
    hightempreture : Number;
    lowtempreture : Number;
  };