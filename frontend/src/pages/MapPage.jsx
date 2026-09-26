import { useState } from 'react'
import CampusMap from '../components/CampusMap'
import FacilityFinder from '../components/FacilityFinder'

function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState(null)

  const handleSelectLocation = (location) => {
    setSelectedLocation(location)
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-16 pt-32 text-white">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Campus Map
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Explore Campus
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Find buildings, facilities and important locations around campus.
          </p>
        </div>

        <CampusMap
          selectedLocation={selectedLocation}
        />

        <div className="mt-8">
          <FacilityFinder
            onSelectLocation={handleSelectLocation}
          />
        </div>

      </div>
    </main>
  )
}

export default MapPage