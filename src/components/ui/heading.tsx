import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const headingVariants = cva("font-medium leading-tight capitalize", {
  variants: {
    size: {
      // _9xl: "text-9xl",
      // _8xl: "text-8xl",
      // _7xl: "text-7xl",
      // _6xl: "text-6xl",
      // _5xl: "text-5xl",
      // _4xl: "text-4xl",
      // _3xl: "text-3xl",
      // _2xl: "text-2xl",
      // xl: "text-xl",
      // default: "text-base",
      // lg: "text-lg",
      // sm: "text-sm",
      // xs: "text-xs",
      default: "text-lg md:text-xl",
      xl: "text-2xl md:text-3xl",
      lg: "text-xl md:text-2xl",
      sm: "text-base md:text-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

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
