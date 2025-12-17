import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card } from '../ui/card'
import { Link } from 'react-router'
import { signInSchema } from '@/schemas/auth.schema'
import { Loader2 } from 'lucide-react'
import { Input } from '../ui/input'
import { GoogleLoginHeader } from './GoogleLoginHeader'

type SignInValues = z.infer<typeof signInSchema>
type SignInForm = ReturnType<typeof useForm<SignInValues>>

// Presentational sign-in card UI.
// - Receives a pre-configured react-hook-form instance (form) from the parent
// - Receives the submit handler (onSubmit) to be executed after validation
// - Receives loading state (isLoading) to disable the submit button and show a spinner
// Note: This component does not manage auth or API calls; it only renders the form UI.
function SignInCard({
  form,
  onSubmit,
  isLoading,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof signInSchema>>>
  onSubmit: (values: z.infer<typeof signInSchema>) => void | Promise<void>
  isLoading: boolean
}) {
  return (
    <Card>
      <div className="flex w-full items-start gap-4 bg-[#F0F4F9]">
        <GoogleLoginHeader />
        <SignInCardForm form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </div>
    </Card>
  )
}

function SignInCardForm({
  form,
  onSubmit,
  isLoading,
}: {
  form: SignInForm
  onSubmit: (values: SignInValues) => void | Promise<void>
  isLoading: boolean
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
        <div className="grid gap-7 px-9 py-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="電子郵件地址或電話號碼"
                    {...field}
                    autoComplete="email"
                  />
                </FormControl>
                <Link
                  to="/auth/forgot-email"
                  className="text-sm text-blue-600 hover:underline"
                >
                  忘記電子郵件地址？
                </Link>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            aria-live="polite"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </div>
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/auth/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  )
}

export default SignInCard
