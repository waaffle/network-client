import { Button, Textarea } from "@nextui-org/react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useCreatePostMutation } from "../../app/services/postsApi"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../error-message"

export const CreatePost = () => {
  const [error, setError] = useState("")
  const {
    handleSubmit,
    control,
    formState: { errors },
    resetField,
  } = useForm({
    defaultValues: {
      post: "",
    },
  })
  const [createPost, { isLoading }] = useCreatePostMutation()
  const onSubmit = handleSubmit(async data => {
    try {
      await createPost({ content: data.post }).unwrap()
      resetField("post")
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      }
    }
  })
  return (
    <form onSubmit={onSubmit} className="mb-3">
      <Controller
        name="post"
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            labelPlacement="outside"
            placeholder="Поделитесь новостями!"
            className="mb-3"
            errorMessage={`${errors?.post?.message ?? ""}`}
          />
        )}
      ></Controller>
      <ErrorMessage error={error} />
      <Button type="submit" color="success" isLoading={isLoading}>
        Создать пост
      </Button>
    </form>
  )
}
