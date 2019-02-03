import React from 'react'
import Link from 'next/link'

export default () => (
  <header>
    <nav>
      <Link href="/">
        <a>HOME</a>
      </Link>
      |
      <Link href="blogs">
        <a>BLOG</a>
      </Link>
      |
      <Link href="photos">
        <a>PHOTO</a>
      </Link>
      |
      <Link href="/about">
        <a>ABOUTME</a>
      </Link>
      |
      <Link href="https://github.com/flatcoke">
        <a>GITHUB</a>
      </Link>
    </nav>
  </header>
)
