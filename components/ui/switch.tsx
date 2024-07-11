import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const switchVariants = cva(
  "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
  {
    variants: {
      variant: {
        default: "bg-gray-200",
        checked: "bg-primaryBitlanceLightGreen",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const thumbClassNames = (checked: boolean) =>
  checked
    ? "translate-x-5 inline-block h-4 w-4 transform rounded-full bg-primaryBitlanceDark transition-transform"
    : "translate-x-1 inline-block h-4 w-4 transform rounded-full bg-primaryBitlanceDark transition-transform";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof switchVariants> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, variant, checked = false, onChange, ...props }, ref) => {
    const handleClick = () => {
      if (onChange) {
        onChange(!checked);
      }
    };

    return (
      <button
        type="button"
        className={cn(switchVariants({ variant: checked ? "checked" : "default", className }))}
        aria-pressed={checked}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        <span className={thumbClassNames(checked)} />
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, switchVariants };
