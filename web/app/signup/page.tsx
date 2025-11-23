import { CardDemo } from '@/components/login-form'
import { SignupForm } from '@/components/signup-form'
import React from 'react'

export default function page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gray-200">
      <div className="w-full max-w-sm">
      <SignupForm/>
      </div>
    </div>
  )
}
