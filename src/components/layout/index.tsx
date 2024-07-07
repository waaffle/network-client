import { Outlet } from "react-router-dom"
import { Container } from "../container"
import { Header } from "../header"
import { Navbar } from "../navbar/index"

export const Layout = () => {
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
