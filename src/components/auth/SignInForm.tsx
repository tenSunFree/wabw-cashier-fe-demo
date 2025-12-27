import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { useApi } from '@/hooks/useApi'
import { signInService } from '@/services/auth.service'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { signInSchema } from '@/schemas/auth.schema'
import SignInCard from './SignInCard'
import { FooterLinksBar } from './FooterLinksBar'
// import { signInSchema, type SignInPayload } from "@/schemas/auth.schema";
//
export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { signIn: setAuthToken } = useAuth()
  const { execute: performSignIn, isLoading } = useApi(signInService)
  const navigate = useNavigate()
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    console.log('SignInForm, onSubmit, email:', values.email)
    console.log('SignInForm, onSubmit, password:', values.password)
    const response = await performSignIn(values)
    console.log('SignInForm, onSubmit, response:', response)
    if (response.error) {
      console.log('SignInForm, onSubmit, error:', response.error)
      toast.error(response.error || 'an unknown error occurred.')
      return
    }
    console.log('SignInForm, onSubmit, data:', response.data)
    // console.log(response);
    if (response.data && response.data.accessToken) {
      const token = response.data.accessToken
      if (response.successMessage) {
        toast.success(response.successMessage)
      }
      setTimeout(() => {
        setAuthToken(token)
        navigate('/', { replace: true })
      }, 1050)
    } else {
      toast.error(response.error || 'an unknown error occurred')
      // toast.error('an unknown error occurred')
    }
  }
  return (
    <div
      className={cn(
        'as flex w-full flex-col items-center gap-4 md:max-h-[90svh] md:w-[73.5%]',
        className,
      )}
      {...props}
    >
      <SignInCard
        className="w-full p-12 md:h-[90svh]"
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
      <FooterLinksBar
        onLanguageClick={() => console.log('language trigger click')}
        onLanguageChange={(lang) => console.log('change:', lang)}
        onHelpClick={() => console.log('help')}
        onPrivacyClick={() => console.log('privacy')}
        onTermsClick={() => console.log('terms')}
      />
    </div>
  )
}
