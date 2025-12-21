import googleLogo from '@/assets/icons/google_logo.png'

type GoogleLoginHeaderProps = {
  title?: string
  subtitle?: string
  className?: string
}

// Google-style header used on the sign-in page.
// - Renders the Google logo, a title, and a subtitle.
// - `title` and `subtitle` are optional and have sensible defaults.
// - `className` lets the parent tweak spacing/alignment without changing this component.
export function GoogleLoginHeader({
  title = '登入',
  subtitle = '使用你的 Google 帳戶',
  className = '',
}: GoogleLoginHeaderProps) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="h-[9px]" />
      <img
        src={googleLogo}
        alt="Google"
        className="h-9 w-9 select-none"
        draggable={false}
      />
       <div className="h-[18px]" />
      <h1 className="text-4xl font-medium tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-4 text-base">{subtitle}</p>
    </div>
  )
}
