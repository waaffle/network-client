import { BsPostcard } from "react-icons/bs"
import { NavButton } from "../nav-button"
import { FiUsers } from "react-icons/fi"
import { FaUsers } from "react-icons/fa"

export const Navbar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton href={"/"} icon={<BsPostcard />}>
            Посты
          </NavButton>
        </li>
        <li>
          <NavButton href={"following"} icon={<FiUsers />}>
            Подписки
          </NavButton>
        </li>
        <li>
          <NavButton href={"followers"} icon={<FaUsers />}>
            Подписчики
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}
