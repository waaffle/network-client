import { ReactNode } from "react"
import { Header } from "../header"
import { Footer } from "../footer"
import { Container } from "../container"
import { Navbar } from "../navbar/index"
import { Outlet } from "react-router-dom"

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
