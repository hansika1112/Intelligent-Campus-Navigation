import { FiMessageCircle, FiSend } from 'react-icons/fi'

function AssistantPage() {
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
              <h2 className="font-semibold">Campus Assistant</h2>
              <p className="text-sm text-green-400">
                Online
              </p>
            </div>
          </div>

          <div className="min-h-80 p-6">
            <div className="max-w-md rounded-2xl rounded-tl-none bg-slate-800 p-4">
              <p className="text-sm text-slate-300">
                Hello! I can help you find campus locations,
                routes, facilities, and accessible pathways.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Ask about your campus..."
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-blue-500"
              />

              <button className="rounded-xl bg-blue-600 px-5 text-white hover:bg-blue-700">
                <FiSend />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AssistantPage