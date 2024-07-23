import { useGetAllPostsQuery } from "../../app/services/postsApi"
import { CreatePost } from "../../components/create-post"
import { PostCard } from "../../components/post-card"

export const Posts = () => {
  const { data: posts } = useGetAllPostsQuery()

  return (
    <div>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
      {!!posts?.length &&
        posts?.map(
          ({
            content,
            author,
            authorId,
            id,
            comments,
            likes,
            likedByUser,
            createdAt,
          }) => {
            return (
              <PostCard
                key={id}
                avatarUrl={author.avatarUrl ?? ""}
                content={content}
                name={author?.name ?? ""}
                likesCount={likes?.length}
                commentsCount={comments?.length}
                authorId={authorId}
                id={id}
                likedByUser={likedByUser}
                createdAt={createdAt}
                cardFor="post"
              ></PostCard>
            )
          },
        )}
    </div>
  )
}
