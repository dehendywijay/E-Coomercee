"use client";

import { ProductForm } from '@/components/product-update';
import React from 'react'

export default function page() {
  return (
    <section >
      <ProductForm mode={'create'}/>
    </section>
    
  )
}
