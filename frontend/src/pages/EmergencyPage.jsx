import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FiAlertTriangle,
  FiPhone,
  FiMapPin,
  FiNavigation,
  FiShield,
  FiCheckCircle
} from 'react-icons/fi'
import { campusLocations } from '../data/campusLocations'

function EmergencyPage() {
  const navigate = useNavigate()

  const medicalCenter = useMemo(
    () =>
      campusLocations.find(
        (location) =>
          location.category === 'Healthcare' &&
          location.emergency
      ),
    []
  )

  const handleMedicalNavigation = () => {
    navigate('/navigation')
  }

  const handleMedicalMap = () => {
    navigate('/map')
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-16 pt-32 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20">
            <FiAlertTriangle className="text-3xl text-red-500" />
          </div>

          <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-red-400">
            Emergency Support
          </p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            Emergency Assistance
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Quickly access emergency services and find important
            safety locations on campus.
          </p>

        </div>

        <div className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/10 p-6">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600/20">
                <FiAlertTriangle className="text-xl text-red-400" />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Need Immediate Help?
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  For immediate emergency assistance in India,
                  contact emergency services.
                </p>
              </div>

            </div>

            <a
              href="tel:112"
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold transition hover:bg-red-700"
            >
              <FiPhone />
              Call 112
            </a>

          </div>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-red-900/50 bg-red-950/20 p-6">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20">
              <FiPhone className="text-2xl text-red-500" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Emergency Services
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Contact emergency services for immediate help
              during a serious emergency.
            </p>

            <a
              href="tel:112"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold transition hover:bg-red-700"
            >
              <FiPhone />
              Call Emergency Services
            </a>

          </div>

          <div className="rounded-2xl border border-blue-500/30 bg-slate-900 p-6">

            <div className="flex items-center justify-between">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/20">
                <FiMapPin className="text-2xl text-blue-400" />
              </div>

              {medicalCenter?.emergency && (
                <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
                  🚨 Emergency
                </span>
              )}

            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Medical Center
            </h2>

            {medicalCenter ? (
              <>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {medicalCenter.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">

                  {medicalCenter.wheelchairAccess && (
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                      ♿ Wheelchair Accessible
                    </span>
                  )}

                  {medicalCenter.accessibility && (
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                      Accessible
                    </span>
                  )}

                </div>

                <button
                  onClick={handleMedicalNavigation}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-semibold transition hover:bg-blue-700"
                >
                  <FiNavigation />
                  Navigate
                </button>

                <button
                  onClick={handleMedicalMap}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-semibold text-slate-200 transition hover:border-blue-500 hover:text-blue-400"
                >
                  <FiMapPin />
                  View on Map
                </button>
              </>
            ) : (
              <p className="mt-3 text-sm text-slate-400">
                No emergency medical facility is currently configured.
              </p>
            )}

          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600/20">
              <FiShield className="text-2xl text-green-400" />
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              Safe Gathering Point
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Designated safe gathering points can be added
              to the campus location database.
            </p>

            <div className="mt-5 flex items-center gap-2 rounded-xl border border-green-500/20 bg-green-500/5 p-3">
              <FiCheckCircle className="shrink-0 text-green-400" />

              <span className="text-xs text-slate-400">
                Safety location data can be configured here.
              </span>
            </div>

            <button
              onClick={() => navigate('/map')}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold transition hover:bg-green-700"
            >
              <FiMapPin />
              Open Campus Map
            </button>

          </div>

        </div>

        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-red-600/10">
              <FiAlertTriangle className="text-red-400" />
            </div>

            <div>

              <h2 className="font-semibold">
                Emergency Navigation
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                Use the Navigation module to calculate a route
                to the configured Medical Center. Accessibility
                preferences such as wheelchair access and avoiding
                restricted paths can be selected there.
              </p>

              <button
                onClick={handleMedicalNavigation}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium transition hover:bg-slate-700"
              >
                Open Navigation
                <FiNavigation />
              </button>

            </div>

          </div>

        </div>

      </div>
    </main>
  )
}

export default EmergencyPage