import React from 'react'
import Link from 'next/link'
import classNames from 'classnames/bind'
import styles from '../styles/styles.scss'

const cx = classNames.bind(styles)

export default () => (
  <div className={cx('example')}>
    <ul>
      <li>
        <Link href="/login">login</Link>
      </li>
    </ul>
  </div>
)
