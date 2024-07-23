import { FC } from "react"
import { IconType } from "react-icons"

type Props = {
  count: number
  Icon: IconType
}

export const MetaInfo: FC<Props> = ({ count, Icon }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100">
        <Icon />
      </p>
      {count > 0 && (
        <p className="font-semibold text-default-400 text-lg">{count}</p>
      )}
    </div>
  )
}
