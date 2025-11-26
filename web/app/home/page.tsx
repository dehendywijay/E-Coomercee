"use client";

import { HomeForm } from '@/components/dashboard-form';
import React from 'react'

export default function page() {
  return (
    <section className="flex min-h-svh w-full items-top justify-center p-6 md:p-10 bg-gray-200">
      <HomeForm/>
    </section>
  )
}
