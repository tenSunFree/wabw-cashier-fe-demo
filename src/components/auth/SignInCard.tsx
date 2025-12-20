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
import GuestLoginFooter from './GuestLoginFooter'
import { FloatingLabelInput } from './FloatingLabelInput'

type SignInValues = z.infer<typeof signInSchema>
type SignInForm = ReturnType<typeof useForm<SignInValues>>

// Presentational sign-in card UI.
// - Receives a pre-configured react-hook-form instance (form) from the parent
// - Receives the submit handler (onSubmit) to be executed after validation
// - Receives loading state (isLoading) to disable the submit button and show a spinner
// Note: This component does not manage auth or API calls; it only renders the form UI.
function SignInCard({
  className,
  form,
  onSubmit,
  isLoading,
}: {
  className?: string
  form: ReturnType<typeof useForm<z.infer<typeof signInSchema>>>
  onSubmit: (values: z.infer<typeof signInSchema>) => void | Promise<void>
  isLoading: boolean
}) {
  return (
    <Card className={className}>
      <div className="flex h-full w-full items-start gap-4 bg-[#11009900]">
        <div className="flex flex-col">
          <GoogleLoginHeader />
          <div className="flex-1" />
        </div>
        <div className="flex-1" />
        <div className="flex h-full flex-col">
          <div className="flex-1" />
          <SignInCardForm
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </div>
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-[#11882200] md:w-95"
      >
        <div className="grid gap-7 bg-[#44660000] py-3">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <FloatingLabelInput
                    {...field}
                    label="電子郵件地址或電話號碼"
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
          {/* 
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
          */}
        </div>
        <div className="h-8" />
        <GuestLoginFooter
          learnMoreHref="/help/guest-mode"
          onCreateAccountClick={() => console.log('create account')}
          onNext={() => console.log('next')}
        />
        {/* 
        <div className="text-center text-sm">
          Don't have an account?{' '}
          <Link to="/auth/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
        */}
      </form>
    </Form>
  )
}

export default SignInCard
