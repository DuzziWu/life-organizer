import React from 'react'
import { cn } from '../../lib/utils'

interface LiquidGlassCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'elevated' | 'subtle'
}

export function LiquidGlassCard({ 
  children, 
  className, 
  variant = 'default' 
}: LiquidGlassCardProps) {
  const variants = {
    default: [
      'backdrop-blur-xl bg-white/[0.08]',
      'border border-white/[0.12]',
      'shadow-2xl shadow-black/25',
      'before:absolute before:inset-0 before:rounded-2xl',
      'before:bg-gradient-to-br before:from-white/[0.15] before:to-transparent',
      'before:pointer-events-none',
    ],
    elevated: [
      'backdrop-blur-2xl bg-white/[0.12]',
      'border border-white/[0.18]',
      'shadow-3xl shadow-black/40',
      'before:absolute before:inset-0 before:rounded-3xl',
      'before:bg-gradient-to-br before:from-white/[0.2] before:via-white/[0.08] before:to-transparent',
      'before:pointer-events-none',
    ],
    subtle: [
      'backdrop-blur-lg bg-white/[0.04]',
      'border border-white/[0.08]',
      'shadow-xl shadow-black/15',
      'before:absolute before:inset-0 before:rounded-xl',
      'before:bg-gradient-to-br before:from-white/[0.1] before:to-transparent',
      'before:pointer-events-none',
    ]
  }

  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden',
        'transition-all duration-500 ease-out',
        'hover:scale-[1.02] hover:shadow-4xl',
        'group',
        variants[variant],
        className
      )}
    >
      {/* Animated background gradients */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-400/20 to-pink-600/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Shine effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </div>
    </div>
  )
}