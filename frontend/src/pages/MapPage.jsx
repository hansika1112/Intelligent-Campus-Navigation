import { useEffect, useState } from 'react'
import CampusMap from '../components/CampusMap'
import FacilityFinder from '../components/FacilityFinder'
import { getLocations } from '../services/locationService'

function MapPage() {
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadLocations = async () => {
      try {
        setLoading(true)
        const data = await getLocations()
        setLocations(data)
        setError('')
      } catch (err) {
        setError(
          'Unable to load campus locations from the server.'
        )
      } finally {
        setLoading(false)
      }
    }

    loadLocations()
  }, [])

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
            Find buildings, facilities and important locations
            around campus.
          </p>
        </div>

        {loading && (
          <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-5 text-slate-400">
            Loading campus locations...
          </div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && locations.length > 0 && (
          <>
            <CampusMap
              selectedLocation={selectedLocation}
              locations={locations}
            />

            <div className="mt-8">
              <FacilityFinder
                locations={locations}
                onSelectLocation={handleSelectLocation}
              />
            </div>
          </>
        )}

        {selectedLocation && (
          <div className="mt-6 rounded-xl border border-blue-500/30 bg-blue-500/10 p-5">
            <p className="text-sm text-blue-300">
              Selected Facility
            </p>

            <h2 className="mt-1 text-xl font-bold">
              {selectedLocation.name}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {selectedLocation.category}
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default MapPage