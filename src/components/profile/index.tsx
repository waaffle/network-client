import { useCurrentQuery } from "../../app/services/userApi"
import { selectCurrent } from "../../features/user/userSlice"
import { Card, CardBody, Image, Link } from "@nextui-org/react"
import { BASE_URL } from "../../constants"
import { FaRegUserCircle } from "react-icons/fa"
import { MdAlternateEmail } from "react-icons/md"
import { useAppSelector } from "../../app/hooks"
import { GrFormNextLink } from "react-icons/gr"

export const Profile = () => {
  const current = useAppSelector(selectCurrent)
  if (!current) return null

  const { name, email, avatarUrl, id } = current
  return (
    <Link href={`/users/${id}`} className="font-bold text-xl cursor-pointer">
      <Card className="py-4">
        <CardBody className="gap-3 flex items-center flex-col">
          <Image
            alt="Card profile"
            className="text-center w-[250px] h-[250px] dark:border-gray-200 border-3 border-slate-800 mx-3 object-left-top object-cover rounded-xl"
            src={`${BASE_URL}/${avatarUrl}`}
          />
          <div className="flex gap-2 items-center ">
            {name}
            <GrFormNextLink />
          </div>

          <small className="text-default-500 text-sm">{email}</small>
        </CardBody>
      </Card>
    </Link>
  )
}
