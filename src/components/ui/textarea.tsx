import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md bg-frost-5 backdrop-blur-sm border border-frost-10 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
          "focus:outline-none focus:border-inferno-500 focus:ring-2 focus:ring-inferno-500/20 focus:shadow-lg focus:shadow-inferno-500/10",
          "transition-all duration-200 resize-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
