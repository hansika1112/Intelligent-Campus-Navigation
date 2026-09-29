import { useEffect, useMemo, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  useMap
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { FiSearch, FiX, FiMapPin } from 'react-icons/fi'
import CampusMarker from './CampusMarker'

function MapController({ selectedLocation }) {
  const map = useMap()

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo(
        [
          selectedLocation.latitude,
          selectedLocation.longitude
        ],
        18,
        {
          duration: 1.2
        }
      )
    }
  }, [selectedLocation, map])

  return null
}

function CampusMap({
  selectedLocation: externalSelectedLocation,
  locations = []
}) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [
    internalSelectedLocation,
    setInternalSelectedLocation
  ] = useState(null)

  const selectedLocation =
    externalSelectedLocation ||
    internalSelectedLocation

  const categories = useMemo(() => {
    return [
      'All',
      ...new Set(
        locations.map(
          (location) => location.category
        )
      )
    ]
  }, [locations])

  const filteredLocations = useMemo(() => {
    const searchText = search
      .trim()
      .toLowerCase()

    return locations.filter((location) => {
      const matchesSearch =
        searchText === '' ||
        location.name
          .toLowerCase()
          .includes(searchText) ||
        location.category
          .toLowerCase()
          .includes(searchText) ||
        location.description
          .toLowerCase()
          .includes(searchText)

      const matchesCategory =
        category === 'All' ||
        location.category === category

      return (
        matchesSearch &&
        matchesCategory
      )
    })
  }, [search, category, locations])

  const center = [
    31.2555,
    75.7055
  ]

  const handleSelectLocation = (location) => {
    setInternalSelectedLocation(location)
    setSearch(location.name)
  }

  const handleMarkerSelect = (location) => {
    setInternalSelectedLocation(location)
  }

  const clearSearch = () => {
    setSearch('')
    setCategory('All')
    setInternalSelectedLocation(null)
  }

  return (
    <div className="space-y-4">

      <div className="relative">

        <FiSearch
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search buildings, hostels, library, cafeteria..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setInternalSelectedLocation(null)
          }}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 py-4 pl-12 pr-12 text-white outline-none transition focus:border-blue-500"
        />

        {search && (
          <button
            onClick={clearSearch}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-slate-400 hover:text-white"
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}

        {search &&
          filteredLocations.length > 0 &&
          !selectedLocation && (
            <div className="absolute left-0 right-0 top-full z-[1000] mt-2 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">

              {filteredLocations.map(
                (location) => (
                  <button
                    key={location._id || location.id}
                    type="button"
                    onClick={() =>
                      handleSelectLocation(
                        location
                      )
                    }
                    className="flex w-full items-center gap-4 border-b border-slate-800 px-4 py-4 text-left transition last:border-b-0 hover:bg-slate-800"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/20">
                      <FiMapPin className="text-blue-400" />
                    </div>

                    <div>
                      <p className="font-medium text-white">
                        {location.name}
                      </p>

                      <p className="text-sm text-slate-400">
                        {location.category}
                      </p>
                    </div>
                  </button>
                )
              )}

            </div>
          )}

        {search &&
          filteredLocations.length === 0 && (
            <div className="absolute left-0 right-0 top-full z-[1000] mt-2 rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-2xl">
              <p className="text-sm text-slate-400">
                No campus location found.
              </p>
            </div>
          )}

      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">

        <div className="flex items-center rounded-xl border border-slate-800 bg-slate-900 px-4 py-3">

          <p className="text-sm text-slate-300">

            {selectedLocation ? (
              <>
                Selected:{' '}

                <span className="font-semibold text-white">
                  {selectedLocation.name}
                </span>
              </>
            ) : (
              <>
                Showing{' '}

                <span className="font-semibold text-white">
                  {filteredLocations.length}
                </span>{' '}
                locations
              </>
            )}

          </p>

        </div>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            setInternalSelectedLocation(null)
          }}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          {categories.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>

      <div className="h-[600px] w-full overflow-hidden rounded-2xl border border-slate-700">

        <MapContainer
          center={center}
          zoom={16}
          scrollWheelZoom={true}
          className="h-full w-full"
        >

          <MapController
            selectedLocation={selectedLocation}
          />

          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredLocations.map(
            (location) => (
              <CampusMarker
                key={location._id || location.id}
                location={location}
                isSelected={
                  selectedLocation?._id ===
                    location._id ||
                  selectedLocation?.id ===
                    location.id
                }
                onSelect={
                  handleMarkerSelect
                }
              />
            )
          )}

        </MapContainer>

      </div>

    </div>
  )
}

export default CampusMap
