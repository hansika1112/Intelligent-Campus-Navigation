import { useMemo, useState } from 'react'
import {
  FiAlertTriangle,
  FiMapPin,
  FiSearch,
  FiShield,
  FiX
} from 'react-icons/fi'
import { campusLocations } from '../data/campusLocations'

function FacilityFinder({ onSelectLocation }) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const categories = useMemo(() => {
    return [
      'All',
      ...new Set(
        campusLocations.map((location) => location.category)
      )
    ]
  }, [])

  const filteredFacilities = useMemo(() => {
    const searchText = search.trim().toLowerCase()

    return campusLocations.filter((location) => {
      const matchesCategory =
        category === 'All' ||
        location.category === category

      const matchesSearch =
        !searchText ||
        location.name.toLowerCase().includes(searchText) ||
        location.category.toLowerCase().includes(searchText) ||
        location.description.toLowerCase().includes(searchText)

      return matchesCategory && matchesSearch
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

        <h2 className="text-2xl font-bold text-white md:text-3xl">
          Find a Facility
        </h2>

        <p className="mt-2 text-slate-400">
          Search buildings, services and important campus facilities.
        </p>
      </div>

      <div className="relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search facilities..."
          className="w-full rounded-xl border border-slate-700 bg-slate-950 py-4 pl-11 pr-12 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
        />

        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-white"
          >
            <FiX />
          </button>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
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
          {filteredFacilities.length}{' '}
          {filteredFacilities.length === 1
            ? 'facility'
            : 'facilities'}{' '}
          found
        </p>

        {(search || category !== 'All') && (
          <button
            type="button"
            onClick={clearSearch}
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            Clear filters
          </button>
        )}
      </div>

      {filteredFacilities.length > 0 ? (
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {filteredFacilities.map((location) => (
            <div
              key={location.id}
              className="rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-blue-500/50"
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
                  <span className="shrink-0 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
                    🚨 Emergency
                  </span>
                )}

              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {location.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">

                {location.wheelchairAccess && (
                  <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                    ♿ Wheelchair Accessible
                  </span>
                )}

                {location.accessibility && (
                  <span className="flex items-center gap-1 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                    <FiShield />
                    Accessible
                  </span>
                )}

              </div>

              <button
                type="button"
                onClick={() => onSelectLocation?.(location)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <FiMapPin />
                View on Map
              </button>

            </div>
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed border-slate-700 bg-slate-950 p-10 text-center">
          <FiAlertTriangle className="mx-auto text-3xl text-slate-500" />

          <h3 className="mt-4 font-semibold text-white">
            No facilities found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try another search term or category.
          </p>

          <button
            type="button"
            onClick={clearSearch}
            className="mt-5 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Clear Filters
          </button>
        </div>
      )}

    </section>
  )
}

export default FacilityFinder