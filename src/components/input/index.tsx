import React from "react"
import { Control, useController } from "react-hook-form"
import { Input as NextInput } from "@nextui-org/react"

type Props = {
  name: string
  control: Control<any>
  label: string
  placeholder?: string
  type?: string
  autoFocus?: boolean
  required?: string
  endContent?: JSX.Element
  pattern?: { value: RegExp; message: string } | undefined
  className?: string
}

export const Input: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type,
  control,
  autoFocus,
  required = "",
  endContent,
  pattern,
  className,
}) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: { required, pattern },
  })

  return (
    <NextInput
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className={className}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
      endContent={endContent}
    />
  )
}
