import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react"
import { MdOutlineModeEdit } from "react-icons/md"
import { TbPhotoDown } from "react-icons/tb"
import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../../features/user/userSlice"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { MyInput } from "../myInput"
import { useUpdateUserMutation } from "../../app/services/userApi"
import { useForm } from "react-hook-form"
import { hasErrorField } from "../../utils/has-error-field"
import { useState } from "react"
import { ErrorMessage } from "../error-message"
import { Input } from "../input"

type Props = {
  name?: string
  email?: string
  dataOfBirth?: Date
  avatar?: string
  bio?: string
  location?: string
}

export const EditProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // defaultValues: {
    //   name: "",
    //   email: "",
    //   avatar: "",
    //   bio: "",
    //   location: ""
    // },
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const theme = localStorage.getItem("theme")
  const [error, setError] = useState("")
  const user = useAppSelector(selectUser)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  if (!user) return null
  const { email, name, dataOfBirth, avatarUrl, location, id } = user

  const onSubmit = async (userData: FormData) => {
    try {
      console.log("11")
      await updateUser({ userData, id }).unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <>
      <Button
        onPress={onOpen}
        size="lg"
        className="w-[200px] self-center"
        endContent={<MdOutlineModeEdit />}
      >
        Редактировать
      </Button>
      <Modal
        className={`${theme} text-foreground bg-background bg-neutral-900`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Изменение профиля
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-5"
                >
                  <Input
                    name="email"
                    control={control}
                    autoFocus
                    label="Email"
                    placeholder={email}
                  />
                  <Input
                    name="name"
                    control={control}
                    label="Имя"
                    placeholder={name}
                    type="text"
                  />
                  <MyInput
                    name="avatar"
                    control={control}
                    text={"Выберите аватар"}
                    data={avatarUrl}
                    icon={<TbPhotoDown />}
                    type={"file"}
                  />
                  <Input
                    control={control}
                    name="dataOfBirth"
                    className="text-default-400"
                    label="Дата рождения"
                    placeholder={formatToClientDate(dataOfBirth)}
                    type="date"
                  />
                  <Textarea label="Расскажите о себе" className="w-full" />
                  <Input
                    control={control}
                    name="location"
                    label="Местоположение"
                    placeholder={location}
                    type="text"
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button
                  type="submit"
                  color="primary"
                  className="w-full p-7"
                  onPress={onClose}
                >
                  Сохранить изменения
                </Button>
                {!!errors && <ErrorMessage error={error} />}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
