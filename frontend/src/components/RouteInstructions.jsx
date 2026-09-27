import {
  FiCheck,
  FiMapPin,
  FiNavigation
} from 'react-icons/fi'
import { campusLocations } from '../data/campusLocations'

function RouteInstructions({
  start,
  destination,
  pathNodes = []
}) {
  const pathLocations = pathNodes
    .map((nodeId) =>
      campusLocations.find(
        (location) => location.id === Number(nodeId)
      )
    )
    .filter(Boolean)

  if (!pathLocations.length) {
    return (
      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-5">
        <div className="flex items-center gap-3">
          <FiNavigation className="text-blue-400" />

          <div>
            <h3 className="font-semibold text-white">
              Route Instructions
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Follow the highlighted route on the map.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-5">

      <div className="flex items-center gap-3">

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/20">
          <FiNavigation className="text-blue-400" />
        </div>

        <div>
          <h3 className="font-semibold text-white">
            Route Instructions
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Follow these campus path points.
          </p>
        </div>

      </div>

      <div className="mt-6">

        {pathLocations.map((location, index) => {

          const isStart = index === 0
          const isDestination =
            index === pathLocations.length - 1

          return (
            <div
              key={`${location.id}-${index}`}
              className="relative flex gap-4"
            >

              {!isDestination && (
                <div className="absolute left-5 top-11 h-[calc(100%-20px)] w-px bg-slate-700" />
              )}

              <div
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  isStart
                    ? 'bg-blue-600'
                    : isDestination
                      ? 'bg-green-600'
                      : 'bg-slate-800'
                }`}
              >
                {isStart ? (
                  <FiMapPin className="text-white" />
                ) : isDestination ? (
                  <FiCheck className="text-white" />
                ) : (
                  <FiNavigation className="text-blue-400" />
                )}
              </div>

              <div className="pb-7">

                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  {isStart
                    ? 'Starting Point'
                    : isDestination
                      ? 'Destination'
                      : `Step ${index}`}
                </p>

                <p className="mt-1 font-semibold text-white">
                  {location.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {location.category}
                </p>

              </div>

            </div>
          )
        })}

      </div>

      <div className="mt-2 rounded-lg border border-green-500/20 bg-green-500/5 p-4">

        <div className="flex items-center gap-2">

          <FiCheck className="text-green-400" />

          <p className="text-sm font-medium text-green-300">
            Arrive at {destination.name}
          </p>

        </div>

      </div>

    </div>
  )
}

export default RouteInstructions