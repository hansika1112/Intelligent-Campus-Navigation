import { FiNavigation, FiMapPin } from 'react-icons/fi'

function NavigationPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-16 pt-32 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <span className="text-sm font-medium text-blue-400">
            SMART NAVIGATION
          </span>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Get Directions
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Select your starting point and destination to find
            an efficient campus route.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Starting Point
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-4">
                <FiMapPin className="text-blue-400" />

                <span className="text-slate-500">
                  Select starting location
                </span>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Destination
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-4">
                <FiMapPin className="text-red-400" />

                <span className="text-slate-500">
                  Select destination
                </span>
              </div>
            </div>
          </div>

          <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 font-semibold hover:bg-blue-700">
            <FiNavigation />
            Find Route
          </button>
        </div>
      </div>
    </main>
  )
}

export default NavigationPage