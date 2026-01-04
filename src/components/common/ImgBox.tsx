import * as React from 'react'
import { cn } from '@/lib/utils'

type Fit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'

type ImgBoxProps = {
  src: string
  alt: string
  size?: number // px
  width?: number // px
  height?: number // px
  fit?: Fit
  className?: string
  imgClassName?: string
  loading?: 'eager' | 'lazy'
  draggable?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export function ImgBox({
  src,
  alt,
  size = 20,
  width,
  height,
  fit = 'contain',
  className,
  imgClassName,
  loading = 'lazy',
  draggable = false,
  onClick,
}: ImgBoxProps) {
  const w = width ?? size
  const h = height ?? size

  return (
    <div
      className={cn('shrink-0', className)}
      style={{ width: `${w}px`, height: `${h}px` }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        draggable={draggable}
        className={cn('block h-full w-full', `object-${fit}`, imgClassName)}
      />
    </div>
  )
}
