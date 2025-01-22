'use client'

import React from 'react'
import { MapPin, Layers, Mountain } from 'lucide-react'

const CesiumMap = () => {
  return (
    <div className="w-full h-[600px] bg-gray-200 rounded-lg overflow-hidden relative">
      <div className="absolute top-4 left-4 right-4 bg-white p-4 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-2">Geological Map Interface</h2>
        <div className="flex space-x-4">
          <button className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            <Layers className="inline-block mr-2" size={16} />
            Toggle Layers
          </button>
          <button className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">
            <Mountain className="inline-block mr-2" size={16} />
            Show Terrain
          </button>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 bg-white p-4 rounded shadow-md">
        <h3 className="text-sm font-semibold mb-2">Legend</h3>
        <ul className="text-sm">
          <li className="flex items-center mb-1">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            Geological Sites
          </li>
          <li className="flex items-center mb-1">
            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
            Historical Earthquakes
          </li>
          <li className="flex items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            Water Bodies
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-center h-full text-gray-500">
        <MapPin size={48} />
        <span className="ml-2 text-lg">Map Placeholder</span>
      </div>
    </div>
  )
}

export default CesiumMap

