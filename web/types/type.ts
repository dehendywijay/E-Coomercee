export type Product = {
  id: string;
  name: string;
  imageSrc: string;
  stock: number;
  originalPrice: number;
  discountPercentage?: number;
  rating: number;
  salesCount: string;
  bonusText: string;
  location: string;
  description: string;
};

export type User = {
  id : number;
  name: string;
  email: string;
}

export type Profile = {
  id: string;
  address?: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
};

export type Store = {
  name   :  string  
  location  : string
}

export type UserPayload = {
  user: User;
  userId: string;
  profile?: Profile;
  store?: Store;
  products?: Product[];
  productsDetails?: Product;
};