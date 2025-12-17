"use client";

import { Input } from './ui/input'
import {  Bell, Mail, Menu, Search, ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { EmblaCarousel } from './ui/embla';
import { useState, useEffect } from "react"
import axios from 'axios';
import {NavbarDefault} from '@/components/navbar-form';


export function HomeForm(){
  
  return (
    <section>
       <NavbarDefault/>
      <section  >
        <EmblaCarousel/>
      </section>
    </section>
  )
}