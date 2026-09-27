import { useState } from 'react'
import {
  FiMessageCircle,
  FiSend,
  FiMapPin,
  FiNavigation,
  FiShield
} from 'react-icons/fi'
import { campusLocations } from '../data/campusLocations'

function AssistantPage() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: 'Hello! I can help you find campus locations, routes, facilities, and accessible pathways.'
    }
  ])

  const findLocation = (query) => {
    const searchText = query.toLowerCase()

    return campusLocations.find((location) => {
      return (
        location.name.toLowerCase().includes(searchText) ||
        location.category.toLowerCase().includes(searchText)
      )
    })
  }

  const getAssistantResponse = (query) => {
    const searchText = query.toLowerCase()

    if (
      searchText.includes('accessible') ||
      searchText.includes('wheelchair')
    ) {
      const accessibleFacilities =
        campusLocations.filter(
          (location) => location.wheelchairAccess
        )

      if (!accessibleFacilities.length) {
        return {
          text: 'I could not find any facilities marked as wheelchair accessible.',
          locations: []
        }
      }

      return {
        text: `I found ${accessibleFacilities.length} accessible facilities on the campus.`,
        locations: accessibleFacilities
      }
    }

    if (
      searchText.includes('emergency') ||
      searchText.includes('medical') ||
      searchText.includes('hospital')
    ) {
      const emergencyFacilities =
        campusLocations.filter(
          (location) =>
            location.emergency ||
            location.category === 'Healthcare'
        )

      return {
        text: 'Here are the available emergency healthcare facilities.',
        locations: emergencyFacilities
      }
    }

    const location = findLocation(searchText)

    if (location) {
      return {
        text: `${location.name} is a ${location.category} facility. ${location.description}`,
        locations: [location]
      }
    }

    if (
      searchText.includes('food') ||
      searchText.includes('cafeteria') ||
      searchText.includes('eat')
    ) {
      const foodFacilities =
        campusLocations.filter(
          (location) =>
            location.category === 'Food'
        )

      return {
        text: 'Here are the available food facilities.',
        locations: foodFacilities
      }
    }

    if (
      searchText.includes('hostel') ||
      searchText.includes('accommodation')
    ) {
      const hostels =
        campusLocations.filter(
          (location) =>
            location.category === 'Hostel'
        )

      return {
        text: 'Here are the available hostel facilities.',
        locations: hostels
      }
    }

    if (
      searchText.includes('library')
    ) {
      const libraries =
        campusLocations.filter(
          (location) =>
            location.category === 'Library'
        )

      return {
        text: 'Here are the available library facilities.',
        locations: libraries
      }
    }

    return {
      text: 'I can help you find campus buildings, libraries, hostels, cafeterias, healthcare facilities, emergency locations, and accessible facilities. Try asking "Where is the library?" or "Find accessible facilities."',
      locations: []
    }
  }

  const handleSend = () => {
    const query = input.trim()

    if (!query) {
      return
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: query
    }

    const response = getAssistantResponse(query)

    const assistantMessage = {
      id: Date.now() + 1,
      type: 'assistant',
      text: response.text,
      locations: response.locations
    }

    setMessages((previous) => [
      ...previous,
      userMessage,
      assistantMessage
    ])

    setInput('')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 pb-16 pt-32 text-white">
      <div className="mx-auto max-w-4xl">

        <div className="mb-10 text-center">

          <span className="text-sm font-medium text-blue-400">
            AI NAVIGATION ASSISTANT
          </span>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            How Can I Help You?
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Ask me about campus locations, routes, facilities,
            accessibility, and navigation.
          </p>

        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

          <div className="flex items-center gap-3 border-b border-slate-800 p-5">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
              <FiMessageCircle />
            </div>

            <div>
              <h2 className="font-semibold">
                Campus Assistant
              </h2>

              <p className="text-sm text-green-400">
                Online
              </p>
            </div>

          </div>

          <div className="min-h-[420px] space-y-5 overflow-y-auto p-6">

            {messages.map((message) => (
              <div
                key={message.id}
                className={
                  message.type === 'user'
                    ? 'flex justify-end'
                    : 'flex justify-start'
                }
              >

                <div
                  className={
                    message.type === 'user'
                      ? 'max-w-md rounded-2xl rounded-tr-none bg-blue-600 p-4'
                      : 'max-w-lg rounded-2xl rounded-tl-none bg-slate-800 p-4'
                  }
                >

                  <p className="text-sm leading-6 text-slate-100">
                    {message.text}
                  </p>

                  {message.locations?.length > 0 && (
                    <div className="mt-4 space-y-3">

                      {message.locations.map(
                        (location) => (
                          <div
                            key={location.id}
                            className="rounded-xl border border-slate-700 bg-slate-950 p-4"
                          >

                            <div className="flex items-start gap-3">

                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600/20">
                                <FiMapPin className="text-blue-400" />
                              </div>

                              <div>
                                <p className="font-semibold text-white">
                                  {location.name}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  {location.category}
                                </p>
                              </div>

                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">

                              {location.wheelchairAccess && (
                                <span className="rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-400">
                                  ♿ Accessible
                                </span>
                              )}

                              {location.emergency && (
                                <span className="rounded-full bg-red-500/10 px-2 py-1 text-xs text-red-400">
                                  🚨 Emergency
                                </span>
                              )}

                            </div>

                          </div>
                        )
                      )}

                    </div>
                  )}

                </div>

              </div>
            ))}

          </div>

          <div className="border-t border-slate-800 p-4">

            <div className="flex gap-3">

              <input
                type="text"
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask about your campus..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex items-center justify-center rounded-xl bg-blue-600 px-5 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <FiSend />
              </button>

            </div>

            <div className="mt-3 flex flex-wrap gap-2">

              <button
                type="button"
                onClick={() =>
                  setInput('Where is the library?')
                }
                className="rounded-full bg-slate-800 px-3 py-2 text-xs text-slate-300 hover:bg-slate-700"
              >
                Where is the library?
              </button>

              <button
                type="button"
                onClick={() =>
                  setInput('Find accessible facilities')
                }
                className="rounded-full bg-slate-800 px-3 py-2 text-xs text-slate-300 hover:bg-slate-700"
              >
                Accessible facilities
              </button>

              <button
                type="button"
                onClick={() =>
                  setInput('Where is the medical center?')
                }
                className="rounded-full bg-slate-800 px-3 py-2 text-xs text-slate-300 hover:bg-slate-700"
              >
                Medical center
              </button>

            </div>

          </div>

        </div>

      </div>
    </main>
  )
}

export default AssistantPage