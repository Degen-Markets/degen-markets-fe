import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { HTMLAttributes } from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full text-main  border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-main text-primary-foreground hover:bg-main/80",
        primary: "border-transparent bg-primary hover:bg-primary-light",
        danger: "border-transparent bg-danger hover:bg-danger-light",
        secondary: "border-transparent bg-secondary hover:bg-secondary-light",
        success: "border-transparent bg-success  hover:bg-success-light",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    } as const,
  },
);

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={twMerge(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
