export interface Profile  {
  id: string;
  address?: string;
  phone?: string;
  gender?: string;
  birthDate?: string;
};

export interface Store  {
  name   :  string  
  location  : string
}

export interface Product {
  id : string;
  name            : string
  imageSrc        : string
  stock         : number
  originalPrice    : number
  discountPercentage? : number
  rating            : number
  salesCount        : string
  bonusText         : string
  location     :    string
  description : string
  storeId?: string
  condition?: string
  unitWeight?: string
  sold?: number
}