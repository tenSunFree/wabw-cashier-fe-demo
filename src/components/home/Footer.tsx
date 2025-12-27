export function Footer() {
  return (
    <footer className="mt-auto bg-neutral-100 text-neutral-700">
      {/* country row */}
      <div className="px-6 py-3 text-sm">台灣</div>
      <div className="h-px bg-neutral-200" />

      {/* links row */}
      <div className="flex flex-col gap-2 px-6 py-3 text-sm md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {['廣告', '商業', '搜尋服務的運作方式'].map((t) => (
            <a
              key={t}
              href="#"
              className="underline-offset-4 hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              {t}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {['隱私權', '服務條款', '設定'].map((t) => (
            <a
              key={t}
              href="#"
              className="underline-offset-4 hover:underline"
              onClick={(e) => e.preventDefault()}
            >
              {t}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
