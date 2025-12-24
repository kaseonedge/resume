import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700/50",
        secondary:
          "border-zinc-600/50 bg-zinc-800/30 text-zinc-400 hover:bg-zinc-700/40",
        rust:
          "border-orange-500/40 bg-orange-500/15 text-orange-300 hover:bg-orange-500/25 hover:border-orange-400/60 shadow-sm shadow-orange-500/10",
        ai:
          "border-emerald-400/50 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 hover:border-emerald-400/70 shadow-sm shadow-emerald-500/20",
        infra:
          "border-blue-500/40 bg-blue-500/15 text-blue-300 hover:bg-blue-500/25 hover:border-blue-400/60 shadow-sm shadow-blue-500/10",
        outline:
          "border-zinc-700 text-zinc-400 hover:bg-zinc-800/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

