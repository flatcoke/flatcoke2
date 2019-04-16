import React from 'react'
import Link from 'next/link'

const Post = ({ post }) => (
  <Link href={`/posts/id?id=${post.id}`}>
    <a>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </a>
  </Link>
)

export default Post
