import { Button, Card, CardBody, Image } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { IoPersonAddOutline } from "react-icons/io5"
import { RiUserUnfollowLine } from "react-icons/ri"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  useFollowMutation,
  useUnFollowMutation,
} from "../../app/services/followsApi"
import { User } from "../../app/types"
import { BASE_URL } from "../../constants"
import { resetUser, selectCurrent } from "../../features/user/userSlice"
import { EditProfile } from "../edit-profile"
import {
  useLazyCurrentQuery,
  useLazyGetUserByIdQuery,
} from "../../app/services/userApi"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../error-message"

export const ProfileInner = (data: User) => {
  const current = useAppSelector(selectCurrent)
  const [follow, { isLoading: isLoadingFollow }] = useFollowMutation()
  const [unFollow, { isLoading: isLoadingUnFollow }] = useUnFollowMutation()
  const [error, setError] = useState("")
  const [getUserById] = useLazyGetUserByIdQuery()
  const [getCurrentUser] = useLazyCurrentQuery()

  const { name, avatarUrl, id } = data

  const handleFollow = async () => {
    try {
      if (id) {
        setError("")
        data?.isFollowing
          ? await unFollow(id).unwrap()
          : await follow({ followingId: id }).unwrap()
        await getUserById(id).unwrap()
        await getCurrentUser().unwrap()
      }
    } catch (error) {
      if (hasErrorField(error)) setError(error.data.error)
      else setError(error as string)
    }
  }

  return (
    <Card fullWidth className="py-4">
      <CardBody>
        <Image
          alt="Card profile"
          className="text-center object-cover dark:border-gray-200 border-3 border-slate-800 max-w-[350px] max-h-[350px] rounded-xl mx-3 mb-10"
          src={`${BASE_URL}/${avatarUrl}`}
        />
        <div className="text-center flex flex-col">
          <div className="font-bold text-xl self-center gap-2 mb-10">
            {name}
          </div>
          {current?.id !== id ? (
            <Button
              color={data?.isFollowing ? "default" : "primary"}
              onClick={handleFollow}
              size="lg"
              className="w-[200px] self-center"
              isLoading={isLoadingFollow || isLoadingUnFollow}
              endContent={
                data?.isFollowing ? (
                  <RiUserUnfollowLine />
                ) : (
                  <IoPersonAddOutline />
                )
              }
            >
              {data?.isFollowing ? "Отписаться" : "Подписаться"}
            </Button>
          ) : (
            <EditProfile user={data} />
          )}
        </div>
        <ErrorMessage error={error} />
      </CardBody>
    </Card>
  )
}
