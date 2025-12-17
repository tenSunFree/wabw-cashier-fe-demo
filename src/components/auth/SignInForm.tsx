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
// import { signInSchema, type SignInPayload } from "@/schemas/auth.schema";
//
export default function SignInForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { signIn: setAuthToken } = useAuth()
  const { execute: performSignIn, isLoading } = useApi(signInService)
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  async function onSubmit(values: z.infer<typeof signInSchema>) {
    const response = await performSignIn(values)
    if (response.error) {
      toast.error(response.error || 'an unknown error occurred.')
      return
    }
    // console.log(response);
    if (response.data && response.data.token) {
      const token = response.data.token
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
    <div className={cn('flex w-full flex-col gap-4', className)} {...props}>
      <SignInCard form={form} onSubmit={onSubmit} isLoading={isLoading} />
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        <span>Made by Adhim Niokagi - 3124510109</span>
        <br />
        <Link to="/privacy-policy">Privacy Policy</Link>.
      </div>
    </div>
  )
}
