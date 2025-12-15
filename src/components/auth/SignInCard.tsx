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
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Link } from 'react-router'
import { signInSchema } from '@/schemas/auth.schema'
import { Loader2 } from 'lucide-react'
import { Input } from '../ui/input'

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
      <CardHeader className="text-center">
        <CardTitle id="signin-form-card" className="text-xl">
          Welcome back
        </CardTitle>
        <CardDescription>
          Sign in with your Cashier Account Credential
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
          {/* wrapper */}
          <div className="grid gap-7 px-9 py-3">
            {/* email */}
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
                  {/* Blue helper link (e.g., forgot-account page) */}
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
            {/* password */}
            {/*
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Password</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      {...field}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            */}
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
    </Card>
  )
}

export default SignInCard
