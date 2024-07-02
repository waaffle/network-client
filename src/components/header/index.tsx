import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { useContext } from "react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { ThemeContext } from "../theme-provider"

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">NETWORK</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem
          className="lg-flex text-3xl cursor-pointer"
          onClick={toggleTheme}
        >
          {theme === "light" ? <LuSunMedium /> : <FaRegMoon />}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
