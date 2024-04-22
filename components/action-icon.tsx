import { Button, ButtonProps } from "@/components/ui/button";

interface ActionIconProps extends Partial<ButtonProps> {
  children: React.ReactNode;
}

export const ActionIcon = ({ children, ...buttonProps }: ActionIconProps) => {
  return (
    <Button
      type="submit"
      variant={"ghost"}
      size={"icon"}
      className="size-9"
      {...buttonProps}
    >
      {children}
    </Button>
  );
};
