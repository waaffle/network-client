export type User = {
  id: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date,
  name?: string,
  avatarUrl?: string,
  dataOfBirth?: Date,
  bio?: string,
  location?: string,
  posts: Post[],
  likes: Like[],
  comments: Comment[],
  followers: Follows[],
  following: Follows[],
  isFollowing?: boolean
}

export type Post = {
  id: string,
  authorId: string,
  createdAt: Date,
  updatedAt: Date,
  likedByUser: boolean,
  author: User,
  content: string,
  likes: Like[],
  comments: Comment[],
}

export type Like = {
  id: string,
  user: User,
  userId: string,
  post: Post,
  postId: string
}

export type Comment = {
  id: string,
  content: string,
  user: User,
  userId: string,
  post: Post,
  postId: string,
  createdAt: Date,
}

export type Follows = {
  id: string,
  follower: User,
  followerId: string,
  following: User,
  followingId: string
}