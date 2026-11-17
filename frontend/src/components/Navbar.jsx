import { Link } from 'react-router-dom'
import { FiMapPin, FiMenu, FiX } from 'react-icons/fi'
import { useState } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const linkStyle = "text-sm text-slate-300 hover:text-blue-400 transition-colors"

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

        <div className="hidden items-center gap-6 lg:flex">
          <Link to="/" className={linkStyle}>
            Home
          </Link>

          <Link to="/map" className={linkStyle}>
            Campus Map
          </Link>

          <Link to="/navigation" className={linkStyle}>
            Navigation
          </Link>

          <Link to="/crowd-prediction" className={linkStyle}>
            Crowd Prediction
          </Link>

          <Link to="/assistant" className={linkStyle}>
            AI Assistant
          </Link>

          <Link
            to="/emergency"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Emergency
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <FiX className="text-2xl" />
          ) : (
            <FiMenu className="text-2xl" />
          )}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-5 lg:hidden">
          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsOpen(false)} className={linkStyle}>
              Home
            </Link>

            <Link to="/map" onClick={() => setIsOpen(false)} className={linkStyle}>
              Campus Map
            </Link>

            <Link to="/navigation" onClick={() => setIsOpen(false)} className={linkStyle}>
              Navigation
            </Link>

            <Link to="/crowd-prediction" onClick={() => setIsOpen(false)} className={linkStyle}>
              Crowd Prediction
            </Link>

            <Link to="/assistant" onClick={() => setIsOpen(false)} className={linkStyle}>
              AI Assistant
            </Link>

            <Link
              to="/emergency"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-red-600 px-4 py-2 text-center text-white hover:bg-red-700"
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
