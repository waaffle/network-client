import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { useContext } from "react"
import { FaRegMoon } from "react-icons/fa"
import { LuSunMedium } from "react-icons/lu"
import { ThemeContext } from "../theme-provider"
import { logout, selectIsAuthorized } from "../../features/user/userSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { MdLogout } from "react-icons/md"
import { useNavigate } from "react-router-dom"

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

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
        <NavbarItem>
          <Button
            variant="flat"
            size="lg"
            endContent={<MdLogout />}
            onClick={handleClick}
          >
            Выйти
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
