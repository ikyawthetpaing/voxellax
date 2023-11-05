import { Button, ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
}

export function LoadingButton({
  variant,
  size,
  className,
  isLoading = false,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button variant={variant} size={size} className={className} {...props}>
      {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
      <span>{children}</span>
    </Button>
  );
}
