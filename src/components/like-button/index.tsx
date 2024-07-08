import { FC, useState } from "react"
import { Like } from "../../app/types"
import { FaHeart, FaRegHeart } from "react-icons/fa"

type Props = {
  likes: Like[] | undefined
}
export const LikeButton: FC<Props> = ({ likes }) => {
  const [likeNumber, setLikeNumber] = useState<number>(likes?.length || 0)
  const [hovered, setHovered] = useState(false)
  return (
    <div className="flex">
      <button
        className="flex text-xl items-center justify-center w-10 h-10 rounded-full p-2 transition-transform duration-300"
        onMouseOver={() => setHovered(true)}
        onMouseOut={() => setHovered(false)}
      >
        <div
          className="transition-transform duration-300"
          style={{ transform: hovered ? "scale(1.25)" : "scale(1)" }}
        >
          {hovered ? (
            <FaHeart className="text-red-600 text-xl " />
          ) : likeNumber !== 0 ? (
            <FaHeart className="text-red-600 text-xl " />
          ) : (
            <FaRegHeart className="text-gray-500 text-xl " />
          )}
        </div>
      </button>
      <label className="font-semibold flex justify-between items-center text-xl text-default-500">
        {likeNumber || ""}
      </label>
    </div>
  )
}
