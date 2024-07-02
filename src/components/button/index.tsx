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
  variant?: string
  size?: string
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
  fullWidth,
  type,
}) => {
  return (
    <ButtonNextUI
      color={color}
      variant="light"
      size="lg"
      startContent={icon}
      className={className}
      fullWidth={fullWidth}
      type={type}
    >
      {children}
    </ButtonNextUI>
  )
}
