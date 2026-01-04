import googleLogo2026 from '@/assets/icons/google_2026.png'

export function GoogleLogo() {
  return (
    <div className="flex justify-center select-none">
      <img
        src={googleLogo2026}
        alt="Google"
        className="h-[110px] w-auto"
        draggable={false}
      />
    </div>
  )
}
