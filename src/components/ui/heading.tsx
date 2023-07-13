import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const headingVariants = cva(
  "font-medium leading-tight tracking-tighter capitalize",
  {
    variants: {
      size: {
        default: "text-4xl md:text-5xl lg:text-6xl",
        lg: "text-5xl md:text-6xl lg:text-7xl",
        sm: "text-2xl",
        xs: "text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

export function Heading({ children, className, size, ...props }: HeadingProps) {
  return (
    <h1 className={cn(headingVariants({ size, className }))} {...props}>
      {children}
    </h1>
  );
}
