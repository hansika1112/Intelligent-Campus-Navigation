function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="font-bold text-white">
              Intelligent Campus Navigation
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Smart navigation and mobility assistance for modern campuses.
            </p>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 Intelligent Campus Navigation
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer