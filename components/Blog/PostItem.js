import React from 'react'
import Link from 'next/link'

const Post = ({ post }) => (
  <Link href={`/blogs/id?id=${post.id}`} as={`/blogs/${post.id}`}>
    <a>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </a>
  </Link>
)

export default Post
