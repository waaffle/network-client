import { useGetAllPostsQuery } from "../../app/services/postsApi"
import { Post } from "../../app/types"
import { CreatePost } from "../../components/create-post"
import { PostCard } from "../../components/post-card"

export const Posts = () => {
  const { data: posts } = useGetAllPostsQuery()

  return (
    <div>
      <CreatePost />

      {posts?.map((post: Post) => {
        const { authorId, author, content, createdAt, likes, comments, id } =
          post
        return (
          <PostCard
            key={id}
            authorId={authorId}
            author={author}
            content={content}
            description={createdAt}
            likes={likes}
            comments={comments}
          ></PostCard>
        )
      })}
    </div>
  )
}
