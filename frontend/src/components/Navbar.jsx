import { Link } from 'react-router-dom'
import { FiMapPin, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <FiMapPin className="text-xl text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              Intelligent Campus
            </h1>
            <p className="text-xs text-slate-400">
              Navigation & Mobility
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link to="/" className="text-sm text-slate-300 hover:text-blue-400">
            Home
          </Link>

          <Link to="/map" className="text-sm text-slate-300 hover:text-blue-400">
            Campus Map
          </Link>

          <Link to="/navigation" className="text-sm text-slate-300 hover:text-blue-400">
            Navigation
          </Link>

          <Link to="/assistant" className="text-sm text-slate-300 hover:text-blue-400">
            AI Assistant
          </Link>

          <Link
            to="/emergency"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Emergency
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white md:hidden"
        >
          {isOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-slate-300">
              Home
            </Link>

            <Link to="/map" onClick={() => setIsOpen(false)} className="text-slate-300">
              Campus Map
            </Link>

            <Link to="/navigation" onClick={() => setIsOpen(false)} className="text-slate-300">
              Navigation
            </Link>

            <Link to="/assistant" onClick={() => setIsOpen(false)} className="text-slate-300">
              AI Assistant
            </Link>

            <Link
              to="/emergency"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-red-600 px-4 py-2 text-center text-white"
            >
              Emergency Assistance
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar