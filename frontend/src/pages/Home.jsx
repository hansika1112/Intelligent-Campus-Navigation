import {
  FiMap,
  FiNavigation,
  FiCheckCircle,
  FiSearch,
  FiArrowRight,
} from 'react-icons/fi'

function Home() {
  const features = [
    {
      icon: FiMap,
      title: 'Campus Map',
      description:
        'Explore buildings, facilities, roads, and important campus locations.',
    },
    {
      icon: FiNavigation,
      title: 'Smart Navigation',
      description:
        'Find optimized routes between any two locations on campus.',
    },
    {
      icon: FiCheckCircle,
      title: 'Accessible Routes',
      description:
        'Find mobility-friendly routes that avoid inaccessible pathways.',
    },
    {
      icon: FiSearch,
      title: 'Find Facilities',
      description:
        'Quickly discover libraries, cafeterias, medical centers, and more.',
    },
  ]

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden pt-32">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="mx-auto max-w-4xl">
            <span className="inline-flex rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              Smart Campus Mobility Platform
            </span>

            <h1 className="mt-8 text-5xl font-bold tracking-tight md:text-7xl">
              Navigate Your Campus
              <span className="block text-blue-500">
                Smarter & Faster
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Intelligent Campus Navigation & Mobility Assistant helps
              students, faculty, staff, and visitors find routes,
              facilities, and accessible paths across the campus.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold transition hover:bg-blue-700">
                Explore Campus
                <FiArrowRight />
              </button>

              <button className="rounded-xl border border-slate-700 px-7 py-3.5 font-semibold text-slate-200 transition hover:bg-slate-900">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-slate-900/40 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Everything You Need on Campus
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              One intelligent platform for navigation, mobility,
              accessibility, and campus discovery.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-blue-500/50"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10">
                    <Icon className="text-2xl text-blue-400" />
                  </div>

                  <h3 className="text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home