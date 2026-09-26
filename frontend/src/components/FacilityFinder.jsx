import { useMemo, useState } from 'react'
import {
  FiAlertCircle,
  FiMapPin,
  FiSearch,
  FiX
} from 'react-icons/fi'
import { campusLocations } from '../data/campusLocations'

function FacilityFinder({ onSelectLocation }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(() => {
    return ['All', ...new Set(campusLocations.map((location) => location.category))]
  }, [])

  const filteredLocations = useMemo(() => {
    const searchTerm = search.trim().toLowerCase()

    return campusLocations.filter((location) => {
      const matchesSearch =
        !searchTerm ||
        location.name.toLowerCase().includes(searchTerm) ||
        location.category.toLowerCase().includes(searchTerm) ||
        location.description.toLowerCase().includes(searchTerm)

      const matchesCategory =
        category === 'All' || location.category === category

      return matchesSearch && matchesCategory
    })
  }, [search, category])

  const clearSearch = () => {
    setSearch('')
    setCategory('All')
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6 md:p-8">

      <div className="mb-6">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-400">
          Facility Finder
        </p>

        <h2 className="text-2xl font-bold">
          Find a Facility
        </h2>

        <p className="mt-2 text-slate-400">
          Search campus facilities or filter them by category.
        </p>
      </div>

      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search facilities..."
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-11 py-4 pr-12 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
        />

        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
            aria-label="Clear search"
          >
            <FiX />
          </button>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              category === item
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {filteredLocations.length} facilities found
        </p>

        {(search || category !== 'All') && (
          <button
            onClick={clearSearch}
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredLocations.length > 0 ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {filteredLocations.map((location) => (
            <div
              key={location.id}
              className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-slate-700"
            >
              <div className="flex items-start justify-between gap-4">

                <div className="flex items-start gap-3">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600/20">
                    <FiMapPin className="text-blue-400" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {location.name}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {location.category}
                    </p>
                  </div>

                </div>

                {location.emergency && (
                  <span className="flex items-center gap-1 rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400">
                    <FiAlertCircle />
                    Emergency
                  </span>
                )}

              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {location.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">

                {location.wheelchairAccess && (
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    ♿ Wheelchair Accessible
                  </span>
                )}

                {location.accessibility && (
                  <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                    Accessible
                  </span>
                )}

              </div>

              <button
                onClick={() => onSelectLocation?.(location)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                >
                <FiMapPin />
                View on Map
                </button>

            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-slate-700 bg-slate-950 p-10 text-center">
          <FiSearch className="mx-auto text-3xl text-slate-600" />

          <h3 className="mt-4 font-semibold text-white">
            No facilities found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try another search term or category.
          </p>
        </div>
      )}

    </section>
  )
}

export default FacilityFinder