import { useForm, type UseFormReturn } from 'react-hook-form'
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
import {
  signInDraftSchema,
  signInSchema,
  type SignInDraftFormValues,
} from '@/schemas/auth.schema'
import { Loader2 } from 'lucide-react'
import { Input } from '../ui/input'
import { GoogleLoginHeader } from './GoogleLoginHeader'
import GuestLoginFooter from './GuestLoginFooter'
import { FloatingLabelInput } from './FloatingLabelInput'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'

type SignInValues = z.infer<typeof signInSchema>
type SignInForm = ReturnType<typeof useForm<SignInValues>>

type Step = 'email' | 'password'

// Presentational sign-in card UI.
// - Receives a pre-configured react-hook-form instance (form) from the parent
// - Receives the submit handler (onSubmit) to be executed after validation
// - Receives loading state (isLoading) to disable the submit button and show a spinner
// Note: This component does not manage auth or API calls; it only renders the form UI.
function SignInCard({
  className,
  onSubmit,
  isLoading,
}: {
  className?: string
  onSubmit: (values: z.infer<typeof signInSchema>) => void | Promise<void>
  isLoading: boolean
}) {
  const [step, setStep] = React.useState<Step>('email')
  const [savedEmail, setSavedEmail] = React.useState('')

  // Using draft schema keeps step 1 from being blocked by the password field
  const form = useForm<SignInDraftFormValues>({
    resolver: zodResolver(signInDraftSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
  })

  return (
    <Card className={className}>
      <div className="flex h-full w-full items-start gap-4 bg-[#11009900]">
        <div className="flex flex-col">
          <GoogleLoginHeader
            title="登入"
            subtitle={step === 'password' ? savedEmail : '使用你的 Google 帳戶'}
          />
          <div className="flex-1" />
        </div>
        <div className="flex-1" />
        <div className="flex h-full flex-col">
          <div className="flex-1" />
          <SignInCardForm
            form={form}
            step={step}
            setStep={setStep}
            savedEmail={savedEmail}
            setSavedEmail={setSavedEmail}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Card>
  )
}

// Helper: map Zod validation issues into react-hook-form field errors.
// - Reads the first path segment (e.g. "email", "password") as the field name
// - Uses RHF `setError` so errors show up via <FormMessage />
// Note: This is mainly used when we validate with `signInSchema.safeParse(...)`
// (step 2) instead of relying on the resolver alone.
function applyZodErrorsToRHF(
  issues: z.ZodIssue[],
  setError: UseFormReturn<any>['setError'],
) {
  for (const issue of issues) {
    const name = issue.path?.[0]
    if (typeof name === 'string') {
      setError(name as any, { type: 'manual', message: issue.message })
    }
  }
}

export function SignInCardForm({
  form,
  step,
  setStep,
  savedEmail,
  setSavedEmail,
  onSubmit,
  isLoading,
}: {
  form: UseFormReturn<SignInDraftFormValues>
  step: Step
  setStep: (s: Step) => void
  savedEmail: string
  setSavedEmail: (v: string) => void
  onSubmit: (values: SignInValues) => void | Promise<void>
  isLoading: boolean
}) {
  const [showPassword, setShowPassword] = React.useState(false)
  const handleNext = async () => {
    if (isLoading) return
    if (step === 'email') {
      const ok = await form.trigger('email')
      if (!ok) return
      const email = form.getValues('email').trim()
      setSavedEmail(email)
      // Optional: persist email across refreshes
      // localStorage.setItem('login_email', email)
      setStep('password')
      // UX: automatically focus password after switching steps
      queueMicrotask(() => form.setFocus('password'))
      return
    }
    // step === 'password'
    const raw = form.getValues()
    const parsed = signInSchema.safeParse(raw)
    if (!parsed.success) {
      applyZodErrorsToRHF(parsed.error.issues, form.setError)
      return
    }
    await onSubmit(parsed.data)
  }
  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="md:w-95">
        <div className="grid gap-3 py-3">
          {step === 'email' ? (
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
                    className="text-sm font-semibold text-[#0B57D0] hover:underline"
                  >
                    忘記電子郵件地址？
                  </Link>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Password</FormLabel>
                    <FormControl>
                      {/* password input */}
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="輸入您的密碼"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* show password checkbox */}
              <label className="mt-2 inline-flex items-center gap-3 select-none">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-sm font-semibold text-neutral-800">
                  顯示密碼
                </span>
              </label>
            </>
          )}
        </div>
        <div className="h-8" />
        <GuestLoginFooter
          onCreateAccountClick={() => console.log('create account')}
          onNext={handleNext}
          nextDisabled={isLoading}
          nextLabel="下一步"
        />
      </form>
    </Form>
  )
}

export default SignInCard
