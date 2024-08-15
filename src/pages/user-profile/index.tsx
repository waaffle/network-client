import { useParams } from "react-router-dom"
import { useGetUserByIdQuery } from "../../app/services/userApi"
import { ProfileInformation } from "../../components/profile-information"
import { ProfileInner } from "../../components/profile-inner"
import { GoBack } from "../../components/go-back"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { resetUser, selectUser } from "../../features/user/userSlice"
import { useEffect } from "react"

export const UserProfile = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetUserByIdQuery(params?.id ?? "")
  const dispatch = useAppDispatch()

  useEffect(
    () => () => {
      dispatch(resetUser())
    },
    [],
  )

  if (!data) return null

  return (
    <div>
      <GoBack />
      <div className="flex gap-4">
        <div>
          <ProfileInner {...data} />
        </div>
        <div className="grow">
          <ProfileInformation {...data} />
        </div>
      </div>
    </div>
  )
}
