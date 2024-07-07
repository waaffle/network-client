import { useCurrentQuery } from "../../app/services/userApi"
import { selectCurrent } from "../../features/user/userSlice"
import { Card, CardBody, Image, Link } from "@nextui-org/react"
import { BASE_URL } from "../../constants"
import { FaRegUserCircle } from "react-icons/fa"
import { MdAlternateEmail } from "react-icons/md"
import { useAppSelector } from "../../app/hooks"

export const Profile = () => {
  const current = useAppSelector(selectCurrent)
  if (!current) return null

  const { name, email, avatarUrl, id } = current
  return (
    <Card className="py-4">
      <CardBody>
        <Image
          className="text-center w-[250px] object-cover rounded-xl"
          src={`${BASE_URL}/${avatarUrl}`}
        />
        <div className="text-center   flex flex-col">
          <Link
            href={`/users/${id}`}
            className="font-bold text-xl self-center gap-2 mb-1 cursor-pointer"
            showAnchorIcon
            anchorIcon={<FaRegUserCircle />}
          >
            {name}
          </Link>
          <small className="text-default-500 text-sm">{email}</small>
        </div>
      </CardBody>
    </Card>
  )
}
