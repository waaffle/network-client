import { useParams } from "react-router-dom"
import { useGetPostByIdQuery } from "../../app/services/postsApi"
import { MyCard } from "../../components/my-card"
import { CreateComment } from "../../components/create-comment"
import { Comment } from "../../app/types"
import { GoBack } from "../../components/go-back"

export const CurrentPost = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostByIdQuery(params?.id ?? "")

  if (!data) return <h2>Такого поста не существует</h2>
  const {
    id: postId,
    authorId,
    author,
    content,
    likes,
    comments,
    likedByUser,
    createdAt,
  } = data
  return (
    <>
      <div className="text-purple-400">
        <GoBack />
      </div>
      <div className="mb-5">
        <MyCard
          avatarUrl={author?.avatarUrl ?? ""}
          name={author?.name ?? ""}
          authorId={authorId}
          content={content}
          createdAt={createdAt}
          likedByUser={likedByUser}
          cardFor="current-post"
          id={postId}
          likesCount={likes?.length ?? 0}
          commentsCount={comments?.length ?? 0}
        ></MyCard>
      </div>
      <div className="mb-10">
        <CreateComment postId={postId} />
      </div>
      {!!comments?.length &&
        comments?.map((comment: Comment) => {
          const { id, content, userId, user, post } = comment
          return (
            <MyCard
              key={id}
              avatarUrl={user?.avatarUrl ?? ""}
              name={user?.name ?? ""}
              authorId={userId}
              content={content}
              createdAt={post?.createdAt ?? ""}
              cardFor="comment"
              commentId={id}
              id={postId}
            ></MyCard>
          )
        })}
    </>
  )
}
