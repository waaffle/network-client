import { Card, CardBody } from "@nextui-org/react"
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { selectIsAuthorized, selectUser } from "../../features/user/userSlice"
import { Container } from "../container"
import { Header } from "../header"
import { Navbar } from "../navbar/index"
import { Profile } from "../profile"
import { useAppSelector } from "../../app/hooks"

export const Layout = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized)
  const user = useAppSelector(selectUser)
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
        <div className="flex-2 p-4">
          <div className="flex-col flex gap-5">{!user && <Profile />}</div>
        </div>
      </Container>
    </div>
  )
}
