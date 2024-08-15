import { Card, CardBody, CardHeader, User as NextUser } from "@nextui-org/react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { BASE_URL } from "../../constants"
import { selectCurrent } from "../../features/user/userSlice"

export const Followers = () => {
  const current = useAppSelector(selectCurrent)
  if (!current) return null

  const { followers } = current

  return followers?.length > 0 ? (
    <div>
      {followers.map(el => {
        const { avatarUrl, name, id } = el?.follower
        return (
          <Link to={`/users/${id}`}>
            <Card key={id} className="mb-3" fullWidth>
              <CardBody className="items-start">
                <NextUser
                  name={name}
                  className="leading-none gap-3"
                  avatarProps={{
                    src: `${BASE_URL}/${avatarUrl}`,
                  }}
                />
              </CardBody>
            </Card>
          </Link>
        )
      })}
    </div>
  ) : (
    <p className="text-3xl text-center border-1 border-red-500 p-5">
      Подписок нет
    </p>
  )
}
