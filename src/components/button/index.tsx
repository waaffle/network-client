import { Button as ButtonNextUI } from "@nextui-org/react"
import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
  variant?:
    | "flat"
    | "shadow"
    | "light"
    | "solid"
    | "bordered"
    | "faded"
    | "ghost"
    | undefined
  size?: "sm" | "lg" | "md" | undefined
  icon?: ReactNode
  className?: string
  fullWidth?: boolean
  type?: "button" | "submit" | "reset"
}

export const Button: FC<Props> = ({
  children,
  className,
  color,
  icon,
  variant = "light",
  size = "lg",
  fullWidth,
  type,
}) => {
  return (
    <ButtonNextUI
      color={color}
      variant={variant}
      size={size}
      startContent={icon}
      className={className}
      fullWidth={fullWidth}
      type={type}
    >
      {children}
    </ButtonNextUI>
  )
}
