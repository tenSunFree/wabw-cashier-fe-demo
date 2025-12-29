import { LayoutGrid } from 'lucide-react'
import homeMore from '@/assets/icons/home_more.png'

export function TopNav() {
  return (
    <header className="w-full">
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        {/* left */}
        <nav className="flex items-center gap-6 text-sm text-neutral-700">
          <a
            href="#"
            className="underline-offset-4 hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            關於 Google
          </a>
          <a
            href="#"
            className="underline-offset-4 hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            Google 商店
          </a>
        </nav>

        {/* right */}
        <nav className="flex items-center gap-5 text-sm text-neutral-700">
          <a
            href="#"
            className="underline-offset-4 hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            Gmail
          </a>
          <a
            href="#"
            className="underline-offset-4 hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            圖片
          </a>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-neutral-100"
            aria-label="Google apps"
          >
            {/* <LayoutGrid className="h-5 w-5" /> */}
            <img
              src={homeMore}
              alt="Google"
              className="h-5 w-5 select-none"
              draggable={false}
            />
          </button>

          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white"
            aria-label="Account"
            title="Account"
          >
            S
          </div>
        </nav>
      </div>
    </header>
  )
}
