import { Card, CardBody } from "@nextui-org/react"
import { useAppSelector } from "../../app/hooks"
import { selectUser } from "../../features/user/userSlice"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { User } from "../../app/types"

export const ProfileInformation = (data: User) => {
  const { id, email, name, dataOfBirth, bio, location, followers, following } =
    data
  return (
    <Card fullWidth className="h-full">
      <CardBody className="text-xl py-4 px-8">
        <div className="flex gap-4 pt-8 mb-5">
          <span className="text-default-500">Почта</span>
          <span>{email}</span>
        </div>
        {!!location && (
          <div className="flex gap-4 mb-5">
            <span className="text-default-500">Местоположение</span>
            <span>{location}</span>
          </div>
        )}
        {!!dataOfBirth && (
          <div className="flex gap-4 mb-5">
            <span className="text-default-500">Дата рождения</span>
            <span>{formatToClientDate(dataOfBirth)}</span>
          </div>
        )}
        {!!bio && (
          <div className="flex gap-4 mb-5">
            <span className="text-default-500 grow-1">Обо мне</span>
            <span className="flex-1">{bio}</span>
          </div>
        )}
        <div className="flex gap-10">
          <div className="flex gap-2 mb-5 flex-col items-center">
            <span className="text-3xl">{followers?.length}</span>
            <span className="text-default-500">Подписчики</span>
          </div>
          <div className="flex gap-2 mb-5 flex-col items-center">
            <span className="text-3xl">{following?.length}</span>
            <span className="text-default-500">Подписки</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
