import CampusMap from '../components/CampusMap'

function MapPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-16 pt-32 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <span className="text-sm font-medium text-blue-400">
            CAMPUS EXPLORER
          </span>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            Explore Campus
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Explore important university locations and facilities
            using the interactive campus map.
          </p>
        </div>

        <CampusMap />
      </div>
    </main>
  )
}

export default MapPage