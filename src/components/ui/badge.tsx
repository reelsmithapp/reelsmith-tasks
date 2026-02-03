import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-xs font-semibold uppercase tracking-wide transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/20 text-primary border border-primary/50",
        secondary: "bg-secondary/20 text-secondary border border-secondary/50",
        destructive: "bg-destructive/20 text-destructive border border-destructive/50",
        outline: "border border-frost-10 text-foreground bg-obsidian-elevated",
        // Priority badges
        high: "bg-red-500/20 text-red-400 border border-red-500/50",
        medium: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50",
        low: "bg-green-500/20 text-green-400 border border-green-500/50",
        // Category badges (ReelSmith style)
        marketing: "bg-plasma-500/20 text-plasma-300",
        product: "bg-inferno-500/20 text-inferno-400",
        research: "bg-[#00c4cc]/20 text-[#00c4cc]",
        automation: "bg-[#ff00aa]/20 text-[#ff00aa]",
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
