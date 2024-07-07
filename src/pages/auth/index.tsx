import { Card, CardBody, Tab, Tabs } from "@nextui-org/react"
import { Key, useState } from "react"
import { Login } from "../../features/user/login"
import { Register } from "../../features/user/register"

export const Auth = () => {
  const [selected, setSelected] = useState("login")

  const handleSelectorChange = (key: Key) => {
    setSelected(key as string)
  }

  return (
    <div className="flex flex-col w-full items-center justify-center h-screen ">
      <Card className="max-w-full w-[340px] h-[450px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={handleSelectorChange}
          >
            <Tab key="login" title="Вход">
              {selected === "login" && <Login setSelected={setSelected} />}
            </Tab>

            <Tab key="sign-up" title="Регистрация">
              {selected === "sign-up" && <Register setSelected={setSelected} />}
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  )
}
