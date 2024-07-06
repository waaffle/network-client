import { Button, Link } from "@nextui-org/react"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import {
  useLazyCurrentQuery,
  useRegisterMutation,
} from "../../app/services/userApi"
import { Input } from "../../components/input"
import { hasErrorField } from "../../utils/has-error-field"

type Register = {
  name: string
  email: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

export const Register: FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [getCurrentUser] = useLazyCurrentQuery()

  const onSubmit = async (data: Register) => {
    try {
      await register(data).unwrap()
      setSelected("login")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="name"
        control={control}
        type="text"
        required="Обязательное поле"
        label="Имя"
        placeholder="Введите имя"
      />
      <Input
        name="email"
        type="email"
        control={control}
        required="Обязательное поле"
        label="Почта"
        placeholder="Введите вашу почту"
      />
      <Input
        type="password"
        name="password"
        control={control}
        required="Обязательное поле"
        label="Пароль"
        placeholder="Введите пароль"
      />
      <p className="text-center text-small">
        Уже есть аккаунт?{" "}
        <Link size="sm" onPress={() => setSelected("login")}>
          Войдите
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button type="submit" fullWidth color="primary" isLoading={isLoading}>
          Зарегестироваться
        </Button>
      </div>
    </form>
  )
}
