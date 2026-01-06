"use client";

import { useState } from "react";

type ProductFormValues = {
  id?: string; // hanya untuk edit
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


