export const countryCodes: { [key: string]: string } = {
  nz: 'New Zealand',
  nl: 'Netherlands',
  ca: 'Canada',
  ua: 'Ukraine',
};

export interface Location {
  city: string;
  country: string;
  postcode: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  location: Location;
  countryName?: string;
}

export const allUsers = [
  {
    id: 1,
    name: 'Aubree Ennis',
    email: 'aubree@example.com',
    phone: '(209)-062-0668"',
    gender: 'male',
    location: {
      city: 'Dunedin',
      country: 'nz',
      postcode: '64183',
    },
  },
  {
    id: 2,
    name: 'Annabelle Andersons',
    email: 'andersons@example.com',
    phone: '(250) 555-0199',
    gender: 'female',
    location: {
      city: 'Cochrane',
      country: 'ca',
      postcode: 'E4Y 1C2',
    },
  },
  {
    id: 3,
    name: 'Vitaliya Shimanovskogo',
    email: 'vitaliya@example.com',
    phone: '(098) 529-6958',
    gender: 'female',
    location: {
      city: 'Berezhani',
      country: 'ua',
      postcode: '21296',
    },
  },
  {
    id: 4,
    name: 'Noah Côté',
    email: 'noah@example.com',
    phone: '(020) 9492532',
    gender: 'female',
    location: {
      city: 'Loosbroek',
      country: 'nl',
      postcode: '1393 EY',
    },
  },
];

export interface Post {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  country?: string;
}

export interface ResponseInforResult {
  info: Info;
  results: Character[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: any;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: any;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
