import { ReactNode } from "react"
import { Header } from "../header"
import { Footer } from "../footer"
import { Container } from "../container"

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <Container>
        <div>{children}</div>
      </Container>
      <Footer />
    </div>
  )
}
