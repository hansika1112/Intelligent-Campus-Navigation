import { FiAlertTriangle, FiPhone, FiMapPin } from 'react-icons/fi'

function EmergencyPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-16 pt-32 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20">
            <FiAlertTriangle className="text-3xl text-red-500" />
          </div>

          <h1 className="mt-5 text-4xl font-bold">
            Emergency Assistance
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Quickly find emergency services and important
            safety locations on campus.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-red-900/50 bg-red-950/20 p-6">
            <FiPhone className="text-3xl text-red-500" />

            <h2 className="mt-5 text-xl font-semibold">
              Campus Security
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Contact campus security for immediate assistance.
            </p>

            <button className="mt-6 w-full rounded-xl bg-red-600 px-4 py-3 font-semibold hover:bg-red-700">
              Call Security
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <FiMapPin className="text-3xl text-blue-400" />

            <h2 className="mt-5 text-xl font-semibold">
              Medical Center
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Find the nearest campus medical center.
            </p>

            <button className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-700">
              Navigate
            </button>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <FiMapPin className="text-3xl text-green-400" />

            <h2 className="mt-5 text-xl font-semibold">
              Safe Gathering Point
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Locate designated campus safety areas.
            </p>

            <button className="mt-6 w-full rounded-xl bg-green-600 px-4 py-3 font-semibold hover:bg-green-700">
              Find Location
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default EmergencyPage