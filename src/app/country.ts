export interface country {
  place: {
    name: string;
    iso: string;
    iso3: string;
    isoNum: string;
    fips: string;
    continent: string;
    continentFull: string;
  },
  profile:
  {
    capital : string;
    areaKM : number;
    areaMI : number;
    pop : number;
    neighbors : string[]
  }
};

