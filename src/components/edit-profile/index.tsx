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
import { MdOutlineEmail, MdOutlineModeEdit } from "react-icons/md"
import { TbPhotoDown } from "react-icons/tb"
import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../../features/user/userSlice"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { MyInput } from "../myInput"
import {
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../app/services/userApi"
import { Controller, useForm } from "react-hook-form"
import { hasErrorField } from "../../utils/has-error-field"
import { useState } from "react"
import { ErrorMessage } from "../error-message"
import { Input } from "../input"
import { useParams } from "react-router-dom"
import { User } from "../../app/types"

export const EditProfile = ({ user }: { user: User }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const theme = localStorage.getItem("theme")
  const [error, setError] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { id } = useParams<{ id: string }>()
  const [getUserById] = useLazyGetUserByIdQuery()
  const [getCurrentUser] = useLazyCurrentQuery()
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const { email, name, dataOfBirth, avatarUrl, location } = user

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dataOfBirth: user?.dataOfBirth,
      avatarUrl: user?.avatarUrl,
      location: user?.location,
    },
  })

  const onSubmit = async (data: User) => {
    if (id) {
      try {
        setError("")
        const formData = new FormData()
        data?.name && formData.append("name", data?.name)
        data?.email &&
          data?.email !== user?.email &&
          formData.append("email", data.email)

        if (data?.dataOfBirth) {
          formData.append(
            "dataOfBirth",
            new Date(data?.dataOfBirth).toISOString(),
          )
        }
        data?.bio && formData.append("bio", data?.bio)
        data?.location && formData.append("location", data?.location)
        selectedFile && formData.append("avatar", selectedFile)
        await updateUser({ userData: formData, id }).unwrap()
        await getCurrentUser().unwrap()
        await getUserById(id).unwrap()
        if (!error) onClose()
      } catch (error) {
        if (hasErrorField(error)) {
          setError(error.data.error)
        } else setError(error as string)
      }
    } else setError("id пользователя не найден")
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.files !== null) {
      setSelectedFile(e.target.files[0])
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
        className={`${theme} text-foreground bg-background dark:bg-neutral-900`}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
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
                  text="Выберите аватар"
                  icon={<TbPhotoDown />}
                  data={selectedFile}
                  type="file"
                  onChange={handleChange}
                />
                <Input
                  control={control}
                  name="dataOfBirth"
                  className="text-default-400"
                  label="Дата рождения"
                  placeholder={formatToClientDate(dataOfBirth)}
                  type="date"
                />
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      label="Расскажите о себе"
                      className="w-full"
                    />
                  )}
                />

                <Input
                  control={control}
                  name="location"
                  label="Местоположение"
                  placeholder={location}
                  type="text"
                />
                <Button
                  type="submit"
                  color="primary"
                  isLoading={isLoading}
                  className="w-full p-7"
                >
                  Сохранить изменения
                </Button>
              </form>
            </ModalBody>
            <ModalFooter className="justify-center">
              {!!errors && <ErrorMessage error={error} />}
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  )
}
