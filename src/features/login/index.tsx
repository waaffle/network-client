import { Button, Link } from "@nextui-org/react"
import { FC, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../../components/input"
import {
  useLazyCurrentQuery,
  useLoginMutation,
} from "../../app/services/userApi"
import { useNavigate } from "react-router-dom"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../../components/error-message"

type Login = {
  email: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

export const Login: FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const [login, { isLoading }] = useLoginMutation()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [getCurrentUser] = useLazyCurrentQuery()

  const onSubmit = async (data: Login) => {
    try {
      await login(data).unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="email"
        type="email"
        control={control}
        required="Обязательное поле"
        label="Почта"
        placeholder="Введите вашу почту"
        pattern={{
          value: /^\S+@\S+\.\S+$/,
          message: "Неккоректный email",
        }}
      />
      <Input
        name="password"
        type="password"
        control={control}
        required="Обязательное поле"
        label="Пароль"
        placeholder="Введите пароль"
      />
      <ErrorMessage error={error} />
      <p className="text-center text-small">
        Ещё нет аккаунта?{" "}
        <Link
          className="cursor-pointer"
          size="sm"
          onPress={() => setSelected("sign-up")}
        >
          Зарегестрируйтесь
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button type="submit" fullWidth color="primary" isLoading={isLoading}>
          Login
        </Button>
      </div>
    </form>
  )
}
