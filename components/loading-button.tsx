import { Button, ButtonProps } from "@/components/ui/button";
import { Icons } from "@/components/icons";

interface LoadingButtonProps extends ButtonProps {
  isLoading?: boolean;
  icon?: keyof typeof Icons;
}

export function LoadingButton({
  variant,
  size,
  className,
  isLoading = false,
  icon,
  children,
  ...props
}: LoadingButtonProps): JSX.Element {
  const IconComponent = icon && Icons[icon];

  return (
    <Button variant={variant} size={size} className={className} {...props}>
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : IconComponent ? (
        <IconComponent className="mr-2 h-4 w-4" />
      ) : null}
      <span>{children}</span>
    </Button>
  );
}
