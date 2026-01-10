import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export type LanguageOption = {
  value: string
  label: string
}

type FooterLinksBarProps = {
  className?: string

  // Language
  language?: LanguageOption
  languages?: LanguageOption[]
  onLanguageChange?: (lang: LanguageOption) => void
  onLanguageClick?: () => void // Triggered when the language button is clicked (opens dropdown)

  // Right links
  onHelpClick?: () => void
  onPrivacyClick?: () => void
  onTermsClick?: () => void
}

const DEFAULT_LANGUAGES: LanguageOption[] = [
  { value: 'zh-Hant', label: '繁體中文' },
  { value: 'zh-Hans', label: '简体中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
]

// FooterLinksBar
// - A lightweight footer/topbar-style strip that matches the "language + links" layout.
// - Left: language dropdown trigger (and menu items)
// - Right: three action links ("Help", "Privacy settings", "Terms")
// Event callbacks exposed to the parent:
// - onLanguageClick: fired when the language trigger button is clicked (typically opens the dropdown)
// - onLanguageChange: fired when a language option is selected from the dropdown
// - onHelpClick / onPrivacyClick / onTermsClick: fired when the corresponding action button is clicked
export function FooterLinksBar({
  className,
  language = DEFAULT_LANGUAGES[0],
  languages = DEFAULT_LANGUAGES,
  onLanguageChange,
  onLanguageClick,
  onHelpClick,
  onPrivacyClick,
  onTermsClick,
}: FooterLinksBarProps) {
  return (
    <div
      className={cn('w-full bg-[#f5f7f8] text-sm text-slate-700', className)}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4">
        {/* Left: Language dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              onClick={onLanguageClick}
              className="inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-black/5 focus:ring-2 focus:ring-black/20 focus:outline-none"
              aria-label="Language"
            >
              <span className="select-none">{language.label}</span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-44">
            {languages.map((opt) => (
              <DropdownMenuItem
                key={opt.value}
                onClick={() => onLanguageChange?.(opt)}
                className={cn(opt.value === language.value && 'font-medium')}
              >
                {opt.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* Right: links */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={onHelpClick}
            className="rounded-md px-2 py-1 hover:bg-black/5 hover:underline focus:ring-2 focus:ring-black/20 focus:outline-none"
          >
            說明
          </button>
          <button
            type="button"
            onClick={onPrivacyClick}
            className="rounded-md px-2 py-1 hover:bg-black/5 hover:underline focus:ring-2 focus:ring-black/20 focus:outline-none"
          >
            隱私權設定
          </button>
          <button
            type="button"
            onClick={onTermsClick}
            className="rounded-md px-2 py-1 hover:bg-black/5 hover:underline focus:ring-2 focus:ring-black/20 focus:outline-none"
          >
            條款
          </button>
        </div>
      </div>
    </div>
  )
}

export default FooterLinksBar
