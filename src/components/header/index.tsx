import {
  Navbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/react"
import { ThemeContext } from "../theme-provider"
import { useContext } from "react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">NETWORK</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="lg-flex text-3xl cursor-pointer">
          {theme === "light" ? <LuSunMedium /> : <FaRegMoon />}
        </NavbarItem>
        <NavbarItem></NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
