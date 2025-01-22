'use client'

import React from 'react'
import Image from 'next/image'

// Baris pertama - logo perusahaan besar
const topClients = [
  '/assets/clients/logo1.jpg',
  '/assets/clients/logo2.jpg',
  '/assets/clients/logo3.jpg',
  '/assets/clients/logo4.jpg',
  '/assets/clients/logo5.jpg',
  '/assets/clients/logo6.jpg',
  '/assets/clients/logo7.jpg',
  '/assets/clients/logo8.jpg',
  '/assets/clients/logo9.jpg',
]

// Baris kedua - logo perusahaan menengah
const middleClients = [
 '/assets/clients/logo1.jpg',
  '/assets/clients/logo2.jpg',
  '/assets/clients/logo3.jpg',
  '/assets/clients/logo4.jpg',
  '/assets/clients/logo5.jpg',
  '/assets/clients/logo6.jpg',
  '/assets/clients/logo7.jpg',
  '/assets/clients/logo8.jpg',
  '/assets/clients/logo9.jpg',
]

// Baris ketiga - logo institusi
const bottomClients = [
  '/assets/clients/logo1.jpg',
  '/assets/clients/logo2.jpg',  
  '/assets/clients/logo3.jpg',
  '/assets/clients/logo4.jpg',
  '/assets/clients/logo5.jpg',
  '/assets/clients/logo6.jpg',
  '/assets/clients/logo7.jpg',
  '/assets/clients/logo8.jpg',
  '/assets/clients/logo9.jpg',
]

export function ClientMarquee() {
  return (
    <div className="relative overflow-hidden bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Vouched by multinational clients.</h2>
        </div>
      </div>
      
      {/* First row - Left to right */}
      <div className="relative w-full overflow-hidden mb-4">
        {/* Gradient masks */}
        <div className="absolute top-0 left-0 w-[300px] h-full bg-gradient-to-r from-[#f8fafc] via-[#f8fafc] to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-l from-[#f8fafc] via-[#f8fafc] to-transparent z-10"></div>
        
        <div className="flex animate-marquee-left whitespace-nowrap">
          {[...topClients, ...topClients].map((client, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 mx-4 w-28 h-16 relative hover:scale-110 transition-all duration-300"
            >
              <Image
                src={client}
                alt={`Client ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Second row - Right to left */}
      <div className="relative w-full overflow-hidden mb-4">
        {/* Gradient masks */}
        <div className="absolute top-0 left-0 w-[300px] h-full bg-gradient-to-r from-[#f8fafc] via-[#f8fafc] to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-l from-[#f8fafc] via-[#f8fafc] to-transparent z-10"></div>
        
        <div className="flex animate-marquee-right whitespace-nowrap">
          {[...middleClients, ...middleClients].map((client, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 mx-4 w-28 h-16 relative hover:scale-110 transition-all duration-300"
            >
              <Image
                src={client}
                alt={`Client ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Third row - Left to right */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient masks */}
        <div className="absolute top-0 left-0 w-[300px] h-full bg-gradient-to-r from-[#f8fafc] via-[#f8fafc] to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-[300px] h-full bg-gradient-to-l from-[#f8fafc] via-[#f8fafc] to-transparent z-10"></div>
        
        <div className="flex animate-marquee-left whitespace-nowrap">
          {[...bottomClients, ...bottomClients].map((client, index) => (
            <div
              key={`row3-${index}`}
              className="flex-shrink-0 mx-4 w-28 h-16 relative hover:scale-110 transition-all duration-300"
            >
              <Image
                src={client}
                alt={`Client ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 