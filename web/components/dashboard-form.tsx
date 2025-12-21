"use client";

import { Input } from './ui/input'
import {  Bell, Mail, Menu, Search, ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { EmblaCarousel } from './ui/embla';
import { useState, useEffect } from "react"
import axios from 'axios';
import {NavbarDefault} from '@/components/navbar-form';
import { ProductCard, products } from './product-card-home';



export function HomeForm() {
  return (
    <section>
      <NavbarDefault />

      <section className="max-w-6xl mx-auto px-6 mt-3">
        <EmblaCarousel />
      </section>

      <section className="mt-6">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="mb-3 text-base font-semibold">
            Untukmu
          </h2>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </section>
  )
}
