import * as React from 'react'

type GuestLoginFooterProps = {
  className?: string

  // Links (choose one: href or onClick)
  learnMoreHref?: string
  onLearnMoreClick?: () => void

  createAccountHref?: string
  onCreateAccountClick?: () => void

  // Next button
  nextLabel?: string
  onNext?: () => void
  nextDisabled?: boolean
}

// GuestLoginFooter
// - Google-style footer section for the sign-in page.
// - Shows a privacy hint (guest mode) with a "Learn more" link.
// - Renders bottom actions: "Create account" link (left) and "Next" primary button (right).
// - Link actions support either `href` (navigation) or `onClick` (custom handler).
// - Pure presentational component: no auth logic, no side effects.
export default function GuestLoginFooter({
  className = '',
  learnMoreHref,
  onLearnMoreClick,
  createAccountHref,
  onCreateAccountClick,
  nextLabel = '下一步',
  onNext,
  nextDisabled = false,
}: GuestLoginFooterProps) {
  return (
    <div className={`w-full bg-[#22558800] ${className}`}>
      {/* Top notice */}
      <p className="text-sm leading-6 font-semibold text-neutral-700">
        如果這不是你的電腦，請使用訪客模式以私密方式登入。{' '}
        <ActionLink
          href={learnMoreHref}
          onClick={onLearnMoreClick}
          ariaLabel="進一步瞭解如何使用訪客模式"
        >
          進一步瞭解如何使用訪客模式
        </ActionLink>
      </p>
      {/* Bottom actions */}
      <div className="mt-8 flex items-center bg-[#22558800]">
        <div className="flex-1" />
        <ActionLink
          href={createAccountHref}
          onClick={onCreateAccountClick}
          ariaLabel="建立帳戶"
        >
          建立帳戶
        </ActionLink>
        <div className="w-12" />
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className={[
            'inline-flex items-center justify-center rounded-full px-6 py-2.5',
            'text-sm font-medium text-white',
            'bg-[#0b57d0] hover:bg-[#1667d6] active:bg-[#145fc5]',
            'focus:ring-2 focus:ring-[#1a73e8] focus:ring-offset-2 focus:outline-none',
            'disabled:cursor-not-allowed disabled:opacity-60',
          ].join(' ')}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  )
}

function ActionLink({
  href,
  onClick,
  children,
  ariaLabel,
}: {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  ariaLabel: string
}) {
  const common =
    'text-sm font-semibold text-[#1a73e8] hover:underline underline-offset-4'
  // Use an anchor when href is provided; otherwise fall back to a button (Google link-button style).
  if (href) {
    return (
      <a href={href} className={common} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={common}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
