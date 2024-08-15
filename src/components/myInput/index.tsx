import { FC, ReactNode } from "react"
import { Control, useController } from "react-hook-form"

type Props = {
  name: string
  control: Control<any>
  text: string
  type: string
  required?: string
  data?: string
  icon?: ReactNode
}
export const MyInput: FC<Props> = ({
  name,
  control,
  text,
  type,
  data,
  required,
  icon,
}) => {
  const { field } = useController({
    name,
    control,
    rules: { required },
  })
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
              {data.replace("./uploads/", "")}
            </div>
          )}
        </div>
        <div className="pt-0.5 text-default-400">{!!icon && icon}</div>
      </label>

      <input
        className="block w-full text-sm text-black/0 opacity-0 h-0"
        id={type}
        type={type}
        value={field.value}
        name={field.name}
        onChange={field.onChange}
        onBlur={field.onBlur}
      />
    </div>
  )
}
