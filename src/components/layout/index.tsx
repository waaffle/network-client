import { Card, CardBody } from "@nextui-org/react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom"
import { selectIsAuthorized, selectUser } from "../../features/user/userSlice"
import { Container } from "../container"
import { Header } from "../header"
import { Navbar } from "../navbar/index"
import { Profile } from "../profile"

export const Layout = () => {
  const isAuthorized = useSelector(selectIsAuthorized)
  const user = useSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthorized) navigate("/auth")
  }, [])

  return (
    <div>
      <Header />
      <Container>
        <div className="flex-2 p-4">
          <Navbar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        <div className="p-4">{!user && <Profile />}</div>
      </Container>
    </div>
  )
}
