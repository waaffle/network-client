import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  User as NextUser,
} from "@nextui-org/react"
import { FC, useState } from "react"
import { FcLike } from "react-icons/fc"
import { Comment, Like, User } from "../../app/types"
import { BASE_URL } from "../../constants"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { FaComment, FaRegComment } from "react-icons/fa"
import { CommentButton } from "../comment-button"
import { LikeButton } from "../like-button"

type Props = {
  authorId: string
  author: User
  content: string
  description: Date
  likes?: Like[]
  comments?: Comment[]
  name?: string
  avatarUrl?: string
  type?: "post" | "comment"
}

export const PostCard: FC<Props> = ({
  authorId,
  author,
  content,
  description,
  likes,
  type = "post",
  comments,
}) => {
  const [likeNumber, setLikeNumber] = useState(likes?.length)

  return (
    <Card className="mb-3" fullWidth>
      <CardHeader className="justify-between">
        <NextUser
          name={author?.name}
          description={formatToClientDate(description)}
          avatarProps={{
            src: `${BASE_URL}/${author?.avatarUrl}`,
          }}
        />
      </CardHeader>
      <CardBody className="px-3 py-0">
        <p>{content}</p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-2">
          <LikeButton likes={likes} />
          <CommentButton comments={comments} />
        </div>
      </CardFooter>
    </Card>
  )
}
