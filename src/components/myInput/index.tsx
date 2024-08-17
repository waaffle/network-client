import { FC, ReactNode } from "react"

type Props = {
  text: string
  type: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  data?: File | null
  icon?: ReactNode
}
export const MyInput: FC<Props> = ({ text, type, data, onChange, icon }) => {
  return (
    <div>
      <label
        htmlFor={type}
        className="flex gap-10 justify-between items-center w-30 text-default-600 focus-visible:outline-none  p-2.5 rounded-xl cursor-pointer dark:border-default-200  dark:placeholder-gray-400 bg-default-100 hover:bg-default-200 dark:hover:bg-default-200 min-h-10
        dark:bg-default-100"
      >
        <div>
          <div className="text-sm">{text}</div>
          {!!data && (
            <div className="text-default-400 text-small">
              {data.name.replace("/uploads/", "")}
            </div>
          )}
        </div>
        <div className="pt-0.5 text-default-400">{!!icon && icon}</div>
      </label>

      <input
        className="block w-full text-sm text-black/0 opacity-0 h-0"
        id={type}
        type={type}
        onChange={onChange}
      />
    </div>
  )
}
