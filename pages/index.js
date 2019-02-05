import React from 'react'
import classNames from 'classnames/bind'
import styles from 'styles/styles.scss'
import Layout from 'components/layout'

const cx = classNames.bind(styles)

export default () => (
  <Layout title="FLATCOKE">
    <div className={cx('example')}>
      <ul>
        <li>This is FLATCOKE page</li>
        <li>This is personal blog</li>
      </ul>
    </div>
  </Layout>
)
