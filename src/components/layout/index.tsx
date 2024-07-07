import { Outlet, useNavigate } from "react-router-dom"
import { Container } from "../container"
import { Header } from "../header"
import { Navbar } from "../navbar/index"
import { useSelector } from "react-redux"
import { selectIsAuthorized, selectUser } from "../../features/user/userSlice"
import { useEffect } from "react"

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
      </Container>
    </div>
  )
}
