import { Plus } from 'lucide-react'

export function SearchBar() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-3xl">
        <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-3 shadow-sm transition-shadow hover:shadow">
          {/* left + */}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100"
            aria-label="Add"
          >
            <Plus className="h-5 w-5" />
          </button>

          {/* input */}
          <input
            className="flex-1 bg-transparent px-2 text-base outline-none"
            placeholder=""
            aria-label="Search"
          />

          {/* right tools */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100"
              aria-label="Voice search"
            >
              <Mic className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100"
              aria-label="Image search"
            >
              <Camera className="h-5 w-5" />
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm hover:bg-neutral-100"
            >
              <Sparkles className="h-4 w-4" />
              <span>AI 模式</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
