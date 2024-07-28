import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  User as NextUser,
  Spinner,
} from "@nextui-org/react"
import { FC, useState } from "react"
import { FcLike } from "react-icons/fc"
import { MdOutlineFavoriteBorder } from "react-icons/md"
import { RiDeleteBinLine } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { useDeleteCommentMutation } from "../../app/services/commentsApi"
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../../app/services/likesApi"
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../app/services/postsApi"
import { BASE_URL } from "../../constants"
import { selectCurrent } from "../../features/user/userSlice"
import { formatToClientDate } from "../../utils/format-to-client-date"
import { MetaInfo } from "../meta-info"
import { Typography } from "../typography"
import { FaRegComment } from "react-icons/fa"
import { ErrorMessage } from "../error-message"
import { hasErrorField } from "../../utils/has-error-field"

type Props = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  createdAt: Date
  commentId?: string
  likesCount?: number
  commentsCount?: number
  id?: string
  cardFor: "comment" | "post" | "current-post"
  likedByUser?: boolean
}

export const MyCard: FC<Props> = ({
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commentId = "",
  likesCount = 0,
  commentsCount = 0,
  createdAt,
  id = "",
  cardFor = "post",
  likedByUser = false,
}) => {
  const [likePost] = useLikePostMutation()
  const [unLikePost] = useUnlikePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const [getAllPosts] = useLazyGetAllPostsQuery()
  const [getPostById] = useLazyGetPostByIdQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [error, setError] = useState("")
  const currentUser = useAppSelector(selectCurrent)
  const navigate = useNavigate()

  const refetchPosts = async () => {
    switch (cardFor) {
      case "post":
        await getAllPosts().unwrap()
        break
      case "current-post":
        await getPostById(id).unwrap()
        break
      case "comment":
        await getPostById(id).unwrap()
        break
      default:
        throw new Error("Некорректный аргумент cardFor")
    }
  }

  const handleDelete = async () => {
    try {
      switch (cardFor) {
        case "post": {
          await deletePost(id).unwrap()
          await refetchPosts()
          break
        }
        case "current-post": {
          await deletePost(id).unwrap()
          await refetchPosts()
          navigate("/")
          break
        }
        case "comment": {
          await deleteComment(commentId).unwrap()
          await refetchPosts()
          break
        }
        default: {
          throw new Error("Некорректный аргумент cardFor")
        }
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else setError(error as string)
    }
  }

  const handleLike = async () => {
    try {
      {
        likedByUser
          ? await unLikePost(id).unwrap()
          : await likePost({ postId: id }).unwrap()
      }
      await refetchPosts()
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else setError(error as string)
    }
  }

  return (
    <Card className="mb-3" fullWidth>
      <CardHeader className="justify-between">
        <Link to={`/user/${authorId}`}>
          <NextUser
            name={name}
            className="leading-none"
            description={createdAt && formatToClientDate(createdAt)}
            avatarProps={{
              src: `${BASE_URL}/${avatarUrl}`,
            }}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <div className="cursor-pointer" onClick={handleDelete}>
                <RiDeleteBinLine />
              </div>
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Typography>{content}</Typography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <div onClick={handleLike}>
              <MetaInfo
                count={likesCount}
                Icon={likedByUser ? FcLike : MdOutlineFavoriteBorder}
              />
            </div>
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </Card>
  )
}
