import { useEffect, useState } from 'react'
import {
  FiArrowRight,
  FiClock,
  FiMapPin,
  FiNavigation
} from 'react-icons/fi'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { campusLocations } from '../data/campusLocations'
import { getRoute } from '../services/routingService'

function RouteMapView({ coordinates }) {
  const map = useMap()

  useEffect(() => {
    if (coordinates?.length) {
      map.fitBounds(coordinates, {
        padding: [50, 50]
      })
    }
  }, [coordinates, map])

  return null
}

function NavigationPage() {
  const [startId, setStartId] = useState('')
  const [destinationId, setDestinationId] = useState('')
  const [route, setRoute] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFindRoute = async () => {
    if (!startId || !destinationId) {
      return
    }

    if (startId === destinationId) {
      setRoute(null)
      setError('Starting point and destination must be different.')
      return
    }

    const start = campusLocations.find(
      (location) => location.id === Number(startId)
    )

    const destination = campusLocations.find(
      (location) => location.id === Number(destinationId)
    )

    if (!start || !destination) {
      return
    }

    try {
      setLoading(true)
      setError('')
      setRoute(null)

      const routeData = await getRoute(start, destination)

      setRoute({
        start,
        destination,
        distance: (routeData.distance / 1000).toFixed(2),
        walkingTime: Math.max(
          1,
          Math.round(routeData.duration / 60)
        ),
        coordinates: routeData.coordinates
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-16 pt-32 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-400">
            Smart Navigation
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            Find Your Route
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Select your starting point and destination to calculate
            the distance and estimated walking time.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Starting Point
              </label>

              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />

                <select
                  value={startId}
                  onChange={(e) => {
                    setStartId(e.target.value)
                    setRoute(null)
                    setError('')
                  }}
                  className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-11 py-4 text-white outline-none focus:border-blue-500"
                >
                  <option value="">
                    Select starting point
                  </option>

                  {campusLocations.map((location) => (
                    <option
                      key={location.id}
                      value={location.id}
                    >
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Destination
              </label>

              <div className="relative">
                <FiNavigation className="absolute left-4 top-1/2 -translate-y-1/2 text-green-400" />

                <select
                  value={destinationId}
                  onChange={(e) => {
                    setDestinationId(e.target.value)
                    setRoute(null)
                    setError('')
                  }}
                  className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-11 py-4 text-white outline-none focus:border-blue-500"
                >
                  <option value="">
                    Select destination
                  </option>

                  {campusLocations.map((location) => (
                    <option
                      key={location.id}
                      value={location.id}
                    >
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          <button
            onClick={handleFindRoute}
            disabled={
              !startId ||
              !destinationId ||
              startId === destinationId ||
              loading
            }
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiNavigation />

            {loading ? 'Finding Route...' : 'Find Route'}
          </button>

          {error && (
            <p className="mt-4 text-center text-sm text-red-400">
              {error}
            </p>
          )}

          {startId &&
            destinationId &&
            startId === destinationId && (
              <p className="mt-4 text-center text-sm text-red-400">
                Starting point and destination must be different.
              </p>
            )}

        </div>

        {route && (
          <>
            <div className="mt-8 rounded-2xl border border-blue-500/30 bg-slate-900 p-6 md:p-8">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20">
                  <FiNavigation className="text-xl text-blue-400" />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    Route Found
                  </h2>

                  <p className="text-sm text-slate-400">
                    Walking route information
                  </p>
                </div>

              </div>

              <div className="grid gap-4 md:grid-cols-2">

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm text-slate-400">
                    Starting Point
                  </p>

                  <p className="mt-2 font-semibold">
                    {route.start.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {route.start.category}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                  <p className="text-sm text-slate-400">
                    Destination
                  </p>

                  <p className="mt-2 font-semibold">
                    {route.destination.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {route.destination.category}
                  </p>
                </div>

              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">

                <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-5">

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600/20">
                    <FiMapPin className="text-blue-400" />
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">
                      Distance
                    </p>

                    <p className="text-xl font-bold">
                      {route.distance} km
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-5">

                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-600/20">
                    <FiClock className="text-green-400" />
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">
                      Estimated Walking Time
                    </p>

                    <p className="text-xl font-bold">
                      {route.walkingTime} min
                    </p>
                  </div>

                </div>

              </div>

              <div className="mt-6 flex items-center justify-center gap-3 rounded-xl bg-slate-950 p-5 text-center">

                <span className="font-medium">
                  {route.start.name}
                </span>

                <FiArrowRight className="shrink-0 text-blue-400" />

                <span className="font-medium">
                  {route.destination.name}
                </span>

              </div>

            </div>

            <div className="mt-8 overflow-hidden rounded-2xl border border-slate-800">

              <MapContainer
                center={route.coordinates[0]}
                zoom={17}
                scrollWheelZoom={true}
                className="h-[500px] w-full"
              >

                <RouteMapView
                  coordinates={route.coordinates}
                />

                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                  position={[
                    route.start.latitude,
                    route.start.longitude
                  ]}
                >
                  <Popup>
                    <strong>
                      {route.start.name}
                    </strong>

                    <br />

                    Starting Point
                  </Popup>
                </Marker>

                <Marker
                  position={[
                    route.destination.latitude,
                    route.destination.longitude
                  ]}
                >
                  <Popup>
                    <strong>
                      {route.destination.name}
                    </strong>

                    <br />

                    Destination
                  </Popup>
                </Marker>

                <Polyline
                  positions={route.coordinates}
                  pathOptions={{
                    color: '#2563eb',
                    weight: 6,
                    opacity: 0.85
                  }}
                />

              </MapContainer>

            </div>
          </>
        )}

      </div>
    </main>
  )
}

export default NavigationPage