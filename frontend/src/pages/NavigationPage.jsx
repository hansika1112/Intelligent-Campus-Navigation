import { useEffect, useState } from 'react'
import {
  FiArrowRight,
  FiCheck,
  FiClock,
  FiMapPin,
  FiNavigation,
  FiShield,
  FiUser
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
import { getLocations } from '../services/locationService'
import { getRoute } from '../services/routingService'
import RouteInstructions from '../components/RouteInstructions'

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
  const [locations, setLocations] = useState([])
  const [startId, setStartId] = useState('')
  const [destinationId, setDestinationId] = useState('')
  const [route, setRoute] = useState(null)
  const [loading, setLoading] = useState(false)
  const [locationsLoading, setLocationsLoading] = useState(true)
  const [error, setError] = useState('')

  const [accessibilityOptions, setAccessibilityOptions] =
    useState({
      wheelchair: false,
      avoidStairs: false,
      avoidRestrictedPaths: false
    })

  useEffect(() => {
    const loadLocations = async () => {
      try {
        setLocationsLoading(true)

        const data = await getLocations()

        const normalizedLocations = data.map(
          (location) => {
            const matchingStaticLocation =
              campusLocations.find(
                (item) =>
                  item.name.toLowerCase() ===
                  location.name.toLowerCase()
              )

            return {
              ...location,
              id:
                matchingStaticLocation?.id ??
                location._id,
              databaseId: location._id,
              routingId:
                matchingStaticLocation?.id ?? null
            }
          }
        )

        setLocations(normalizedLocations)
        setError('')
      } catch (err) {
        setError(
          'Unable to load campus locations from the server.'
        )
      } finally {
        setLocationsLoading(false)
      }
    }

    loadLocations()
  }, [])

  const handleAccessibilityChange = (option) => {
    setAccessibilityOptions((previous) => ({
      ...previous,
      [option]: !previous[option]
    }))

    setRoute(null)
    setError('')
  }

  const handleFindRoute = async () => {
    if (!startId || !destinationId) {
      setError(
        'Please select both starting point and destination.'
      )
      return
    }

    if (startId === destinationId) {
      setRoute(null)
      setError(
        'Starting point and destination must be different.'
      )
      return
    }

    const start = locations.find(
      (location) =>
        String(location.id) === String(startId)
    )

    const destination = locations.find(
      (location) =>
        String(location.id) === String(destinationId)
    )

    if (!start || !destination) {
      setError(
        'Invalid starting point or destination.'
      )
      return
    }

    if (
      accessibilityOptions.wheelchair &&
      !destination.wheelchairAccess
    ) {
      setRoute(null)
      setError(
        'The selected destination is not marked as wheelchair accessible.'
      )
      return
    }

    const routingStart =
      campusLocations.find(
        (location) =>
          location.id === start.routingId
      )

    const routingDestination =
      campusLocations.find(
        (location) =>
          location.id === destination.routingId
      )

    if (!routingStart || !routingDestination) {
      setRoute(null)
      setError(
        'This location is not yet connected to the campus routing graph.'
      )
      return
    }

    try {
      setLoading(true)
      setError('')
      setRoute(null)

      const routeData = await getRoute(
        routingStart,
        routingDestination,
        accessibilityOptions,
        campusLocations
      )

      setRoute({
        start,
        destination,
        distance: (
          routeData.distance / 1000
        ).toFixed(2),
        walkingTime: Math.max(
          1,
          Math.round(routeData.duration / 60)
        ),
        coordinates: routeData.coordinates,
        accessibilityOptions,
        source: routeData.source,
        pathNodes: routeData.pathNodes || []
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
            Select your starting point and destination
            and choose accessibility preferences for
            your journey.
          </p>
        </div>

        {locationsLoading && (
          <div className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-5 text-slate-400">
            Loading campus locations...
          </div>
        )}

        {!locationsLoading && locations.length === 0 && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
            No campus locations are available from the server.
          </div>
        )}

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Starting Point
              </label>

              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-blue-400" />

                <select
                  value={startId}
                  onChange={(e) => {
                    setStartId(e.target.value)
                    setRoute(null)
                    setError('')
                  }}
                  disabled={
                    locationsLoading ||
                    locations.length === 0
                  }
                  className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-11 py-4 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">
                    Select starting point
                  </option>

                  {locations.map((location) => (
                    <option
                      key={location._id || location.id}
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
                <FiNavigation className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-green-400" />

                <select
                  value={destinationId}
                  onChange={(e) => {
                    setDestinationId(e.target.value)
                    setRoute(null)
                    setError('')
                  }}
                  disabled={
                    locationsLoading ||
                    locations.length === 0
                  }
                  className="w-full appearance-none rounded-xl border border-slate-700 bg-slate-950 px-11 py-4 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">
                    Select destination
                  </option>

                  {locations.map((location) => (
                    <option
                      key={location._id || location.id}
                      value={location.id}
                    >
                      {location.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950 p-5">

            <div className="flex items-start gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/20">
                <FiShield className="text-blue-400" />
              </div>

              <div>
                <h2 className="font-semibold">
                  Accessibility Preferences
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Select preferences that should be
                  considered for your route.
                </p>
              </div>

            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">

              <button
                type="button"
                onClick={() =>
                  handleAccessibilityChange('wheelchair')
                }
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                  accessibilityOptions.wheelchair
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    accessibilityOptions.wheelchair
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {accessibilityOptions.wheelchair ? (
                    <FiCheck />
                  ) : (
                    <FiUser />
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Wheelchair Accessible
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Prefer accessible facilities
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAccessibilityChange('avoidStairs')
                }
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                  accessibilityOptions.avoidStairs
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    accessibilityOptions.avoidStairs
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {accessibilityOptions.avoidStairs ? (
                    <FiCheck />
                  ) : (
                    <FiNavigation />
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Avoid Stairs
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Prefer step-free paths
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() =>
                  handleAccessibilityChange(
                    'avoidRestrictedPaths'
                  )
                }
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                  accessibilityOptions.avoidRestrictedPaths
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    accessibilityOptions.avoidRestrictedPaths
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {accessibilityOptions.avoidRestrictedPaths ? (
                    <FiCheck />
                  ) : (
                    <FiShield />
                  )}
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Avoid Restricted Paths
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Avoid restricted campus areas
                  </p>
                </div>
              </button>

            </div>

          </div>

          <button
            onClick={handleFindRoute}
            disabled={
              !startId ||
              !destinationId ||
              startId === destinationId ||
              loading ||
              locationsLoading
            }
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiNavigation />

            {loading
              ? 'Finding Route...'
              : 'Find Route'}
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
                Starting point and destination must
                be different.
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

              {Object.values(
                route.accessibilityOptions
              ).some(Boolean) && (
                <div className="mb-6 rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">

                  <div className="flex items-center gap-2">
                    <FiShield className="text-blue-400" />

                    <p className="text-sm font-semibold text-blue-300">
                      Selected Accessibility Preferences
                    </p>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">

                    {route.accessibilityOptions.wheelchair && (
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                        ♿ Wheelchair Accessible
                      </span>
                    )}

                    {route.accessibilityOptions.avoidStairs && (
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                        🚫 Avoid Stairs
                      </span>
                    )}

                    {route.accessibilityOptions.avoidRestrictedPaths && (
                      <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300">
                        🚧 Avoid Restricted Paths
                      </span>
                    )}

                  </div>

                </div>
              )}

              <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-xs text-slate-500">
                Routing source:{' '}
                <span className="font-medium text-slate-300">
                  {route.source === 'campus'
                    ? 'Campus Accessibility Graph'
                    : 'OSRM'}
                </span>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">

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

              <RouteInstructions
                start={route.start}
                destination={route.destination}
                pathNodes={route.pathNodes}
              />

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
