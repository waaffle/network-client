import { FC, useState } from "react"
import { FaComment, FaRegComment } from "react-icons/fa"
import { Comment } from "../../app/types"

type Props = {
  comments: Comment[] | undefined
}
export const CommentButton: FC<Props> = ({ comments }) => {
  const [hovered, setHovered] = useState(false)
  const [commentNumber, setCommentNumber] = useState(comments?.length)
  return (
    <div className="flex gap-1">
      <button
        className="flex items-center justify-center w-10 h-10 rounded-full p-2 transition-colors duration-300"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <div
          className="transition-transform duration-300"
          style={{ transform: hovered ? "scale(1.25)" : "scale(1)" }}
        >
          {hovered ? (
            <FaComment className="text-gray-500 text-xl " />
          ) : (
            <FaRegComment className="text-gray-500 text-xl " />
          )}
        </div>
      </button>
      <label className="font-semibold text-default-500">
        {commentNumber || ""}
      </label>
    </div>
  )
}
