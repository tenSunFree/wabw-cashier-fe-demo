import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

type Props = React.ComponentProps<typeof Input> & {
  label: string
}

/**
 * Floating label input (Material-style).
 * - Uses `placeholder=" "` to enable `:placeholder-shown` for label animation.
 * - The label moves up on focus or when the input has a value.
 * - Border color and ring change on focus to match Google/Material outlined fields.
 */
export function FloatingLabelInput({ label, className, ...props }: Props) {
  return (
    <div className="relative">
      <Input
        {...props}
        placeholder=" " // Enable:placeholder-shown
        className={cn(
          // Appearance: height, radius, border, padding, and line-height (centers input text)
          'peer h-14 rounded-[4px] border border-[#777475] bg-transparent px-4 !py-0 text-base !leading-[3.5rem] font-semibold',

          // Remove shadcn default focus ring styles
          'focus-visible:ring-0 focus-visible:ring-offset-0',

          // Blue border on focus
          'focus-visible:border-[#0B57D0]',

          // Thicker blue outline using ring (optional, more like Material)
          'focus-visible:ring-1 focus-visible:ring-[#0B57D0]',

          className,
        )}
      />

      <label
        className={cn(
          'bg-background pointer-events-none absolute left-4 px-1 font-semibold transition-all duration-150',

          // Default (floated) label style
          'top-0 -translate-y-1/2 text-sm text-[#444746]',

          // When empty (placeholder shown): label sits inside the field
          'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-[#444746]',

          // On focus: label turns blue
          'peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-[#0B57D0]',
        )}
      >
        {label}
      </label>
    </div>
  )
}
