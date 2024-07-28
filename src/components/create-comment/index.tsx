import { Button, Textarea } from "@nextui-org/react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { FiSend } from "react-icons/fi"
import { useCreateCommentMutation } from "../../app/services/commentsApi"
import { useLazyGetPostByIdQuery } from "../../app/services/postsApi"
import { hasErrorField } from "../../utils/has-error-field"
import { ErrorMessage } from "../error-message"
import { Typography } from "../typography"
import { useParams } from "react-router-dom"

export const CreateComment = ({ postId }: { postId: string }) => {
  const [error, setError] = useState("")
  const {
    handleSubmit,
    control,
    formState: { errors },
    resetField,
  } = useForm({
    defaultValues: {
      comment: "",
    },
  })
  const [createComment, { isLoading }] = useCreateCommentMutation()
  const [getPostById] = useLazyGetPostByIdQuery()

  const onSubmit = handleSubmit(async data => {
    try {
      if (postId) {
        await createComment({ content: data.comment, postId }).unwrap()
        resetField("comment")
        await getPostById(postId).unwrap()
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setError(error.data.error)
      } else setError(error as string)
    }
  })
  return (
    <form onSubmit={onSubmit} className="mb-3 flex  relative">
      <Controller
        name="comment"
        control={control}
        defaultValue=""
        rules={{
          required: "Обязательное поле",
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            placeholder="Напишите комментарий"
            className="mb-3 text-xl"
            errorMessage={`${errors?.comment?.message ?? ""}`}
          />
        )}
      ></Controller>
      {!!errors && <ErrorMessage error={error} />}
      <Button
        type="submit"
        color="secondary"
        variant="ghost"
        isIconOnly
        className="absolute right-3 top-4"
        isLoading={isLoading}
      >
        <FiSend />
      </Button>
    </form>
  )
}
