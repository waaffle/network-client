import { FC, ReactNode } from "react"
import { Button } from "../button/index"
import { Link } from "react-router-dom"

type Props = {
  children: ReactNode
  icon: JSX.Element
  href: string
}

export const NavButton: FC<Props> = ({ children, href, icon }) => {
  return (
    <Button className="flex justify-start text-xl" icon={icon}>
      <Link to={href}>{children}</Link>
    </Button>
  )
}
