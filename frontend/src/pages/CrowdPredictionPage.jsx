import { useState } from 'react'
import { predictCrowd } from '../services/crowdService'

const facilities = [
  'Central Library',
  'Campus Cafeteria',
  'Administration Block',
  'Main Academic Block',
  'Medical Center',
  'Hostel Block A'
]

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

function CrowdPredictionPage() {
  const [form, setForm] = useState({
    facility: 'Central Library',
    day_of_week: 1,
    hour: 14,
    previous_occupancy: 35,
    event: false
  })

  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox'
        ? checked
        : ['day_of_week', 'hour', 'previous_occupancy'].includes(name)
          ? Number(value)
          : value
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setPrediction(null)

    try {
      const result = await predictCrowd(form)
      setPrediction(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const levelStyles = {
    Low: 'text-green-400 bg-green-400/10 border-green-400/30',
    Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
    High: 'text-red-400 bg-red-400/10 border-red-400/30'
  }

  const inputStyle =
    'w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400'

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Machine Learning Feature
          </p>

          <h1 className="text-3xl font-bold md:text-5xl">
            Campus Crowd Prediction
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Predict estimated occupancy at different campus facilities
            using our Random Forest machine learning model.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl"
          >
            <h2 className="mb-6 text-xl font-semibold">
              Prediction Details
            </h2>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Select Facility
                </label>

                <select
                  name="facility"
                  value={form.facility}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  {facilities.map((facility) => (
                    <option key={facility} value={facility}>
                      {facility}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Day of Week
                </label>

                <select
                  name="day_of_week"
                  value={form.day_of_week}
                  onChange={handleChange}
                  className={inputStyle}
                >
                  {days.map((day, index) => (
                    <option key={day} value={index}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Time (24-hour format)
                </label>

                <input
                  type="number"
                  name="hour"
                  min="0"
                  max="23"
                  value={form.hour}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Previous Occupancy
                </label>

                <input
                  type="number"
                  name="previous_occupancy"
                  min="0"
                  value={form.previous_occupancy}
                  onChange={handleChange}
                  className={inputStyle}
                  required
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  name="event"
                  checked={form.event}
                  onChange={handleChange}
                  className="h-4 w-4 accent-cyan-400"
                />
                Special event scheduled
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? 'Predicting...' : 'Predict Crowd'}
              </button>
            </div>
          </form>

          <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
            <h2 className="mb-6 text-xl font-semibold">
              Prediction Result
            </h2>

            {!prediction && !error && (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <div className="mb-4 text-5xl">📊</div>
                <p className="text-slate-300">
                  Your crowd prediction will appear here.
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Enter the details and click Predict Crowd.
                </p>
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
                {error}
              </div>
            )}

            {prediction && (
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-slate-400">
                    Selected Facility
                  </p>
                  <h3 className="mt-1 text-2xl font-bold">
                    {prediction.facility}
                  </h3>
                </div>

                <div className="rounded-xl bg-slate-800/80 p-5">
                  <p className="text-sm text-slate-400">
                    Estimated Occupancy
                  </p>

                  <p className="mt-2 text-4xl font-bold text-cyan-400">
                    {prediction.estimated_occupancy}
                    <span className="text-xl text-slate-400">
                      {' '}/ {prediction.facility_capacity}
                    </span>
                  </p>

                  <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-700">
                    <div
                      className="h-full rounded-full bg-cyan-400 transition-all"
                      style={{
                        width: `${prediction.crowd_percentage}%`
                      }}
                    />
                  </div>

                  <p className="mt-2 text-right text-sm text-slate-400">
                    {prediction.crowd_percentage}% occupancy
                  </p>
                </div>

                <div>
                  <p className="mb-2 text-sm text-slate-400">
                    Crowd Level
                  </p>

                  <span className={`inline-block rounded-full border px-5 py-2 font-semibold ${levelStyles[prediction.crowd_level] || ''}`}>
                    {prediction.crowd_level}
                  </span>
                </div>

                <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-200">
                  Demonstration result based on synthetic training data.
                  It does not represent live campus occupancy.
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}

export default CrowdPredictionPage
