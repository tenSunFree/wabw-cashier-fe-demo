import SignInForm from '@/components/auth/SignInForm'

export default function SignIn() {
  return (
    <div className="flex flex-column h-svh items-center justify-center gap-6 bg-[#F0F4F9] p-6 md:p-10">
      <SignInForm className="w-full" />
    </div>
  )
}
